import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    tag: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.location || !form.date || !form.tag) {
      setError("Udfyld alle felter før du gemmer.");
      return;
    }

    const { error } = await supabase.from("events").insert([
      {
        title: form.title,
        location: form.location,
        date: form.date,
        tag: form.tag,
      },
    ]);

    if (error) {
      setError(error.message);
      return;
    }

    setForm({ title: "", location: "", date: "", tag: "" });
    setSuccess("Event oprettet!");
    setTimeout(() => {
      navigate("/mineevents");
    }, 900);
  }

  return (
    <div className="events-page">
      <header className="page-header">
        <h1>Opret event</h1>
        <p>Udfyld formularen for at oprette et nyt event.</p>
      </header>

      <section className="events-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Titel
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Event titel"
              />
            </label>
          </div>
          <div>
            <label>
              Lokation
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Aarhus, København..."
              />
            </label>
          </div>
          <div>
            <label>
              Dato
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="Man 1 Jun · 18:30"
              />
            </label>
          </div>
          <div>
            <label>
              Tag
              <input
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="Fodbold, Løb, Padel..."
              />
            </label>
          </div>
          <div className="button-row">
            <button type="submit" className="primary-btn">
              Opret event
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </section>
    </div>
  );
}
