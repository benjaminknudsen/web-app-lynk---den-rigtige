import { useMemo, useState } from "react";
import settingsIcon from "../assets/indstillinger.png";
import courtImg from "../assets/image-28.png";
import sofieImg from "../assets/sofie-aarhus.png";
import kasperImg from "../assets/mike.png";
import jonasImg from "../assets/jon.png";
import najaImg from "../assets/loui.png";

const conversations = [
    {
      id: 1,
      name: "Kasper Nielsen",
      preview: "Lyder godt! Ses der💪",
      time: "9:40",
      image: kasperImg,
      type: "Chats",
      messages: [
        { from: "Kasper", text: "Er vi stadig på kl. 18?", mine: false },
        { from: "Benjamin", text: "Yes, jeg kommer direkte fra skole.", mine: true },
        { from: "Kasper", text: "Lyder godt! Ses der💪", mine: false },
      ],
    },
    {
      id: 2,
      name: "Jonas Hansen",
      preview: "Det sørme grinern!",
      time: "8:23",
      image: jonasImg,
      type: "Chats",
      messages: [
        { from: "Jonas", text: "Skal vi tage padel igen snart?", mine: false },
        { from: "Benjamin", text: "100%, det var grinern sidst.", mine: true },
        { from: "Jonas", text: "Det sørme grinern!", mine: false },
      ],
    },
    {
      id: 3,
      name: "Sofie Madsen",
      preview: "Fedt, melder os til så",
      time: "I går",
      image: sofieImg,
      type: "Chats",
      messages: [
        { from: "Sofie", text: "Er der stadig plads til to?", mine: false },
        { from: "Benjamin", text: "Ja, bare meld jer til.", mine: true },
        { from: "Sofie", text: "Fedt, melder os til så", mine: false },
      ],
    },
    {
      id: 4,
      name: "Padel - Gruppen",
      preview: "Nej herfra...",
      time: "I går",
      image: courtImg,
      type: "Grupper",
      messages: [
        { from: "Mads", text: "Kan folk torsdag?", mine: false },
        { from: "Benjamin", text: "Jeg kan efter 17.", mine: true },
        { from: "Sofie", text: "Nej herfra...", mine: false },
      ],
    },
    {
      id: 5,
      name: "Naja Gyldenløve",
      preview: "Måske vi skulle finde en anden dag?",
      time: "Lørdag",
      image: najaImg,
      type: "Anmodninger",
      messages: [
        { from: "Naja", text: "Kan jeg være med til fodbold?", mine: false },
        { from: "Benjamin", text: "Ja, hvis vi rykker tidspunktet lidt.", mine: true },
        { from: "Naja", text: "Måske vi skulle finde en anden dag?", mine: false },
      ],
    },
];

export default function MessagesPage() {
  const filters = ["Alle", "Chats", "Grupper", "Anmodninger"];
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [activeConversation, setActiveConversation] = useState(null);
  const filteredConversations = useMemo(
    () =>
      activeFilter === "Alle"
        ? conversations
        : conversations.filter((conversation) => conversation.type === activeFilter),
    [activeFilter, conversations]
  );

  if (activeConversation) {
    return (
      <div className="messages-page chat-page">
        <header className="chat-heading">
          <button
            type="button"
            className="chat-back-btn"
            onClick={() => setActiveConversation(null)}
            aria-label="Tilbage til beskeder"
          >
            <span aria-hidden="true" />
          </button>
          <div className="message-avatar" aria-hidden="true">
            {activeConversation.image ? (
              <img src={activeConversation.image} alt="" />
            ) : (
              <span>{activeConversation.initials}</span>
            )}
          </div>
          <div>
            <h1>{activeConversation.name}</h1>
            <p>{activeConversation.type === "Grupper" ? "Gruppechat" : "Aktiv nu"}</p>
          </div>
        </header>

        <main className="chat-thread">
          {activeConversation.messages.map((message, index) => (
            <div
              className={`chat-bubble${message.mine ? " mine" : ""}`}
              key={`${message.from}-${index}`}
            >
              {!message.mine && <span>{message.from}</span>}
              <p>{message.text}</p>
            </div>
          ))}
        </main>

        <form className="chat-compose">
          <input placeholder="Skriv en besked..." aria-label="Skriv en besked" />
          <button type="button">Send</button>
        </form>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <header className="messages-heading">
        <h1>Beskeder</h1>
        <button className="messages-settings" aria-label="Indstillinger">
          <img src={settingsIcon} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="message-filters" aria-label="Filtrer beskeder">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`message-filter${filter === activeFilter ? " active" : ""}`}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="messages-list">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            className="message-card"
            type="button"
            onClick={() => setActiveConversation(conversation)}
          >
            <div className="message-avatar" aria-hidden="true">
              {conversation.image ? (
                <img src={conversation.image} alt="" />
              ) : (
                <span>{conversation.initials}</span>
              )}
            </div>
            <div className="message-copy">
              <h2>{conversation.name}</h2>
              <p>{conversation.preview}</p>
            </div>
            <time>{conversation.time}</time>
          </button>
        ))}
      </main>
    </div>
  );
}
