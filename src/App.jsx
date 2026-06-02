import { Route, Routes, useLocation } from "react-router";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import MineEventsPage from "./pages/MineEventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();
  const hideAppHeader =
    location.pathname === "/profil" ||
    /^\/events\/[^/]+$/.test(location.pathname) ||
    (location.pathname === "/opret" && location.search.includes("id="));

  return (
    <>
      {!hideAppHeader && <AppHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/mineevents" element={<MineEventsPage />} />
        <Route path="/opret" element={<CreateEventPage />} />
        <Route path="/beskeder" element={<MessagesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomNav />
    </>
  );
}
