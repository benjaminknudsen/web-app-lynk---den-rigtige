import { useState } from "react";
import { NavLink } from "react-router";
import {
  SEEDED_EXPLORE_EVENT_JOIN_KEY,
  seededExploreEvents,
} from "../lib/exploreEvents";
import { getEventStartDate } from "../utils/eventDates";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler-run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon-basketball.svg";

const filterActivities = [
  { name: "Alle", value: "", icon: null },
  { name: "Fodbold", value: "fodbold", icon: soccerIcon },
  { name: "Løb", value: "løb", icon: runIcon },
  { name: "Padel", value: "padel", icon: padelIcon },
  { name: "Basketball", value: "basketball", icon: basketIcon },
];

const distanceOptions = ["Alle", "< 2 km", "< 5 km", "< 10 km", "+ 10 km"];
const moodOptions = ["Alle", "Casual", "Aktiv", "Seriøst"];
const sortOptions = [
  { label: "Snarest først", value: "soonest", icon: "time" },
  { label: "Populære", value: "popular", icon: "fire" },
  { label: "Afstand (nærmest)", value: "distance", icon: "location" },
  { label: "Nyeste events", value: "newest", icon: "calendar" },
];

const fallbackImages = {
  "fodbold":
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=640&q=80",
  "løb":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=640&q=80",
  "lob":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=640&q=80",
  "padel":
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=640&q=80",
  "basketball":
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80",
  "basket":
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80",
};

const tagIcons = {
  "fodbold": soccerIcon,
  "løb": runIcon,
  "lob": runIcon,
  "padel": padelIcon,
  "basketball": basketIcon,
  "basket": basketIcon,
};

function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
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

function readSeededJoinedEventIds() {
  try {
    const storedIds = JSON.parse(
      localStorage.getItem(SEEDED_EXPLORE_EVENT_JOIN_KEY) || "[]",
    );

    return Array.isArray(storedIds) ? storedIds : [];
  } catch {
    return [];
  }
}

export default function EventsPage() {
  const [error, setError] = useState("");
  const [seededJoinedEventIds, setSeededJoinedEventIds] = useState(
    readSeededJoinedEventIds,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("soonest");
  const [filters, setFilters] = useState({
    activity: "",
    distance: "Alle",
    mood: "Alle",
    date: "",
  });
  const filteredEvents = seededExploreEvents
    .filter((item) => {
      const activity = normalizeTag(item.activity_type || item.tag);
      const mood = normalizeTag(item.level);
      const date = normalizeTag(item.date);

      return (
        (!filters.activity || activity === filters.activity) &&
        (filters.mood === "Alle" || mood === normalizeTag(filters.mood)) &&
        (!filters.date || date.includes(normalizeTag(filters.date)))
      );
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === "popular") {
        return Number(b.capacity || 0) - Number(a.capacity || 0);
      }

      if (sortBy === "newest") {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }

      return getEventStartDate(a).getTime() - getEventStartDate(b).getTime();
    });

  function resetFilters() {
    setFilters({
      activity: "",
      distance: "Alle",
      mood: "Alle",
      date: "",
    });
  }

  function persistSeededJoinedEventIds(nextIds) {
    setSeededJoinedEventIds(nextIds);
    localStorage.setItem(
      SEEDED_EXPLORE_EVENT_JOIN_KEY,
      JSON.stringify(nextIds),
    );
  }

  function isEventJoined(item) {
    return seededJoinedEventIds.includes(item.id);
  }

  async function handleJoinEvent(item) {
    const isJoined = seededJoinedEventIds.includes(item.id);
    const nextIds = isJoined
      ? seededJoinedEventIds.filter((id) => id !== item.id)
      : [...new Set([...seededJoinedEventIds, item.id])];

    persistSeededJoinedEventIds(nextIds);
    setError("");
  }

  return (
    <div className="events-page">
      <header className="events-toolbar" aria-label="Events værktøjer">
        <button
          type="button"
          className={`toolbar-btn${showFilters ? " active" : ""}`}
          onClick={() => {
            setShowFilters((current) => !current);
            setShowSort(false);
          }}
          aria-expanded={showFilters}
        >
          <span className="filter-icon" aria-hidden="true" />
          Filtre
        </button>
        <h1>Events</h1>
        <button
          type="button"
          className={`toolbar-btn${showSort ? " active" : ""}`}
          onClick={() => {
            setShowSort((current) => !current);
            setShowFilters(false);
          }}
          aria-expanded={showSort}
        >
          <span className="sort-icon" aria-hidden="true" />
          Sorter
        </button>
      </header>

      {showFilters && (
        <section className="event-filter-overlay" aria-label="Filtre">
          <div className="filter-section-heading">
            <h2>Aktivitet</h2>
            <button type="button" onClick={resetFilters}>
              Nulstil
            </button>
          </div>
          <div className="filter-activity-row">
            {filterActivities.map((activity) => (
              <button
                key={activity.name}
                type="button"
                className={
                  filters.activity === activity.value ? "selected" : ""
                }
                onClick={() =>
                  setFilters({ ...filters, activity: activity.value })
                }
              >
                <span className="filter-activity-icon">
                  {activity.icon ? (
                    <img src={activity.icon} alt="" />
                  ) : (
                    <span className="all-activity-icon" aria-hidden="true" />
                  )}
                </span>
                <span>{activity.name}</span>
              </button>
            ))}
          </div>

          <div className="filter-section">
            <h2>Afstand</h2>
            <div className="filter-pill-row">
              {distanceOptions.map((distance) => (
                <button
                  key={distance}
                  type="button"
                  className={filters.distance === distance ? "selected" : ""}
                  onClick={() => setFilters({ ...filters, distance })}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h2>Stemning</h2>
            <div className="filter-pill-row mood-filter-row">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className={filters.mood === mood ? "selected" : ""}
                  onClick={() => setFilters({ ...filters, mood })}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h2>Dato</h2>
            <label className="filter-date-field">
              <span className="filter-calendar-icon" aria-hidden="true" />
              <input
                value={filters.date}
                onChange={(event) =>
                  setFilters({ ...filters, date: event.target.value })
                }
                placeholder="Vælg dato"
              />
              <span className="filter-chevron" aria-hidden="true" />
            </label>
          </div>
        </section>
      )}

      {showSort && (
        <section className="event-sort-overlay" aria-label="Sorter events">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={sortBy === option.value ? "selected" : ""}
              onClick={() => {
                setSortBy(option.value);
                setShowSort(false);
              }}
            >
              <span
                className={`sort-option-icon sort-option-${option.icon}`}
                aria-hidden="true"
              />
              <span>{option.label}</span>
            </button>
          ))}
        </section>
      )}

      <section className="events-list">
        {filteredEvents.length === 0 ? (
          <p>Ingen events fundet.</p>
        ) : (
          <div className="explore-event-list">
            {filteredEvents.map((item) => (
              <article
                key={item.id ?? item.ID ?? item.title}
                className="explore-event-card"
              >
                <NavLink
                  to={`/events/${item.id ?? item.ID}`}
                  className="explore-card-image explore-card-link"
                >
                  <img
                    src={getEventImage(item)}
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="explore-card-badge">
                    <span className="people-icon" aria-hidden="true" />
                    {getEventSpots(item)}
                  </span>
                </NavLink>
                <div className="explore-card-body">
                  <h3>
                    <NavLink to={`/events/${item.id ?? item.ID}`}>
                      {item.title}
                    </NavLink>
                  </h3>
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
                    <button
                      type="button"
                      className={`join-btn${
                        isEventJoined(item) ? " is-joined" : ""
                      }`}
                      onClick={() => handleJoinEvent(item)}
                    >
                      {isEventJoined(item) ? "Tilmeldt" : "Join"}
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
