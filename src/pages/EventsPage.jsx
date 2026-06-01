import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function EventsPage() {
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

  return (
    <div className="events-page">
      <header className="page-header">
        <h1>Udforsk events</h1>
        <p>Se alle events og find den perfekte aktivitet for dig.</p>
      </header>

      <section className="events-list">
        {loading ? (
          <p>Henter events...</p>
        ) : events.length === 0 ? (
          <p>Ingen events fundet.</p>
        ) : (
          <div className="card-grid">
            {events.map((item) => (
              <article key={item.id} className="event-card">
                <div className="card-image">
                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1540575467063-178f50002caf?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="card-badge">{item.spots || "–"}</span>
                </div>
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p className="meta">
                    <span>📍 {item.location}</span>
                    <span>🗓 {item.date}</span>
                  </p>
                  {item.tag && <span className="tag">{item.tag}</span>}
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
