import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";

export default function MineEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  async function handleDelete(id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      fetchEvents();
    }
  }

  function handleEdit(item) {
    navigate(`/opret?id=${item.id ?? item.ID ?? ""}`);
  }

  return (
    <div className="events-page">
      <header className="page-header">
        <h1>Mine events</h1>
        <p>Her kan du se og administrere dine events i Supabase.</p>
      </header>

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
          <p>Ingen events fundet. Opret et nyt event på siden Opret.</p>
        ) : (
          <div className="event-grid">
            {events.map((item) => (
              <article key={item.id ?? item.ID} className="event-card">
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
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id ?? item.ID)}
                  >
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
