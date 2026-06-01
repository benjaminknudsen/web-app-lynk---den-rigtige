import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MineEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    tag: "",
  });
  const [editId, setEditId] = useState(null);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.title || !form.location || !form.date || !form.tag) {
      setError("Udfyld alle felter før du gemmer.");
      return;
    }

    if (editId) {
      const { error } = await supabase
        .from("events")
        .update({
          title: form.title,
          location: form.location,
          date: form.date,
          tag: form.tag,
        })
        .eq("id", editId);

      if (error) {
        setError(error.message);
      } else {
        resetForm();
        fetchEvents();
      }
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
    } else {
      resetForm();
      fetchEvents();
    }
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
    setForm({
      title: item.title,
      location: item.location,
      date: item.date,
      tag: item.tag,
    });
    setEditId(item.id);
    setError("");
  }

  function resetForm() {
    setForm({ title: "", location: "", date: "", tag: "" });
    setEditId(null);
    setError("");
  }

  return (
    <div className="events-page">
      <header className="page-header">
        <h1>Mine events</h1>
        <p>Her kan du se og administrere dine events i Supabase.</p>
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
              {editId ? "Opdater event" : "Opret event"}
            </button>
            {editId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Annuller
              </button>
            )}
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>

      <section className="events-list">
        <div className="section-header">
          <h2>Mine events</h2>
          <button type="button" onClick={fetchEvents} className="link-btn">
            Opdater liste
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>Ingen events fundet. Opret en ny event.</p>
        ) : (
          <div className="event-grid">
            {events.map((item) => (
              <article key={item.id} className="event-card">
                <div className="event-content">
                  <h3>{item.title}</h3>
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                  <p className="tag">{item.tag}</p>
                </div>
                <div className="event-actions">
                  <button type="button" onClick={() => handleEdit(item)}>
                    Rediger
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    Slet
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
