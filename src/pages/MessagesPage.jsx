export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      from: "Sofie",
      text: "Hej! Skal du med til padel på lørdag?",
      time: "11:42",
    },
    {
      id: 2,
      from: "Mads",
      text: "Jeg har reserveret banen, hvis du vil være med.",
      time: "09:15",
    },
  ];

  return (
    <div className="messages-page">
      <header className="page-header">
        <h1>Beskeder</h1>
        <p>Her er dine seneste samtaler.</p>
      </header>

      <main className="messages-list">
        {messages.map((message) => (
          <article key={message.id} className="message-card">
            <div className="message-meta">
              <strong>{message.from}</strong>
              <span>{message.time}</span>
            </div>
            <p>{message.text}</p>
          </article>
        ))}
      </main>
    </div>
  );
}
