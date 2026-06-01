import { NavLink } from "react-router";
import logo from "../assets/frame125.svg";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";
import heroImage from "../assets/image 28.png";

const categories = [
  { name: "Fodbold", icon: soccerIcon },
  { name: "Løb", icon: runIcon },
  { name: "Padel", icon: padelIcon },
  { name: "Basket", icon: basketIcon },
];

const eventsNearby = [
  {
    title: "Løbetur - 10 km",
    location: "Aarhus",
    date: "Man 26 Maj · 18:30",
    tag: "Løb",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80",
    spots: "4 / 10",
  },
  {
    title: "Fodboldhygge",
    location: "Aarhus",
    date: "Lør 24 Maj · 13:00",
    tag: "Fodbold",
    image:
      "https://images.unsplash.com/photo-1508804185872-cd3ba9ca0f41?auto=format&fit=crop&w=600&q=80",
    spots: "5 / 22",
  },
  {
    title: "Padel for alle",
    location: "Aarhus",
    date: "Ons 28 Maj · 19:30",
    tag: "Padel",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
    spots: "3 / 14",
  },
];

const popularNow = [
  {
    title: "10k @ 5:00",
    location: "Aarhus",
    date: "Tir 13 Jun · 17:00",
    tag: "Løb",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
    spots: "7 / 10",
  },
  {
    title: "11v11 Aalborg",
    location: "Aalborg",
    date: "Tir 18 Jun · 19:00",
    tag: "Fodbold",
    image:
      "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=600&q=80",
    spots: "19 / 22",
  },
  {
    title: "Mangler 1",
    location: "Aarhus",
    date: "Fre 14 Jun · 18:30",
    tag: "Padel",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    spots: "3 / 4",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="logo-wrap">
          <img src={logo} alt="Lynk" className="logo" />
        </div>
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">
            🔎
          </span>
          <input
            type="search"
            placeholder="Søg efter events..."
            aria-label="Søg efter events"
          />
        </div>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifikationer">
            🔔
          </button>
          <NavLink to="/profil" className="avatar">
            BM
          </NavLink>
        </div>
      </header>

      <main className="home-main">
        <section
          className="hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-content">
            <p className="hero-eyebrow">Velkommen tilbage</p>
            <h1>Benjamin</h1>
            <p className="hero-subtitle">
              Se populære aktiviteter og events nær dig
            </p>
            <button className="primary-btn">Udforsk events</button>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h2>Kategorier</h2>
            <button className="link-btn">Se alle</button>
          </div>
          <div className="category-row">
            {categories.map((category) => (
              <button className="category-card" key={category.name}>
                <span className="category-icon" aria-hidden="true">
                  <img src={category.icon} alt="" />
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h2>Nærliggende events</h2>
            <button className="link-btn">Se alle</button>
          </div>
          <div className="card-grid">
            {eventsNearby.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="card-image">
                  <img src={event.image} alt="" loading="lazy" />
                  <span className="card-badge">{event.spots}</span>
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="meta">
                    <span>📍 {event.location}</span>
                    <span>🗓 {event.date}</span>
                  </p>
                  <span className="tag">{event.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block how-it-works">
          <h2>Sådan virker det</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Find</h3>
              <p>Udforsk aktiviteter der passer til dig.</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Join</h3>
              <p>Tilmeld dig og mød nye mennesker.</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Vær med</h3>
              <p>Deltag, bliv en del af fællesskabet.</p>
            </div>
          </div>
        </section>

        <section className="section-block community">
          <div className="section-header">
            <h2>Vores community ✨</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <h3>3.287</h3>
              <p>Aktive brugere</p>
            </div>
            <div className="stat-card">
              <h3>82</h3>
              <p>Aktiviteter oprettet i dag</p>
            </div>
            <div className="stat-card">
              <h3>4.9 / 5</h3>
              <p>Gennemsnitlig bedømmelse</p>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-header">
              <div className="avatar small">SV</div>
              <div>
                <p className="stars">★★★★★</p>
                <p className="quote">
                  “Jeg fandt hurtigt nogle at spille padel med og er nu 2 venner
                  rigere!”
                </p>
                <p className="author">Sofie, Aarhus</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h2>Populært lige nu</h2>
            <button className="link-btn">Se alle</button>
          </div>
          <div className="card-grid">
            {popularNow.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="card-image">
                  <img src={event.image} alt="" loading="lazy" />
                  <span className="card-badge">{event.spots}</span>
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="meta">
                    <span>📍 {event.location}</span>
                    <span>🗓 {event.date}</span>
                  </p>
                  <span className="tag">{event.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
