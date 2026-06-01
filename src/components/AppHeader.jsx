import { NavLink } from "react-router";
import logo from "../assets/frame125.svg";
import bellIcon from "../assets/klokke.png";
import profileImg from "../assets/profilbillede.png";
import searchIcon from "../assets/søgefelt.png";

export default function AppHeader() {
  return (
    <header className="app-header">
      <NavLink to="/" className="logo-wrap">
        <img src={logo} alt="Lynk" className="logo" />
      </NavLink>
      <div className="search-wrap">
        <img src={searchIcon} alt="" className="search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Søg efter events..."
          aria-label="Søg efter events"
        />
      </div>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifikationer">
          <img src={bellIcon} alt="" className="header-icon" aria-hidden="true" />
        </button>
        <NavLink to="/profil" className="avatar avatar-img">
          <img src={profileImg} alt="Profil" />
        </NavLink>
      </div>
    </header>
  );
}
