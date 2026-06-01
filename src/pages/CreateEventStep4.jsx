import { useNavigate } from "react-router";
import { useCreateEvent } from "../context/CreateEventContext";

export default function CreateEventStep4() {
  const navigate = useNavigate();
  const { data } = useCreateEvent();

  return (
    <div className="create-event page">
      <div className="step-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="title-wrap">
          <h1>Opret event</h1>
        </div>
      </div>
      <div className="progress">
        <div className="dot">1</div>
        <div className="dot">2</div>
        <div className="dot">3</div>
        <div className="dot active">4</div>
      </div>
      <main>
          <p>Gennemse og opret — tjek at alt ser rigtigt ud.</p>
          <div className="event-banner" style={{ marginTop: 12, marginBottom: 12 }}>
            <img
              src={
                data.location
                  ? `https://source.unsplash.com/1200x400/?${encodeURIComponent(
                      data.location
                    )}`
                  : `https://images.unsplash.com/photo-1509537251200-7b59c4b8f7a5?auto=format&fit=crop&w=1200&q=60`
              }
              alt="event banner"
            />
          </div>
        <div className="review">
          <p>
            <strong>Navn:</strong> {data.name || "(ikke angivet)"}
          </p>
          <p>
            <strong>Dato:</strong> {data.date || "(ikke angivet)"}
          </p>
          <p>
            <strong>Tid:</strong> {data.time || "(ikke angivet)"}
          </p>
          <p>
            <strong>Lokation:</strong> {data.location || "(ikke angivet)"}
          </p>
          <p>
            <strong>Tags:</strong> {data.tags || "-"}
          </p>
          <p>
            <strong>Antal deltagere:</strong> {data.participants || "-"}
          </p>
        </div>
      </main>
      <footer>
        <button className="primary-btn" onClick={() => navigate("/opret/loading")}>Opret event</button>
      </footer>
    </div>
  );
}
