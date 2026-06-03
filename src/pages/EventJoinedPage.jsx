import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LottieCanvas from "../components/LottieCanvas";
import { supabase } from "../lib/supabaseClient";
import checkAnimation from "../assets/lottie/real-new-check.json";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler-run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon-basketball.svg";
import { getEventImage, normalizeTag } from "../utils/eventDisplay";

const tagIcons = {
  fodbold: soccerIcon,
  "løb": runIcon,
  lob: runIcon,
  padel: padelIcon,
  basket: basketIcon,
  basketball: basketIcon,
};

export default function EventJoinedPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main className="event-joined-page">
      <button
        type="button"
        className="event-detail-back event-joined-back"
        onClick={() => navigate(-1)}
        aria-label="Gå tilbage"
      >
        <span aria-hidden="true" />
      </button>

      <section className="event-joined-hero">
        <LottieCanvas animationData={checkAnimation} className="event-joined-check" />
        <h1>Du er tilmeldt!</h1>
        <p>Vi glæder os til at se dig</p>
      </section>

      {loading ? (
        <p className="mine-empty-state">Henter event...</p>
      ) : !event || error ? (
        <p className="mine-empty-state">{error || "Eventet blev ikke fundet."}</p>
      ) : (
        <>
          <article className="joined-event-card">
            <img src={getEventImage(event)} alt="" />
            <div className="joined-event-card-content">
              <h2>{event.title}</h2>
              <p>
                <span className="meta-icon location-icon" aria-hidden="true" />
                <span>{event.location}</span>
              </p>
              <p>
                <span className="meta-icon time-icon" aria-hidden="true" />
                <span>{event.date}</span>
              </p>
              {event.tag && (
                <span className="explore-tag joined-event-tag">
                  {tagIcon && <img src={tagIcon} alt="" />}
                  {event.tag}
                </span>
              )}
            </div>
          </article>

          <article className="joined-next-card">
            <h2>Hvad sker der nu?</h2>
            <p>
              <span className="joined-info-icon bell" aria-hidden="true" />
              Du modtager en påmindelse 1 time før eventet starter
            </p>
            <p>
              <span className="joined-info-icon message" aria-hidden="true" />
              Arrangøren kan kontakte dig via beskeder
            </p>
            <p>
              <span className="joined-info-icon info" aria-hidden="true" />
              Husk at tjekke eventet for opdateringer
            </p>
          </article>
        </>
      )}

      <div className="event-joined-actions">
        <button type="button" onClick={() => navigate("/mineevents")}>
          Se mine events
        </button>
        <button type="button" className="secondary" onClick={() => navigate("/events")}>
          Find flere events
        </button>
      </div>
    </main>
  );
}
