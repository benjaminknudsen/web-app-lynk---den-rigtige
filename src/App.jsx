import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import MineEventsPage from "./pages/MineEventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EventCreatedPage from "./pages/EventCreatedPage";
import EventJoinedPage from "./pages/EventJoinedPage";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";

const LOADING_DURATION = 1900;

export default function App() {
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const loadingTimeout = useRef(null);
  const hideAppHeader =
    location.pathname === "/profil" ||
    location.pathname === "/event-oprettet" ||
    /^\/event-tilmeldt\/[^/]+$/.test(location.pathname) ||
    /^\/events\/[^/]+$/.test(location.pathname) ||
    (location.pathname === "/opret" && location.search.includes("id="));

  const showLoading = useCallback((duration = LOADING_DURATION) => {
    if (loadingTimeout.current) {
      window.clearTimeout(loadingTimeout.current);
    }

    void Promise.resolve().then(() => setShowLoadingScreen(true));
    loadingTimeout.current = window.setTimeout(() => {
      setShowLoadingScreen(false);
      loadingTimeout.current = null;
    }, duration);
  }, []);

  useEffect(() => {
    const shouldShowRouteLoading =
      ["/events", "/mineevents"].includes(location.pathname) ||
      (location.pathname === "/opret" && !location.search.includes("id="));

    if (!shouldShowRouteLoading) {
      return undefined;
    }

    showLoading();
    return undefined;
  }, [location.key, location.pathname, location.search, showLoading]);

  useEffect(() => {
    function handleLoadingEvent(event) {
      showLoading(event.detail?.duration);
    }

    window.addEventListener("lynk:show-loading", handleLoadingEvent);

    return () => {
      window.removeEventListener("lynk:show-loading", handleLoadingEvent);
      if (loadingTimeout.current) {
        window.clearTimeout(loadingTimeout.current);
      }
    };
  }, [showLoading]);

  return (
    <>
      {showLoadingScreen && <LoadingScreen />}
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
        <Route path="/event-oprettet" element={<EventCreatedPage />} />
        <Route path="/event-tilmeldt/:eventId" element={<EventJoinedPage />} />
        <Route path="/beskeder" element={<MessagesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BottomNav />
    </>
  );
}
