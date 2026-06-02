import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import profileImg from "../assets/profilbillede.png";
import sofieImg from "../assets/sofieaarhus.png";

const fallbackImages = {
  fodbold:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
  "løb":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  lob:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
};

const tagIcons = {
  fodbold: soccerIcon,
  "løb": runIcon,
  lob: runIcon,
};

const participantImages = [
  profileImg,
  sofieImg,
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
];

function normalizeTag(tag = "") {
  return tag.trim().toLowerCase();
}

function getEventImage(item) {
  const tag = normalizeTag(item?.tag);
  return (
    item?.image ||
    fallbackImages[tag] ||
    "https://images.unsplash.com/photo-1540575467063-178f50002caf?auto=format&fit=crop&w=900&q=80"
  );
}

function getEventSpots(item) {
  return item?.spots || item?.participants || item?.capacity || "7 / 22";
}

function getEventTime(date = "") {
  if (!date) {
    return "Tir 26 Maj · 18:30";
  }

  return date;
}

function getDescription(item) {
  return (
    item?.description ||
    "Kom og spil fodbold for hyggen. Alle niveauer er velkommen. Vi skal bare have det sjovt. Vi har bold og overtrækstrøjer med, så du skal bare medbringe det gode humør :)"
  );
}

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setEvent(null);
      } else {
        setEvent(data);
        setError("");
      }

      setLoading(false);
    }

    fetchEvent();
  }, [eventId]);

  const tag = normalizeTag(event?.tag);
  const tagIcon = tagIcons[tag];
  const isOrganizer = Boolean(
    event?.is_organizer || event?.isOrganizer || event?.organizer
  );
  const organizerName = event?.organizer_name || event?.organizer || "Benjamin";
  const organizerSubline = isOrganizer
    ? "Du har arrangeret 13 events"
    : "Arrangerer 13 Events";
  const skillTags = useMemo(
    () => ["For alle", "Casual", "Aktiv", "Udendørs"],
    []
  );

  if (loading) {
    return (
      <main className="event-detail-page event-detail-state">
        <p>Henter event...</p>
      </main>
    );
  }

  if (!event || error) {
    return (
      <main className="event-detail-page event-detail-state">
        <button
          type="button"
          className="event-detail-back"
          onClick={() => navigate(-1)}
          aria-label="Gå tilbage"
        >
          <span aria-hidden="true" />
        </button>
        <p>{error || "Eventet blev ikke fundet."}</p>
      </main>
    );
  }

  return (
    <main className="event-detail-page">
      <section className="event-detail-hero">
        <img src={getEventImage(event)} alt="" />
        <button
          type="button"
          className="event-detail-back"
          onClick={() => navigate(-1)}
          aria-label="Gå tilbage"
        >
          <span aria-hidden="true" />
        </button>
      </section>

      <section className="event-detail-content">
        <div className="event-detail-title-row">
          <h1>{event.title}</h1>
          {isOrganizer && (
            <span className="organizer-pill">
              Du er arrangør
            </span>
          )}
        </div>

        {event.tag && (
          <span className="explore-tag event-detail-tag">
            {tagIcon && <img src={tagIcon} alt="" />}
            {event.tag}
          </span>
        )}

        <div className="event-detail-chips" aria-label="Event type">
          {skillTags.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="event-detail-meta">
          <p>
            <span className="meta-icon location-icon" aria-hidden="true" />
            <span>{event.location}</span>
          </p>
          <p>
            <span className="meta-icon time-icon" aria-hidden="true" />
            <span>{getEventTime(event.date)}</span>
          </p>
        </div>

        <p className="event-detail-description">{getDescription(event)}</p>

        <article className="event-organizer-card">
          <h2>Arrangør</h2>
          <button type="button" className="event-organizer-row">
            <img src={profileImg} alt="" />
            <span>
              <strong>{organizerName}</strong>
              <small>{organizerSubline}</small>
            </span>
            <span className="organizer-arrow" aria-hidden="true" />
          </button>
        </article>

        <section className="event-participants">
          <div className="event-participants-header">
            <h2>Deltagere ({getEventSpots(event)})</h2>
            <button type="button">Se alle</button>
          </div>
          <div className="participant-row" aria-label="Deltagere">
            {participantImages.map((image, index) => (
              <img src={image} alt="" key={image} />
            ))}
            <span>+2</span>
          </div>
        </section>

        <button
          type="button"
          className={`event-detail-primary${isJoined ? " is-joined" : ""}`}
          onClick={() => {
            if (!isOrganizer) {
              setIsJoined((current) => !current);
            }
          }}
        >
          {isOrganizer
            ? "Rediger dit event"
            : isJoined
              ? "Du er tilmeldt"
              : "Tilmeld dig event"}
        </button>
      </section>
    </main>
  );
}
