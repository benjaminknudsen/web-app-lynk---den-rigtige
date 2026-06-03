import { useNavigate } from "react-router";
import LottieCanvas from "../components/LottieCanvas";
import confettiAnimation from "../assets/lottie/confetti.json";

export default function EventCreatedPage() {
  const navigate = useNavigate();

  return (
    <main className="event-created-page">
      <LottieCanvas
        animationData={confettiAnimation}
        className="event-created-confetti"
      />

      <section className="event-created-content">
        <h1>Event oprettet!</h1>
      </section>

      <button
        type="button"
        className="event-created-action"
        onClick={() => navigate("/mineevents")}
      >
        Gå til dine events
      </button>
    </main>
  );
}
