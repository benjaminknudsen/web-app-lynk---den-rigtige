import { useNavigate } from "react-router";
import { useCreateEvent } from "../context/CreateEventContext";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";
import cyclingIcon from "../assets/sportsgren.svg";
import fitnessIcon from "../assets/maki_fitness-centre.svg";
import badmintonIcon from "../assets/badminton.svg";
import yogaIcon from "../assets/yoga.svg";
import otherIcon from "../assets/tabler_dots.svg";

export default function CreateEventStep1() {
  const navigate = useNavigate();
  const { data, update } = useCreateEvent();

  function choose(activity) {
    update({ activity });
  }

  return (
    <div className="create-event page">
      <div className="step-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="title-wrap">
          <h1>Opret event</h1>
        </div>
      </div>
      <div className="progress">
        <div className="dot active">1</div>
        <div className="dot">2</div>
        <div className="dot">3</div>
        <div className="dot">4</div>
      </div>
      <main>
        <p>Hvad skal event handle om? Vælg en aktivitet.</p>
        <div className="choices">
          {[
            { name: "Fodbold", icon: soccerIcon },
            { name: "Padel", icon: padelIcon },
            { name: "Løb", icon: runIcon },
            { name: "Basket", icon: basketIcon },
            { name: "Fitness", icon: fitnessIcon },
            { name: "Cykling", icon: cyclingIcon },
            { name: "Badminton", icon: badmintonIcon },
            { name: "Yoga", icon: yogaIcon },
            { name: "Andet", icon: otherIcon },
          ].map((act) => (
            <button
              key={act.name}
              onClick={() => choose(act.name)}
              type="button"
              className={data.activity === act.name ? "active" : ""}
            >
              <span className="choice-icon">
                <img src={act.icon} alt="" />
              </span>
              <span className="choice-label">{act.name}</span>
            </button>
          ))}
        </div>
      </main>
      <footer>
        <button
          className="primary-btn"
          onClick={() => navigate("/opret/step2")}
        >
          Næste
        </button>
      </footer>
    </div>
  );
}
