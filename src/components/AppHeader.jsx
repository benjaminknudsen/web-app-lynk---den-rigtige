import { NavLink } from "react-router";
import logo from "../assets/frame125.svg";
import profileImg from "../assets/profilbillede.png";

export default function AppHeader() {
  return (
    <header className="app-header">
      <NavLink to="/" className="logo-wrap">
        <img src={logo} alt="Lynk" className="logo" />
      </NavLink>
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
        <NavLink to="/profil" className="avatar avatar-img">
          <img src={profileImg} alt="Profil" />
        </NavLink>
      </div>
    </header>
  );
}
