import { useNavigate } from "react-router";
import { useState } from "react";
import { useCreateEvent } from "../context/CreateEventContext";

export default function CreateEventStep3() {
  const navigate = useNavigate();
  const { data, update } = useCreateEvent();
  const [selectedLevel, setSelectedLevel] = useState(data.level || "Casual");
  const [tags, setTags] = useState(
    data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
  );
  const [tagInput, setTagInput] = useState("");

  const [editingParticipants, setEditingParticipants] = useState(false);
  const [localParticipants, setLocalParticipants] = useState(data.participants || 1);

  function addTag(v) {
    if (!v) return;
    const next = [...tags, v];
    setTags(next);
    update({ tags: next.join(",") });
    setTagInput("");
  }

  function removeTag(i) {
    const copy = [...tags];
    copy.splice(i, 1);
    setTags(copy);
    update({ tags: copy.join(",") });
  }

  function chooseLevel(l) {
    setSelectedLevel(l);
    update({ level: l });
  }

  return (
    <div className="create-event page">
      <div className="step-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="title-wrap">
          <h1>Detaljer om eventet</h1>
        </div>
      </div>
      <div className="progress">
        <div className="dot">1</div>
        <div className="dot">2</div>
        <div className="dot active">3</div>
        <div className="dot">4</div>
      </div>
      <main>
        <p style={{ color: "var(--text-primary)" }}>Fortæl lidt mere så andre ved hvad de kan forvente</p>

        <label>
          Navn på event
          <input type="text" placeholder="Giv dit event et navn..." value={data.name || ""} onChange={(e) => update({ name: e.target.value })} />
        </label>

        <div style={{ marginTop: 8 }}>
          <div style={{ color: "var(--text-primary)", marginBottom: 6 }}>Niveau / Stemning</div>
          <div className="level-row">
            <button className={"level-btn" + (selectedLevel === "Casual" ? " active" : "")} onClick={() => chooseLevel("Casual")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flex:'0 0 18px'}}>
                <path d="M8.45612 14.494C8.53667 14.4331 8.6287 14.3891 8.72668 14.3646C8.82466 14.3401 8.92658 14.3357 9.02631 14.3516C9.12605 14.3674 9.22155 14.4033 9.30709 14.457C9.39263 14.5107 9.46645 14.5811 9.52412 14.664C9.69332 14.8514 9.8855 15.0167 10.0961 15.156C10.6605 15.5293 11.3235 15.7256 12.0001 15.72C12.8551 15.72 13.4871 15.437 13.9041 15.158C14.1147 15.0187 14.3069 14.8534 14.4761 14.666L14.4971 14.64C14.6171 14.4812 14.7953 14.3767 14.9924 14.3493C15.1895 14.3219 15.3894 14.374 15.5481 14.494C15.7068 14.614 15.8114 14.7921 15.8388 14.9892C15.8662 15.1863 15.8141 15.3862 15.6941 15.545L15.6671 15.579L15.6151 15.642C15.5711 15.692 15.5101 15.761 15.4311 15.84C15.2184 16.0508 14.9857 16.2404 14.7361 16.406C13.9251 16.9428 12.9727 17.2262 12.0001 17.22C11.0275 17.2262 10.0751 16.9428 9.26411 16.406C9.01458 16.2404 8.7818 16.0508 8.56912 15.84C8.48541 15.7577 8.40661 15.6705 8.33312 15.579C8.07412 15.247 8.11012 14.754 8.45612 14.494Z" fill="currentColor" />
                <path d="M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1ZM2.5 12C2.5 14.5196 3.50089 16.9359 5.28249 18.7175C7.06408 20.4991 9.48044 21.5 12 21.5C14.5196 21.5 16.9359 20.4991 18.7175 18.7175C20.4991 16.9359 21.5 14.5196 21.5 12C21.5 9.48044 20.4991 7.06408 18.7175 5.28249C16.9359 3.50089 14.5196 2.5 12 2.5C9.48044 2.5 7.06408 3.50089 5.28249 5.28249C3.50089 7.06408 2.5 9.48044 2.5 12Z" fill="currentColor" />
                <path d="M9 10.75C9 11.0815 8.8683 11.3995 8.63388 11.6339C8.39946 11.8683 8.08152 12 7.75 12C7.41848 12 7.10054 11.8683 6.86612 11.6339C6.6317 11.3995 6.5 11.0815 6.5 10.75C6.5 10.4185 6.6317 10.1005 6.86612 9.86612C7.10054 9.6317 7.41848 9.5 7.75 9.5C8.08152 9.5 8.39946 9.6317 8.63388 9.86612C8.8683 10.1005 9 10.4185 9 10.75ZM16.25 12C16.5815 12 16.8995 11.8683 17.1339 11.6339C17.3683 11.3995 17.5 11.0815 17.5 10.75C17.5 10.4185 17.3683 10.1005 17.1339 9.86612C16.8995 9.6317 16.5815 9.5 16.25 9.5C15.9185 9.5 15.6005 9.6317 15.3661 9.86612C15.1317 10.1005 15 10.4185 15 10.75C15 11.0815 15.1317 11.3995 15.3661 11.6339C15.6005 11.8683 15.9185 12 16.25 12Z" fill="currentColor" />
              </svg>
              Casual
            </button>
            <button className={"level-btn" + (selectedLevel === "Motion" ? " active" : "")} onClick={() => chooseLevel("Motion")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flex:'0 0 18px'}}>
                <path d="M13.4999 5.5C14.5899 5.5 15.4999 4.58 15.4999 3.5C15.4999 2.96957 15.2892 2.46086 14.9141 2.08579C14.539 1.71071 14.0303 1.5 13.4999 1.5C12.3899 1.5 11.4999 2.38 11.4999 3.5C11.4999 4.58 12.3899 5.5 13.4999 5.5ZM9.88989 19.38L10.8899 15L12.9999 17V23H14.9999V15.5L12.8899 13.5L13.4999 10.5C14.1851 11.2851 15.0305 11.9145 15.9791 12.3457C16.9278 12.7769 17.9578 13 18.9999 13V11C17.0899 11 15.4999 10 14.6899 8.58L13.6899 7C13.2899 6.38 12.6899 6 11.9999 6C11.6899 6 11.4999 6.08 11.1899 6.08L5.99989 8.28V13H7.99989V9.58L9.78989 8.88L8.18989 17L3.28989 16L2.88989 18L9.88989 19.38Z" fill="currentColor" />
              </svg>
              Motion
            </button>
            <button className={"level-btn" + (selectedLevel === "Seriøst" ? " active" : "")} onClick={() => chooseLevel("Seriøst")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flex:'0 0 18px'}}>
                <path d="M7 21V19H11V15.9C10.1833 15.7167 9.45433 15.371 8.813 14.863C8.17167 14.355 7.70067 13.7173 7.4 12.95C6.15 12.8 5.10433 12.2543 4.263 11.313C3.42167 10.3717 3.00067 9.26733 3 8V7C3 6.45 3.196 5.97933 3.588 5.588C3.98 5.19667 4.45067 5.00067 5 5H7V3H17V5H19C19.55 5 20.021 5.196 20.413 5.588C20.805 5.98 21.0007 6.45067 21 7V8C21 9.26667 20.579 10.371 19.737 11.313C18.895 12.255 17.8493 12.8007 16.6 12.95C16.3 13.7167 15.8293 14.3543 15.188 14.863C14.5467 15.3717 13.8173 15.7173 13 15.9V19H17V21H7ZM7 10.8V7H5V8C5 8.63333 5.18333 9.20433 5.55 9.713C5.91667 10.2217 6.4 10.584 7 10.8ZM14.125 13.125C14.7083 12.5417 15 11.8333 15 11V5H9V11C9 11.8333 9.29167 12.5417 9.875 13.125C10.4583 13.7083 11.1667 14 12 14C12.8333 14 13.5417 13.7083 14.125 13.125ZM17 10.8C17.6 10.5833 18.0833 10.2207 18.45 9.712C18.8167 9.20333 19 8.63267 19 8V7H17V10.8Z" fill="currentColor" />
              </svg>
              Seriøst
            </button>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ color: "var(--text-primary)", marginBottom: 6 }}>Antal deltagere</div>
          <div className="participants-row" style={{ cursor: "pointer" }} onClick={() => setEditingParticipants(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flex:'0 0 18px'}}>
              <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z" fill="currentColor" />
              <path d="M2 20c0-2.5 3-4 6-4h8c3 0 6 1.5 6 4v1H2v-1z" fill="currentColor" />
            </svg>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{data.participants || 1} Deltagere</span>
            {editingParticipants && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={(e) => { e.stopPropagation(); setLocalParticipants((p) => Math.max(1, p - 1)); }} style={{ background: "transparent", border: "1px solid var(--border-soft)", color: "var(--text-primary)", padding: "6px 8px", borderRadius: 8 }}>-</button>
                <input type="number" value={localParticipants} onChange={(e) => setLocalParticipants(Number(e.target.value) || 0)} style={{ width: 56, padding: 6, borderRadius: 8, border: "1px solid var(--border-soft)", background: "var(--bg-card)", color: "var(--text-primary)" }} />
                <button onClick={(e) => { e.stopPropagation(); setLocalParticipants((p) => p + 1); }} style={{ background: "transparent", border: "1px solid var(--border-soft)", color: "var(--text-primary)", padding: "6px 8px", borderRadius: 8 }}>+</button>
                <button onClick={(e) => { e.stopPropagation(); update({ participants: localParticipants }); setEditingParticipants(false); }} className="primary-btn" style={{ padding: "8px 10px", borderRadius: 10 }}>Gem</button>
              </div>
            )}
          </div>
        </div>

        <label style={{ marginTop: 12 }}>
          Beskrivelse (Valgfri)
          <textarea placeholder="Skriv en kort beskrivelse" value={data.description || ""} onChange={(e) => { update({ description: e.target.value }); }}></textarea>
          <div style={{ textAlign: "right", color: "var(--text-primary)" }}>{(data.description || "").length}/200</div>
        </label>

        <div style={{ marginTop: 10 }}>
          <div style={{ color: "var(--text-primary)", marginBottom: 6 }}>Tags</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            {tags.map((t, i) => (
              <div className="chip" key={t}>{t}<button className="x" onClick={() => removeTag(i)} style={{ background: "transparent", border: "none", color: "var(--text-primary)" }}>✕</button></div>
            ))}
          </div>
          <input type="text" placeholder="Tilføj tag og tryk Enter" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput.trim()); } }} />
        </div>
      </main>
      <footer>
        <button className="primary-btn" onClick={() => navigate('/opret/step4')}>Næste</button>
      </footer>
    </div>
  );
}
