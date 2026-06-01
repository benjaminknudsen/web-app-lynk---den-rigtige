import { createContext, useContext, useState } from "react";

const CreateEventContext = createContext(null);

export function CreateEventProvider({ children }) {
  const [data, setData] = useState({
    activity: "",
    date: "",
    time: "",
    startTime: "",
    endTime: "",
    participants: 22,
    location: "",
    name: "",
    description: "",
    tags: "",
  });

  function update(updates) {
    setData((d) => ({ ...d, ...updates }));
  }

  function reset() {
    setData({
      activity: "",
      date: "",
      time: "",
      startTime: "",
      endTime: "",
      participants: 22,
      location: "",
      name: "",
      description: "",
      tags: "",
    });
  }

  return (
    <CreateEventContext.Provider value={{ data, update, reset }}>
      {children}
    </CreateEventContext.Provider>
  );
}

export function useCreateEvent() {
  const ctx = useContext(CreateEventContext);
  if (!ctx) throw new Error("useCreateEvent must be used within CreateEventProvider");
  return ctx;
}
