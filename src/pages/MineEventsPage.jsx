import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { DEMO_USER_ID } from "../lib/demoUser";
import {
  SEEDED_EXPLORE_EVENT_JOIN_KEY,
  seededExploreEvents,
} from "../lib/exploreEvents";
import { sortEventsByStartDate } from "../utils/eventDates";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler-run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon-basketball.svg";
import activityPhoto from "../assets/image-28.png";
import createdEventsIcon from "../assets/events-created-icon.png";
import attendingEventsIcon from "../assets/events-attending-icon.png";

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
  padel: padelIcon,
  basket: basketIcon,
  basketball: basketIcon,
};

function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
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
  if (item.spots) {
    return item.spots;
  }

  const participants = item.participants ?? item.attendees ?? item.joined_count;

  if (item.capacity) {
    return `${Math.max(Number(participants ?? 1), 1)}/${item.capacity}`;
  }

  if (participants) {
    return `${Math.max(Number(participants), 1)}/22`;
  }

  return "1/22";
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

function getJoinedSeededExploreEvents() {
  try {
    const storedIds = JSON.parse(
      localStorage.getItem(SEEDED_EXPLORE_EVENT_JOIN_KEY) || "[]",
    );

    if (!Array.isArray(storedIds)) {
      return [];
    }

    return seededExploreEvents.filter((event) => storedIds.includes(event.id));
  } catch {
    return [];
  }
}

export default function MineEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendingLoading, setAttendingLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", DEMO_USER_ID)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setEvents([]);
    } else {
      setEvents(sortEventsByStartDate(data || []));
      setError("");
    }
    setLoading(false);
  }, []);

  const fetchAttendingEvents = useCallback(async () => {
    setAttendingLoading(true);
    const { data, error } = await supabase
      .from("event_participants")
      .select("events(*)")
      .eq("user_id", DEMO_USER_ID)
      .eq("status", "joined")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setAttendingEvents(sortEventsByStartDate(getJoinedSeededExploreEvents()));
    } else {
      setAttendingEvents(sortEventsByStartDate([
        ...getJoinedSeededExploreEvents(),
        ...(data || []).map((item) => item.events).filter(Boolean),
      ]));
      setError("");
    }
    setAttendingLoading(false);
  }, []);

  const refreshMineEvents = useCallback(async () => {
    await Promise.all([fetchEvents(), fetchAttendingEvents()]);
  }, [fetchAttendingEvents, fetchEvents]);

  useEffect(() => {
    void Promise.resolve().then(refreshMineEvents);
  }, [refreshMineEvents]);

  async function handleDelete(id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      refreshMineEvents();
    }
  }

  function handleEdit(item) {
    navigate(`/opret?id=${item.id ?? item.ID ?? ""}`);
  }

  const upcomingCount = events.length;
  const attendingCount = attendingEvents.length;

  function renderEventRow(item, actions = null) {
    const dateParts = getEventDateParts(item.date);
    const tag = normalizeTag(item.tag);
    const detailPath = `/events/${item.id ?? item.ID}`;

    return (
      <article
        key={item.id ?? item.ID ?? item.title}
        className="mine-event-row"
        role="link"
        tabIndex={0}
        aria-label={`Åbn ${item.title}`}
        onClick={() => navigate(detailPath)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(detailPath);
          }
        }}
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
            {actions}
          </div>

          <div className="mine-event-meta">
            <p>
              <span className="meta-icon location-icon" aria-hidden="true" />
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
  }

  return (
    <div className="events-page mine-events-page">
      <header className="mine-events-header">
        <h1>Mine events</h1>
      </header>

      <section className="mine-events-summary" aria-label="Kommende events">
        <div className="section-header mine-events-section-header">
          <h2>Kommende events</h2>
          <button type="button" onClick={refreshMineEvents} className="link-btn">
            Opdater
          </button>
        </div>
        <div className="mine-stats-grid">
          <article className="mine-stat-card mine-stat-card-created">
            <img
              src={createdEventsIcon}
              alt=""
              className="mine-calendar-icon"
              aria-hidden="true"
            />
            <strong>{upcomingCount}</strong>
            <p>Du har oprettet kommende events</p>
          </article>
          <article className="mine-stat-card mine-stat-card-attending">
            <img
              src={attendingEventsIcon}
              alt=""
              className="mine-calendar-icon"
              aria-hidden="true"
            />
            <strong>{attendingCount}</strong>
            <p>Du deltager i kommende events</p>
          </article>
        </div>
      </section>

      <section className="mine-created-events">
        <h2>Events du har oprettet</h2>

        {loading ? (
          <p className="mine-empty-state">Henter events...</p>
        ) : events.length === 0 ? (
          <p className="mine-empty-state">
            Ingen events fundet. Opret et nyt event på siden Opret.
          </p>
        ) : (
          <div className="mine-created-list">
            {events.map((item) =>
              renderEventRow(
                item,
                <div className="mine-event-menu" aria-label="Event actions">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(item);
                    }}
                  >
                    Rediger
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(item.id ?? item.ID);
                    }}
                  >
                    Slet
                  </button>
                </div>
              )
            )}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </section>

      <section className="mine-created-events mine-attending-events">
        <h2>Events du deltager i</h2>

        {attendingLoading ? (
          <p className="mine-empty-state">Henter events...</p>
        ) : attendingEvents.length === 0 ? (
          <p className="mine-empty-state">
            Du deltager ikke i nogen events endnu. Tryk Join på Udforsk.
          </p>
        ) : (
          <div className="mine-created-list">
            {attendingEvents.map((item) => renderEventRow(item))}
          </div>
        )}
      </section>
    </div>
  );
}
