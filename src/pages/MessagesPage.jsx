import settingsIcon from "../assets/indstillinger.png";
import courtImg from "../assets/image 28.png";
import profileImg from "../assets/profilbillede.png";
import sofieImg from "../assets/sofieaarhus.png";

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Kasper Nielsen",
      preview: "Lyder godt! Ses der💪",
      time: "9:40",
      image: profileImg,
    },
    {
      id: 2,
      name: "Jonas Hansen",
      preview: "Det sørme grinern!",
      time: "8:23",
      image: courtImg,
    },
    {
      id: 3,
      name: "Sofie Madsen",
      preview: "Fedt, melder os til så",
      time: "I går",
      image: sofieImg,
    },
    {
      id: 4,
      name: "Padel - Gruppen",
      preview: "Nej herfra...",
      time: "I går",
      image: courtImg,
    },
    {
      id: 5,
      name: "Naja Gyldenløve",
      preview: "Måske vi skulle finde en anden dag?",
      time: "Lørdag",
      initials: "NG",
    },
  ];
  const filters = ["Alle", "Chats", "Grupper", "Anmodninger"];

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
            className={`message-filter${filter === "Alle" ? " active" : ""}`}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="messages-list">
        {conversations.map((conversation) => (
          <article key={conversation.id} className="message-card">
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
          </article>
        ))}
      </main>
    </div>
  );
}
