import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";

const activityOptions = [
  { name: "Fodbold", icon: soccerIcon },
  { name: "Padel", icon: padelIcon },
  { name: "Løb", icon: runIcon },
  { name: "Basketball", icon: basketIcon },
  { name: "Fitness", icon: null },
  { name: "Cykling", icon: null },
  { name: "Yoga", icon: null },
  { name: "Badminton", icon: null },
  { name: "Andet", icon: null },
];

const levelOptions = ["Casual", "Motion", "Seriøst"];

function splitDateValue(value = "") {
  const [datePart, timePart] = value.split("·").map((part) => part.trim());

  return {
    eventDate: datePart || "",
    eventTime: timePart || "",
  };
}

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    location: "",
    eventDate: "",
    eventTime: "",
    tag: "",
    activity_type: "",
    level: "",
    capacity: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const loadEvent = useCallback(async (id) => {
    setLoading(true);

    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const fallback = await supabase
        .from("events")
        .select("*")
        .eq("ID", id)
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error) {
      setError(error.message || "Kunne ikke hente event.");
      setLoading(false);
      return;
    }

    const { eventDate, eventTime } = splitDateValue(data.date || "");

    setForm({
      title: data.title || "",
      location: data.location || "",
      eventDate,
      eventTime,
      tag: data.tag || data.activity_type || "",
      activity_type: data.activity_type || data.tag || "",
      level: data.level || "",
      capacity: data.capacity || "",
      description: data.description || "",
      image: data.image || "",
    });
    setEditMode(true);
    setStep(1);
    setLoading(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      if (eventId) {
        loadEvent(eventId);
      } else {
        setEditMode(false);
        setStep(1);
        setForm({
          title: "",
          location: "",
          eventDate: "",
          eventTime: "",
          tag: "",
          activity_type: "",
          level: "",
          capacity: "",
          description: "",
          image: "",
        });
      }
    });
  }, [eventId, loadEvent]);

  function validateStep(currentStep = step) {
    setError("");

    if (currentStep === 1 && !form.activity_type) {
      setError("Vælg en sportsgren før du går videre.");
      return false;
    }

    if (currentStep === 2 && (!form.eventDate || !form.eventTime || !form.location)) {
      setError("Udfyld dato, tidspunkt og lokation før du går videre.");
      return false;
    }

    if (
      currentStep === 3 &&
      (!form.title || !form.level || !form.capacity)
    ) {
      setError("Udfyld navn, niveau og antal deltagere før du gemmer.");
      return false;
    }

    return true;
  }

  function handleNext() {
    if (!validateStep()) {
      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, 3));
  }

  function handleBack() {
    setError("");
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess("");

    if (!validateStep(3)) {
      return;
    }

    const date = `${form.eventDate} · ${form.eventTime}`;
    const capacity = Number.parseInt(form.capacity, 10);
    const payload = {
      title: form.title,
      location: form.location,
      date,
      tag: form.activity_type,
      activity_type: form.activity_type,
      level: form.level,
      capacity: Number.isNaN(capacity) ? null : capacity,
      description: form.description || null,
      image: form.image || null,
    };

    if (editMode && eventId) {
      let res = await supabase
        .from("events")
        .update(payload)
        .eq("id", eventId);

      if ((res.error && !res.data) || (res.data && res.data.length === 0)) {
        res = await supabase
          .from("events")
          .update(payload)
          .eq("ID", eventId);
      }

      if (res.error) {
        setError(res.error.message);
        return;
      }

      setSuccess("Event opdateret!");
      setTimeout(() => {
        navigate("/mineevents");
      }, 900);
      return;
    }

    const { error } = await supabase.from("events").insert([payload]);

    if (error) {
      setError(error.message);
      return;
    }

    setForm({
      title: "",
      location: "",
      eventDate: "",
      eventTime: "",
      tag: "",
      activity_type: "",
      level: "",
      capacity: "",
      description: "",
      image: "",
    });
    setSuccess("Event oprettet!");
    setTimeout(() => {
      navigate("/mineevents");
    }, 900);
  }

  return (
    <div className="events-page create-event-page">
      <header className="create-event-header">
        <h1>{editMode ? "Opdater event" : "Opret event"}</h1>
      </header>

      <section className="events-form">
        {loading ? (
          <p className="mine-empty-state">Henter event...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="step-indicator" aria-label={`Trin ${step} af 3`}>
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={item === step ? "active" : ""}
                  aria-current={item === step ? "step" : undefined}
                >
                  {item}
                </span>
              ))}
            </div>

            {step === 1 && (
              <div className="create-step">
                <div className="create-step-copy">
                  <h2>Hvad skal i lave til dit event?</h2>
                  <p>Vælg den aktivitet dit event handler om</p>
                </div>
                <div className="activity-choice-grid">
                  {activityOptions.map((activity) => (
                    <button
                      key={activity.name}
                      type="button"
                      className={
                        form.activity_type === activity.name ? "selected" : ""
                      }
                      onClick={() =>
                        setForm({
                          ...form,
                          activity_type: activity.name,
                          tag: activity.name,
                        })
                      }
                    >
                      {activity.icon ? (
                        <img src={activity.icon} alt="" />
                      ) : (
                        <span className="activity-fallback-icon">
                          {activity.name.slice(0, 1)}
                        </span>
                      )}
                      <span>{activity.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="create-step">
                <div className="create-step-copy">
                  <h2>Hvor og hvornår?</h2>
                  <p>Vælg dato, tidspunkt og placering</p>
                </div>
                <label>
                  Dato
                  <input
                    value={form.eventDate}
                    onChange={(e) =>
                      setForm({ ...form, eventDate: e.target.value })
                    }
                    placeholder="Lør. 31 maj 2026"
                  />
                </label>
                <label>
                  Tidspunkt
                  <input
                    value={form.eventTime}
                    onChange={(e) =>
                      setForm({ ...form, eventTime: e.target.value })
                    }
                    placeholder="16:00 - 17:30"
                  />
                </label>
                <label>
                  Lokation
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Læsøesgade 24, 8000 Aarhus"
                  />
                </label>
                <label>
                  Billedlink <span>(Valgfri)</span>
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </label>
                <div
                  className={
                    form.image
                      ? "create-image-preview has-image"
                      : "create-image-preview"
                  }
                >
                  {form.image ? (
                    <img src={form.image} alt="Preview af event" />
                  ) : (
                    <span>Preview af eventbillede</span>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="create-step">
                <div className="create-step-copy">
                  <h2>Detaljer om eventet</h2>
                  <p>Fortæl lidt mere så andre ved hvad de kan forvente</p>
                </div>
                <label>
                  Navn på event
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Giv dit event et navn..."
                  />
                </label>
                <div className="create-field-group">
                  <span>Niveau / Stemning</span>
                  <div className="level-choice-row">
                    {levelOptions.map((level) => (
                      <button
                        key={level}
                        type="button"
                        className={form.level === level ? "selected" : ""}
                        onClick={() => setForm({ ...form, level })}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <label>
                  Antal deltagere
                  <input
                    type="number"
                    min="1"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: e.target.value })
                    }
                    placeholder="22"
                  />
                </label>
                <label>
                  Beskrivelse <span>(Valgfri)</span>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Skriv en kort beskrivelse..."
                    maxLength="200"
                  />
                  <small>{form.description.length}/200</small>
                </label>
              </div>
            )}

            <div className="button-row create-step-actions">
              {step > 1 && (
                <button type="button" className="secondary-btn" onClick={handleBack}>
                  Tilbage
                </button>
              )}
              {step < 3 ? (
                <button type="button" className="primary-btn" onClick={handleNext}>
                  Næste
                </button>
              ) : (
                <button type="submit" className="primary-btn">
                  {editMode ? "Opdater event" : "Opret event"}
                </button>
              )}
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        )}
      </section>
    </div>
  );
}
