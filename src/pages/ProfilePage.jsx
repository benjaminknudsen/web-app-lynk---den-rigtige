export default function ProfilePage() {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Profil</h1>
        <p>Styr dine oplysninger og aktiviteter.</p>
      </header>

      <section className="profile-card">
        <div className="profile-avatar">BM</div>
        <div>
          <h2>Benjamin</h2>
          <p className="profile-meta">Aarhus - Medlem siden 2024</p>
        </div>
      </section>

      <section className="profile-section">
        <h3>Mine favoritkategorier</h3>
        <div className="profile-tags">
          <span>Fodbold</span>
          <span>Padel</span>
          <span>Loeb</span>
        </div>
      </section>

      <section className="profile-section">
        <h3>Kommende aktiviteter</h3>
        <div className="profile-list">
          <div>
            <p className="profile-title">Padel torsdag</p>
            <p className="profile-meta">Tor 6 Jun - 18:30</p>
          </div>
          <div>
            <p className="profile-title">Fodboldhygge</p>
            <p className="profile-meta">Soen 9 Jun - 11:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}
