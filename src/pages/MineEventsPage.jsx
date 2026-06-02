import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import activityPhoto from "../assets/image 28.png";

const fallbackImages = {
  fodbold: activityPhoto,
  padel: activityPhoto,
  "løb": activityPhoto,
  lob: activityPhoto,
  basketball: activityPhoto,
  fitness: activityPhoto,
  cykling: activityPhoto,
  yoga: activityPhoto,
  badminton: activityPhoto,
  andet: activityPhoto,
};

const tagIcons = {
  fodbold: soccerIcon,
  "løb": runIcon,
  lob: runIcon,
};

function normalizeTag(tag = "") {
  return tag.trim().toLowerCase();
}

function getEventImage(item) {
  const tag = normalizeTag(item.activity_type || item.tag);
  return (
    item.image ||
    fallbackImages[tag] ||
    activityPhoto
  );
}

function getEventSpots(item) {
  return item.spots || item.participants || item.capacity || "12 / 22";
}

function getEventDateParts(date = "") {
  const fallback = {
    weekday: "TIR",
    day: "26",
    month: "Maj",
    time: date || "18:30-20:30",
  };

  if (!date) {
    return fallback;
  }

  const [datePart, timePart] = date.split("·").map((part) => part.trim());
  const parts = datePart.split(" ").filter(Boolean);

  if (parts.length >= 3) {
    return {
      weekday: parts[0].slice(0, 3).toUpperCase(),
      day: parts[1],
      month: parts[2],
      time: timePart || date,
    };
  }

  return { ...fallback, time: timePart || date };
}

export default function MineEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setEvents([]);
    } else {
      setEvents(data || []);
      setError("");
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      fetchEvents();
    }
  }

  function handleEdit(item) {
    navigate(`/opret?id=${item.id ?? item.ID ?? ""}`);
  }

  const upcomingCount = events.length;
  const attendingCount = events.filter(
    (item) => item.joined || item.attending || item.is_attending
  ).length;

  return (
    <div className="events-page mine-events-page">
      <header className="mine-events-header">
        <h1>Mine events</h1>
      </header>

      <section className="mine-events-summary" aria-label="Kommende events">
        <div className="section-header mine-events-section-header">
          <h2>Kommende events</h2>
          <button type="button" onClick={fetchEvents} className="link-btn">
            Opdater
          </button>
        </div>
        <div className="mine-stats-grid">
          <article className="mine-stat-card mine-stat-card-created">
            <span className="mine-calendar-icon" aria-hidden="true" />
            <strong>{upcomingCount}</strong>
            <p>Du har oprettet kommende events</p>
          </article>
          <article className="mine-stat-card mine-stat-card-attending">
            <span className="mine-calendar-icon" aria-hidden="true" />
            <strong>{attendingCount}</strong>
            <p>Du deltager i kommende events</p>
          </article>
        </div>
      </section>

      <section className="mine-created-events">
        <h2>Du har oprettet</h2>

        {loading ? (
          <p className="mine-empty-state">Henter events...</p>
        ) : events.length === 0 ? (
          <p className="mine-empty-state">
            Ingen events fundet. Opret et nyt event på siden Opret.
          </p>
        ) : (
          <div className="mine-created-list">
            {events.map((item) => {
              const dateParts = getEventDateParts(item.date);
              const tag = normalizeTag(item.tag);

              return (
                <article
                  key={item.id ?? item.ID ?? item.title}
                  className="mine-event-row"
                >
                  <div className="mine-event-date" aria-label={item.date}>
                    <span>{dateParts.weekday}</span>
                    <strong>{dateParts.day}</strong>
                    <span>{dateParts.month}</span>
                  </div>

                  <img
                    className="mine-event-image"
                    src={getEventImage(item)}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="mine-event-content">
                    <div className="mine-event-title-row">
                      <h3>{item.title}</h3>
                      <div className="mine-event-menu" aria-label="Event actions">
                        <button type="button" onClick={() => handleEdit(item)}>
                          Rediger
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id ?? item.ID)}
                        >
                          Slet
                        </button>
                      </div>
                    </div>

                    <div className="mine-event-meta">
                      <p>
                        <span
                          className="meta-icon location-icon"
                          aria-hidden="true"
                        />
                        <span>{item.location}</span>
                      </p>
                      <p>
                        <span className="meta-icon time-icon" aria-hidden="true" />
                        <span>{dateParts.time}</span>
                      </p>
                    </div>

                    <div className="mine-event-footer">
                      <span className="mine-event-spots">
                        <span className="people-icon" aria-hidden="true" />
                        {getEventSpots(item)}
                      </span>
                      {item.tag && (
                        <span className="explore-tag mine-event-tag">
                          {tagIcons[tag] && <img src={tagIcons[tag]} alt="" />}
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}
