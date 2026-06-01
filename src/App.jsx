import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EventsPage from "./pages/EventsPage";
import MineEventsPage from "./pages/MineEventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/mineevents" element={<MineEventsPage />} />
        <Route path="/opret" element={<CreateEventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
