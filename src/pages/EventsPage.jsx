import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";

const fallbackImages = {
  "fodbold":
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=640&q=80",
  "løb":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=640&q=80",
  "lob":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=640&q=80",
};

const tagIcons = {
  "fodbold": soccerIcon,
  "løb": runIcon,
  "lob": runIcon,
};

function normalizeTag(tag = "") {
  return tag.trim().toLowerCase();
}

function getEventImage(item) {
  const tag = normalizeTag(item.tag);
  return (
    item.image ||
    fallbackImages[tag] ||
    "https://images.unsplash.com/photo-1540575467063-178f50002caf?auto=format&fit=crop&w=640&q=80"
  );
}

function getEventSpots(item) {
  return item.spots || item.participants || item.capacity || "7 / 22";
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sharedEventImage = events[0] ? getEventImage(events[0]) : "";

  const fetchEvents = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchEvents);
  }, [fetchEvents]);

  return (
    <div className="events-page">
      <header className="events-toolbar" aria-label="Events værktøjer">
        <button type="button" className="toolbar-btn">
          <span className="filter-icon" aria-hidden="true" />
          Filtre
        </button>
        <h1>Events</h1>
        <button type="button" className="toolbar-btn">
          <span className="sort-icon" aria-hidden="true" />
          Sorter
        </button>
      </header>

      <section className="events-list">
        {loading ? (
          <p>Henter events...</p>
        ) : events.length === 0 ? (
          <p>Ingen events fundet.</p>
        ) : (
          <div className="explore-event-list">
            {events.map((item) => (
              <article
                key={item.id ?? item.ID ?? item.title}
                className="explore-event-card"
              >
                <div className="explore-card-image">
                  <img
                    src={sharedEventImage || getEventImage(item)}
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="explore-card-badge">
                    <span className="people-icon" aria-hidden="true" />
                    {getEventSpots(item)}
                  </span>
                </div>
                <div className="explore-card-body">
                  <h3>{item.title}</h3>
                  <div className="explore-card-meta">
                    <p>
                      <span
                        className="meta-icon location-icon"
                        aria-hidden="true"
                      />
                      <span>{item.location}</span>
                    </p>
                    <p>
                      <span
                        className="meta-icon time-icon"
                        aria-hidden="true"
                      />
                      <span>{item.date}</span>
                    </p>
                  </div>
                  <div className="explore-card-footer">
                    {item.tag && (
                      <span className="explore-tag">
                        {tagIcons[normalizeTag(item.tag)] && (
                          <img src={tagIcons[normalizeTag(item.tag)]} alt="" />
                        )}
                        {item.tag}
                      </span>
                    )}
                    <button type="button" className="join-btn">
                      Join
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}
