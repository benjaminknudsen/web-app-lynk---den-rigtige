import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { DEMO_USER_ID } from "../lib/demoUser";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";
import fitnessIcon from "../assets/maki_fitness-centre.svg";
import cyclingIcon from "../assets/sportsgren.svg";
import yogaIcon from "../assets/yoga.svg";
import badmintonIcon from "../assets/badminton.svg";
import dotsIcon from "../assets/tabler_dots.svg";
import cancelIcon from "../assets/Aflys.svg";
import organizerIcon from "../assets/Arrangør.svg";
import motionIcon from "../assets/motions.svg";
import visibilityIcon from "../assets/synlighed.svg";
import smileyIcon from "../assets/smiley.png";
import seriousIcon from "../assets/seriøsts.svg";
import mapPreview from "../assets/skærmbilledelokation.png";
import sofieImg from "../assets/sofieaarhus.png";

const activityOptions = [
  { name: "Fodbold", icon: soccerIcon },
  { name: "Padel", icon: padelIcon },
  { name: "Løb", icon: runIcon },
  { name: "Basketball", icon: basketIcon },
  { name: "Fitness", icon: fitnessIcon },
  { name: "Cykling", icon: cyclingIcon },
  { name: "Yoga", icon: yogaIcon },
  { name: "Badminton", icon: badmintonIcon },
  { name: "Andet", icon: dotsIcon },
];

const levelOptions = ["Casual", "Motion", "Seriøst"];
const tagOptions = ["Udendørs", "Begyndervenligt", "Indendørs", "Pulsen op"];
const levelIcons = {
  Casual: smileyIcon,
  Motion: motionIcon,
  Seriøst: seriousIcon,
};
const editHeroFallback =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80";
const eventParticipants = [
  { name: "Sofie", image: sofieImg },
  { name: "Benjamin", image: "self" },
  {
    name: "Mads",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
];
const currentUserName = "Benjamin";

function splitDateValue(value = "") {
  const [datePart, timePart] = value.split("·").map((part) => part.trim());

  return {
    eventDate: datePart || "",
    eventTime: timePart || "",
  };
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
    tags: [],
    newTag: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [visibilityModalOpen, setVisibilityModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transferRequestedTo, setTransferRequestedTo] = useState("");
  const transferOptions = eventParticipants.filter(
    (person) => person.name !== currentUserName
  );

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
      tags: normalizeEventTags(data.tags),
      newTag: "",
    });
    setEditMode(true);
    setIsPrivate(false);
    setTransferRequestedTo("");
    setStep(1);
    setLoading(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      if (eventId) {
        loadEvent(eventId);
      } else {
        setEditMode(false);
        setIsPrivate(false);
        setTransferRequestedTo("");
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
          tags: [],
          newTag: "",
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

  function updateForm(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function toggleTag(tag) {
    setForm((currentForm) => {
      const exists = currentForm.tags.includes(tag);

      return {
        ...currentForm,
        tags: exists
          ? currentForm.tags.filter((item) => item !== tag)
          : [...currentForm.tags, tag],
      };
    });
  }

  function addCustomTag() {
    const tag = form.newTag.trim();

    if (!tag || form.tags.includes(tag)) {
      updateForm("newTag", "");
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      tags: [...currentForm.tags, tag],
      newTag: "",
    }));
  }

  function removeTag(tag) {
    setForm((currentForm) => ({
      ...currentForm,
      tags: currentForm.tags.filter((item) => item !== tag),
    }));
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
      user_id: DEMO_USER_ID,
      tags: form.tags,
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
      tags: [],
      newTag: "",
    });
    setSuccess("Event oprettet!");
    setTimeout(() => {
      navigate("/mineevents");
    }, 900);
  }

  async function handleDeleteEvent() {
    if (!eventId) {
      navigate("/mineevents");
      return;
    }

    setError("");
    let res = await supabase.from("events").delete().eq("id", eventId);

    if (res.error) {
      res = await supabase.from("events").delete().eq("ID", eventId);
    }

    if (res.error) {
      setError(res.error.message);
      setDeleteModalOpen(false);
      return;
    }

    setDeleteModalOpen(false);
    navigate("/mineevents");
  }

  return (
    <div className={`events-page create-event-page${editMode ? " edit-event-page" : ""}`}>
      <header className="create-event-header">
        <h1>{editMode ? "Rediger event" : "Opret event"}</h1>
      </header>

      <section className="events-form">
        {loading ? (
          <p className="mine-empty-state">Henter event...</p>
        ) : editMode ? (
          <form onSubmit={handleSubmit} className="edit-event-form">
            <div className="edit-cover-field">
              <img src={form.image || editHeroFallback} alt="" />
              <button type="button" className="edit-image-button">
                <span aria-hidden="true" />
                Skift billede
              </button>
            </div>

            <label className="edit-field">
              Navn på event
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Fodboldhygge - Kom glad"
              />
            </label>

            <div className="create-field-group edit-level-group">
              <span>Niveau / Stemning</span>
              <div className="level-choice-row">
                {levelOptions.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={form.level === level ? "selected" : ""}
                    onClick={() => updateForm("level", level)}
                  >
                    <img src={levelIcons[level]} alt="" className="edit-level-icon" />
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <label className="edit-field edit-icon-field">
              Dato
              <span className="edit-input-shell">
                <span className="edit-input-icon edit-calendar-icon" aria-hidden="true" />
                <input
                  value={form.eventDate}
                  onChange={(e) => updateForm("eventDate", e.target.value)}
                  placeholder="Lør. 31 maj 2026"
                />
                <span className="edit-chevron" aria-hidden="true" />
              </span>
            </label>

            <label className="edit-field edit-icon-field">
              Tidspunkt
              <span className="edit-input-shell">
                <span className="edit-input-icon edit-clock-icon" aria-hidden="true" />
                <input
                  value={form.eventTime}
                  onChange={(e) => updateForm("eventTime", e.target.value)}
                  placeholder="16:00 - 17:30"
                />
                <span className="edit-chevron" aria-hidden="true" />
              </span>
            </label>

            <label className="edit-field edit-icon-field">
              Lokation
              <span className="edit-input-shell">
                <span className="edit-input-icon edit-pin-icon" aria-hidden="true" />
                <input
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  placeholder="Læsøesgade 24, 8000 Aarhus"
                />
                <span className="edit-chevron" aria-hidden="true" />
              </span>
            </label>

            <div className="edit-map-preview" aria-hidden="true">
              <img src={mapPreview} alt="" />
              <span className="edit-map-pin" />
            </div>

            <label className="edit-field edit-icon-field">
              Antal deltagere
              <span className="edit-input-shell">
                <span className="edit-input-icon edit-participants-icon" aria-hidden="true" />
                <input
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => updateForm("capacity", e.target.value)}
                  placeholder="22 Deltagere"
                />
              </span>
            </label>

            <label className="edit-field">
              <span className="edit-label-line">
                <strong>Beskrivelse</strong>
                <span>(Valgfri)</span>
              </span>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Vi spiller for hyggens skyld. Alle niveauer er velkomne så længe det gode humør er første prioritet."
                maxLength="200"
              />
              <small>{form.description.length}/200</small>
            </label>

            <div className="edit-tags-block">
              <span>Tags</span>
              <div className="tag-choice-row">
                {tagOptions.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={form.tags.includes(tag) ? "selected" : ""}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="edit-tags-row">
                {form.tags.map((tag) => (
                  <button type="button" key={tag} onClick={() => removeTag(tag)}>
                    {tag}
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="custom-tag-field">
                <input
                  value={form.newTag}
                  onChange={(e) => updateForm("newTag", e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addCustomTag();
                    }
                  }}
                  placeholder="Tilføj eget tag..."
                />
                <button type="button" onClick={addCustomTag}>
                  Tilføj
                </button>
              </div>
            </div>

            <div className="edit-settings-list">
              <button
                type="button"
                className="edit-settings-row"
                onClick={() => setVisibilityModalOpen(true)}
              >
                <img src={visibilityIcon} alt="" className="edit-settings-icon" />
                <span className="edit-settings-copy">
                  <strong>Synlighed</strong>
                  <span className="edit-settings-meta">
                    <small>{isPrivate ? "Privat event" : "Offentlig event"}</small>
                    <small>
                      {isPrivate
                        ? "Kun inviterede kan se og tilmelde sig"
                        : "Alle kan se og tilmelde sig"}
                    </small>
                  </span>
                </span>
                <span className="edit-chevron" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="edit-settings-row"
                onClick={() => setTransferModalOpen(true)}
              >
                <img src={organizerIcon} alt="" className="edit-settings-icon" />
                <span className="edit-settings-copy">
                  <strong>Overdrag rollen som arrangør</strong>
                  <span className="edit-settings-meta">
                    {transferRequestedTo ? (
                      <small>Anmodning sendt til {transferRequestedTo}</small>
                    ) : (
                      <>
                        <small>Send en anmodning til en deltager</small>
                        <small>Overdragelsen sker først når personen accepterer</small>
                      </>
                    )}
                  </span>
                </span>
                <span className="edit-chevron" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="edit-settings-row danger compact"
                onClick={() => setDeleteModalOpen(true)}
              >
                <img src={cancelIcon} alt="" className="edit-settings-icon" />
                <span className="edit-settings-copy">
                  <strong>Slet event</strong>
                  <span className="edit-settings-meta">
                    <small>Eventet vil blive fjernet</small>
                  </span>
                </span>
                <span className="edit-chevron" aria-hidden="true" />
              </button>
            </div>

            <div className="edit-event-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/mineevents")}
              >
                Annuller
              </button>
              <button type="submit" className="primary-btn">
                Bekræft ændringer
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {visibilityModalOpen && (
              <div className="edit-modal-backdrop" role="presentation">
                <div
                  className="edit-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="visibility-title"
                >
                  <h2 id="visibility-title">Vælg synlighed</h2>
                  <div className="visibility-choice-list">
                    <button
                      type="button"
                      className={!isPrivate ? "selected" : ""}
                      onClick={() => {
                        setIsPrivate(false);
                        setVisibilityModalOpen(false);
                      }}
                    >
                      <strong>Offentlig event</strong>
                      <small>Alle kan se og tilmelde sig</small>
                    </button>
                    <button
                      type="button"
                      className={isPrivate ? "selected" : ""}
                      onClick={() => {
                        setIsPrivate(true);
                        setVisibilityModalOpen(false);
                      }}
                    >
                      <strong>Privat event</strong>
                      <small>Kun inviterede kan se og tilmelde sig</small>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="edit-modal-cancel"
                    onClick={() => setVisibilityModalOpen(false)}
                  >
                    Annuller
                  </button>
                </div>
              </div>
            )}

            {transferModalOpen && (
              <div className="edit-modal-backdrop" role="presentation">
                <div
                  className="edit-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="transfer-title"
                >
                  <h2 id="transfer-title">Overdrag arrangørrollen</h2>
                  <p>
                    Vælg en deltager. Personen får en anmodning og bliver først
                    arrangør, når den accepteres.
                  </p>
                  <div className="transfer-list">
                    {transferOptions.map((person) => (
                      <button
                        type="button"
                        key={person.name}
                        onClick={() => {
                          setTransferRequestedTo(person.name);
                          setTransferModalOpen(false);
                        }}
                      >
                        <img src={person.image} alt="" />
                        <span>{person.name}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="edit-modal-cancel"
                    onClick={() => setTransferModalOpen(false)}
                  >
                    Annuller
                  </button>
                </div>
              </div>
            )}

            {deleteModalOpen && (
              <div className="edit-modal-backdrop" role="presentation">
                <div
                  className="edit-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-title"
                >
                  <h2 id="delete-title">Slet event?</h2>
                  <p>Er du sikker på, at du vil slette eventet?</p>
                  <div className="edit-modal-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Annuller
                    </button>
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={handleDeleteEvent}
                    >
                      Slet event
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
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
                <div className="create-field-group">
                  <span>Tags</span>
                  <div className="tag-choice-row">
                    {tagOptions.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={form.tags.includes(tag) ? "selected" : ""}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {form.tags.length > 0 && (
                    <div className="edit-tags-row selected-tags-row">
                      {form.tags.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <span aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="custom-tag-field">
                    <input
                      value={form.newTag}
                      onChange={(e) => updateForm("newTag", e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addCustomTag();
                        }
                      }}
                      placeholder="Tilføj eget tag..."
                    />
                    <button type="button" onClick={addCustomTag}>
                      Tilføj
                    </button>
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
