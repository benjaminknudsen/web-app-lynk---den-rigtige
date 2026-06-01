import { NavLink } from "react-router";
import soccerIcon from "../assets/soccer.svg";
import runIcon from "../assets/tabler_run.svg";
import padelIcon from "../assets/Vector.svg";
import basketIcon from "../assets/carbon_basketball.svg";
import heroImage from "../assets/image 28.png";
import sofieAarhus from "../assets/sofieaarhus.png";

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
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
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
  {
    title: "Basket i parken",
    location: "Aarhus",
    date: "Tor 29 Maj · 17:30",
    tag: "Basket",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
    spots: "6 / 12",
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
  {
    title: "Morgenløb",
    location: "Aarhus",
    date: "Søn 16 Jun · 08:00",
    tag: "Løb",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    spots: "8 / 15",
  },
];

const homeTagIcons = {
  Fodbold: soccerIcon,
  Løb: runIcon,
  Padel: padelIcon,
  Basket: basketIcon,
};

export default function HomePage() {
  return (
    <div className="home-page">
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
            <NavLink to="/events" className="primary-btn">
              Udforsk events
            </NavLink>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h2>Kategorier</h2>
            <NavLink to="/events" className="link-btn">
              Se alle
            </NavLink>
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
            <NavLink to="/events" className="link-btn">
              Se alle
            </NavLink>
          </div>
          <div className="card-grid">
            {eventsNearby.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="card-image">
                  <img src={event.image} alt="" loading="lazy" />
                  <span className="card-badge">
                    <span className="people-icon" aria-hidden="true" />
                    {event.spots}
                  </span>
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="meta">
                    <span>
                      <span
                        className="meta-icon location-icon"
                        aria-hidden="true"
                      />
                      {event.location}
                    </span>
                    <span>
                      <span
                        className="meta-icon time-icon"
                        aria-hidden="true"
                      />
                      {event.date}
                    </span>
                  </p>
                  <span className="tag">
                    {homeTagIcons[event.tag] && (
                      <img src={homeTagIcons[event.tag]} alt="" />
                    )}
                    {event.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block how-it-works">
          <h2>Sådan virker det</h2>
          <div className="steps">
            <div className="step">
              <div className="step-visual">
                <span className="step-number">1</span>
                <span className="step-symbol search-symbol" aria-hidden="true" />
              </div>
              <h3>Find</h3>
              <p>Udforsk aktiviteter der passer til dig</p>
            </div>
            <div className="step">
              <div className="step-visual">
                <span className="step-number">2</span>
                <span className="step-symbol group-symbol" aria-hidden="true" />
              </div>
              <h3>Join</h3>
              <p>Tilmeld dig og mød nye mennesker</p>
            </div>
            <div className="step">
              <div className="step-visual">
                <span className="step-number">3</span>
                <span className="step-symbol shoe-symbol" aria-hidden="true" />
              </div>
              <h3>Vær med</h3>
              <p>Deltag, hav det sjovt og bliv en del af fællesskabet</p>
            </div>
          </div>
        </section>

        <section className="section-block community">
          <div className="section-header">
            <h2>Vores community <span aria-hidden="true">🔥</span></h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <span className="community-icon community-users" aria-hidden="true" />
              <h3>3.287</h3>
              <p>Aktive brugere i denne uge</p>
            </div>
            <div className="stat-card">
              <span className="community-icon community-ball" aria-hidden="true" />
              <h3>82</h3>
              <p>Aktiviteter oprettet i dag</p>
            </div>
            <div className="stat-card">
              <span className="community-icon community-star" aria-hidden="true" />
              <h3>4.9 / 5</h3>
              <p>Gennemsnitlig bedømmelse</p>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-header">
              <div className="testimonial-avatar">
                <img src={sofieAarhus} alt="Sofie" />
              </div>
              <div className="testimonial-copy">
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
            <NavLink to="/events" className="link-btn">
              Se alle
            </NavLink>
          </div>
          <div className="card-grid">
            {popularNow.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="card-image">
                  <img src={event.image} alt="" loading="lazy" />
                  <span className="card-badge">
                    <span className="people-icon" aria-hidden="true" />
                    {event.spots}
                  </span>
                </div>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="meta">
                    <span>
                      <span
                        className="meta-icon location-icon"
                        aria-hidden="true"
                      />
                      {event.location}
                    </span>
                    <span>
                      <span
                        className="meta-icon time-icon"
                        aria-hidden="true"
                      />
                      {event.date}
                    </span>
                  </p>
                  <span className="tag">
                    {homeTagIcons[event.tag] && (
                      <img src={homeTagIcons[event.tag]} alt="" />
                    )}
                    {event.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
