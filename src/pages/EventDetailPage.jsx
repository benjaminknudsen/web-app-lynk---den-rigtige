import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { DEMO_USER_ID } from "../lib/demoUser";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";
import profileImg from "../assets/profilbillede.png";
import sofieImg from "../assets/sofieaarhus.png";

const fallbackImages = {
  fodbold:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
  "løb":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  lob:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
  padel:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
  basket:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
};

const tagIcons = {
  fodbold: soccerIcon,
  "løb": runIcon,
  lob: runIcon,
  padel: padelIcon,
  basket: basketIcon,
};

const demoEvents = {
  "demo-run-10k": {
    title: "Løbetur - 10 km",
    location: "Aarhus",
    date: "Man 26 Maj · 18:30",
    tag: "Løb",
    spots: "4 / 10",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
    description:
      "Vi løber en rolig 10 km tur gennem Aarhus. Alle der kan holde et stabilt tempo er velkomne.",
  },
  "demo-fodboldhygge": {
    title: "Fodboldhygge",
    location: "Aarhus",
    date: "Lør 24 Maj · 13:00",
    tag: "Fodbold",
    spots: "5 / 22",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80",
  },
  "demo-padel-for-alle": {
    title: "Padel for alle",
    location: "Aarhus",
    date: "Ons 28 Maj · 19:30",
    tag: "Padel",
    spots: "3 / 14",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  },
  "demo-basket-i-parken": {
    title: "Basket i parken",
    location: "Aarhus",
    date: "Tor 29 Maj · 17:30",
    tag: "Basket",
    spots: "6 / 12",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
  "demo-10k-pace": {
    title: "10k @ 5:00",
    location: "Aarhus",
    date: "Tir 13 Jun · 17:00",
    tag: "Løb",
    spots: "7 / 10",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
  },
  "demo-11v11-aalborg": {
    title: "11v11 Aalborg",
    location: "Aalborg",
    date: "Tir 18 Jun · 19:00",
    tag: "Fodbold",
    spots: "19 / 22",
    image:
      "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=900&q=80",
  },
  "demo-mangler-1": {
    title: "Mangler 1",
    location: "Aarhus",
    date: "Fre 14 Jun · 18:30",
    tag: "Padel",
    spots: "3 / 4",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  },
  "demo-morgenlob": {
    title: "Morgenløb",
    location: "Aarhus",
    date: "Søn 16 Jun · 08:00",
    tag: "Løb",
    spots: "8 / 15",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=80",
  },
  "demo-lobetur-5-7": {
    title: "Løbetur - 5-7 km",
    location: "Aarhus",
    date: "I dag · 16:30",
    tag: "Løb",
    spots: "2 / 8",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
  },
  "demo-fodbold-kunst": {
    title: "Fodbold på kunst",
    location: "Aarhus",
    date: "I dag · 15:45",
    tag: "Fodbold",
    spots: "9 / 14",
    image:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80",
  },
  "demo-padel-drop-in": {
    title: "Padel drop-in",
    location: "Aarhus",
    date: "I dag · 17:00",
    tag: "Padel",
    spots: "2 / 4",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
  },
  "demo-basket-efter-skole": {
    title: "Basket efter skole",
    location: "Aarhus",
    date: "I dag · 18:00",
    tag: "Basket",
    spots: "6 / 10",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80",
  },
};

const participantImages = [
  profileImg,
  sofieImg,
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
];

function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
}

function normalizeEventTags(tags) {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
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
  if (item?.spots) {
    return item.spots;
  }

  const participants = item?.participants ?? item?.attendees ?? item?.joined_count;

  if (item?.capacity) {
    return `${Math.max(Number(participants ?? 1), 1)}/${item.capacity}`;
  }

  if (participants) {
    return `${Math.max(Number(participants), 1)}/22`;
  }

  return "1/22";
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
      setIsJoined(false);
      setLoading(true);

      if (demoEvents[eventId]) {
        setEvent(demoEvents[eventId]);
        setError("");
        setLoading(false);
        return;
      }

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

        if (data?.ID) {
          const { data: participation, error: participationError } =
            await supabase
              .from("event_participants")
              .select("id")
              .eq("event_id", data.ID)
              .eq("user_id", DEMO_USER_ID)
              .eq("status", "joined")
              .maybeSingle();

          if (!participationError) {
            setIsJoined(Boolean(participation));
          }
        }
      }

      setLoading(false);
    }

    fetchEvent();
  }, [eventId]);

  async function handleJoinToggle() {
    if (isOrganizer) {
      navigate(`/opret?id=${eventId}`);
      return;
    }

    if (!event?.ID) {
      setIsJoined((current) => !current);
      return;
    }

    if (isJoined) {
      const { error } = await supabase
        .from("event_participants")
        .delete()
        .eq("event_id", event.ID)
        .eq("user_id", DEMO_USER_ID);

      if (error) {
        setError(error.message);
        return;
      }

      setIsJoined(false);
      setError("");
      return;
    }

    window.dispatchEvent(new CustomEvent("lynk:show-loading"));

    const { error } = await supabase.from("event_participants").insert({
      event_id: event.ID,
      user_id: DEMO_USER_ID,
      status: "joined",
    });

    if (error) {
      setError(error.message);
      return;
    }

    setIsJoined(true);
    setError("");
    window.setTimeout(() => {
      navigate(`/event-tilmeldt/${eventId}`);
    }, 1900);
  }

  const tag = normalizeTag(event?.tag);
  const tagIcon = tagIcons[tag];
  const isOrganizer = Boolean(
    event?.user_id === DEMO_USER_ID ||
      event?.is_organizer ||
      event?.isOrganizer ||
      event?.organizer
  );
  const organizerName = event?.organizer_name || event?.organizer || "Benjamin";
  const organizerSubline = isOrganizer
    ? "Du har arrangeret 13 events"
    : "Arrangerer 13 Events";
  const eventTags = normalizeEventTags(event?.tags);

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

        {eventTags.length > 0 && (
          <div className="event-detail-chips" aria-label="Event tags">
            {eventTags.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}

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
            {participantImages.map((image) => (
              <img src={image} alt="" key={image} />
            ))}
            <span>+2</span>
          </div>
        </section>

        <button
          type="button"
          className={`event-detail-primary${isJoined ? " is-joined" : ""}`}
          onClick={handleJoinToggle}
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
