import { useNavigate } from "react-router";
import profileImg from "../assets/profilbillede.png";
import sofieAarhus from "../assets/sofie-aarhus.png";
import heroImage from "../assets/image-28.png";
import settingsIcon from "../assets/indstillinger.png";
import kasperImg from "../assets/mike.png";

const stats = [
  { value: "14", label: "Events deltaget" },
  { value: "6", label: "Oprettede events" },
  { value: "29", label: "Anmeldelser" },
];

const feedback = [
  {
    name: "Kasper",
    text: "Super god energi og fed kamp!",
    image: kasperImg,
  },
  {
    name: "Camilla",
    text: "Mega hyggelig og nem at snakke med.",
    image: sofieAarhus,
  },
  {
    name: "Sofie",
    text: "Kom til tiden og skabte god stemning.",
    image: heroImage,
  },
];

const trustBadges = ["Pålidelig", "God energi", "Fair play"];

const hostedRatings = [
  { label: "God arrangør", value: "4.9" },
  { label: "Mødte op til tiden", value: "28/29" },
  { label: "Vil spille med igen", value: "27/29" },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <main className="profile-page">
      <header className="profile-topbar" aria-label="Profil navigation">
        <button
          type="button"
          className="profile-back-btn"
          onClick={() => navigate(-1)}
        >
          <span className="back-chevron" aria-hidden="true" />
          Back
        </button>
        <h1>Profil</h1>
        <button
          type="button"
          className="profile-settings-btn"
          aria-label="Indstillinger"
        >
          <img src={settingsIcon} alt="" aria-hidden="true" />
        </button>
      </header>

      <section className="profile-intro" aria-label="Profiloplysninger">
        <img src={profileImg} alt="Benjamin Vivedal" className="profile-photo" />
        <div className="profile-person">
          <h2>Benjamin Vivedal</h2>
          <p>Aarhus, DK</p>
          <p>Medlem siden maj 2026</p>
        </div>
      </section>

      <section className="profile-stats" aria-label="Profilstatistik">
        {stats.map((item) => (
          <div className="profile-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="profile-trust" aria-label="Anmeldelser og rating">
        <div className="profile-rating-card">
          <div>
            <span className="profile-rating-label">Fællesskabsrating</span>
            <div className="profile-rating-score">
              <strong>4.8</strong>
              <span>/ 5</span>
            </div>
            <div className="profile-stars" aria-label="4.8 ud af 5 stjerner">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
          <p>29 anmeldelser fra events</p>
        </div>

        <div className="profile-badges" aria-label="Top badges">
          {trustBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        <div className="hosted-ratings">
          <h2>Rating af afholdte events</h2>
          {hostedRatings.map((item) => (
            <div className="hosted-rating-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-feedback" aria-label="Feedback fra andre">
        <div className="profile-section-title">
          <h2>Feedback fra andre</h2>
          <button type="button">Se alle</button>
        </div>

        <div className="feedback-carousel">
          {feedback.map((item) => (
            <article className="feedback-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
