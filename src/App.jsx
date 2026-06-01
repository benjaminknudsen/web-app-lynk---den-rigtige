import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateEventStep1 from "./pages/CreateEventStep1";
import CreateEventStep2 from "./pages/CreateEventStep2";
import CreateEventStep3 from "./pages/CreateEventStep3";
import CreateEventStep4 from "./pages/CreateEventStep4";
import CreateEventLoading from "./pages/CreateEventLoading";
import CreateEventCreated from "./pages/CreateEventCreated";
import { CreateEventProvider } from "./context/CreateEventContext";

export default function App() {
  return (
    <>
      <Navbar />
      <CreateEventProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/opret" element={<CreateEventStep1 />} />
        <Route path="/opret/step2" element={<CreateEventStep2 />} />
        <Route path="/opret/step3" element={<CreateEventStep3 />} />
        <Route path="/opret/step4" element={<CreateEventStep4 />} />
        <Route path="/opret/loading" element={<CreateEventLoading />} />
        <Route path="/opret/created" element={<CreateEventCreated />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CreateEventProvider>
    </>
  );
}
