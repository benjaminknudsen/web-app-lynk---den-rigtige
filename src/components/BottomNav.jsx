import { NavLink } from "react-router";
import soccerIcon from "../assets/soccer.svg";
import eventIcon from "../assets/material-symbols_event-outline.png";
import addIcon from "../assets/formkit_add.png";
import messagesIcon from "../assets/tabler_messages.png";
import profileIcon from "../assets/iconamoon_profile.png";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primær navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <img src={soccerIcon} alt="" className="nav-icon" />
        <span>Udforsk</span>
      </NavLink>
      <NavLink
        to="/mineevents"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <img src={eventIcon} alt="" className="nav-icon" />
        <span>Mine events</span>
      </NavLink>
      <NavLink
        to="/opret"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <img src={addIcon} alt="" className="nav-icon" />
        <span>Opret</span>
      </NavLink>
      <NavLink
        to="/beskeder"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <img src={messagesIcon} alt="" className="nav-icon" />
        <span>Beskeder</span>
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
      >
        <img src={profileIcon} alt="" className="nav-icon" />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
