import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "../lib/supabaseClient";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    tag: "",
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

    setForm({
      title: data.title || "",
      location: data.location || "",
      date: data.date || "",
      tag: data.tag || "",
    });
    setEditMode(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      if (eventId) {
        loadEvent(eventId);
      } else {
        setEditMode(false);
        setForm({ title: "", location: "", date: "", tag: "" });
      }
    });
  }, [eventId, loadEvent]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.location || !form.date || !form.tag) {
      setError("Udfyld alle felter før du gemmer.");
      return;
    }

    if (editMode && eventId) {
      let res = await supabase
        .from("events")
        .update({
          title: form.title,
          location: form.location,
          date: form.date,
          tag: form.tag,
        })
        .eq("id", eventId);

      if ((res.error && !res.data) || (res.data && res.data.length === 0)) {
        res = await supabase
          .from("events")
          .update({
            title: form.title,
            location: form.location,
            date: form.date,
            tag: form.tag,
          })
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
        <h1>{editMode ? "Opdater event" : "Opret event"}</h1>
        <p>
          {editMode
            ? "Rediger dit event og gem ændringer."
            : "Udfyld formularen for at oprette et nyt event."}
        </p>
      </header>

      <section className="events-form">
        {loading ? (
          <p>Loading event...</p>
        ) : (
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
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
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
                {editMode ? "Opdater event" : "Opret event"}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        )}
      </section>
    </div>
  );
}
