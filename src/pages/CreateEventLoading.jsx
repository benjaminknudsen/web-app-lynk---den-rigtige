import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateEvent } from "../context/CreateEventContext";

export default function CreateEventLoading() {
  const navigate = useNavigate();
  const { reset } = useCreateEvent();

  useEffect(() => {
    const t = setTimeout(() => {
      // simulate create
      reset();
      navigate("/opret/created");
    }, 1100);
    return () => clearTimeout(t);
  }, [navigate, reset]);

  return (
    <div className="create-event loading page">
      <header>
        <h1>Opretter event…</h1>
      </header>
      <main>
        <div className="loader">🏃‍♂️</div>
        <p>Vi opretter dit event. Vent et øjeblik…</p>
      </main>
    </div>
  );
}
