import { NavLink } from "react-router";

export default function CreateEventCreated() {
  return (
    <div className="create-event created page">
      <header>
        <h1>Event oprettet! 🎉</h1>
      </header>
      <main>
        <p>Dit event er nu synligt for andre brugere.</p>
      </main>
      <footer>
        <NavLink to="/" className="primary-btn">Gå til dine events</NavLink>
      </footer>
    </div>
  );
}
