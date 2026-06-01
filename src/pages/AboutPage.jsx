export default function AboutPage() {
  return (
    <>
      <header>
        <h1>About</h1>
      </header>
      <main>
        <section className="community">
          <div className="section-header">
            <h2>
              Vores community <span className="spark">🔥</span>
            </h2>
          </div>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="stat-number">3.287</h3>
              <p>Aktive brugere i denne uge</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="stat-number">82</h3>
              <p>Aktiviteter oprettet i dag</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <h3 className="stat-number">4.9 / 5</h3>
              <p>Gennemsnitlig bedømmelse</p>
            </div>
          </div>

          <div className="testimonial">
            <div className="testimonial-header">
              <div className="avatar-img">
                <img
                  alt="Sofie"
                  src="https://images.unsplash.com/photo-1545996124-1b9c8b6a2f2d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
                />
              </div>
              <div className="testimonial-body">
                <div className="stars">★★★★★</div>
                <p className="quote">
                  “Jeg fandt hurtigt nogle at spille padel med og er nu 2
                  veninder rigere!”
                </p>
                <p className="author">Sofie, Aarhus</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
