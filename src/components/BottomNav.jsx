import { NavLink } from "react-router";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primær navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span>🏠</span>
        <span>Udforsk</span>
      </NavLink>
      <NavLink
        to="/mineevents"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span>🗓</span>
        <span>Mine events</span>
      </NavLink>
      <NavLink
        to="/opret"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span>＋</span>
        <span>Opret</span>
      </NavLink>
      <NavLink
        to="/beskeder"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span>💬</span>
        <span>Beskeder</span>
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <span>👤</span>
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
