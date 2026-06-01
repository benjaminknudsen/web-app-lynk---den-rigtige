import { useNavigate } from "react-router";
import { useState } from "react";
import { useCreateEvent } from "../context/CreateEventContext";

function formatDateLabel(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("da-DK", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  } catch (e) { return iso; }
}

function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const days = [];
  const prevDays = startDay; // number of blanks
  const total = new Date(year, month+1, 0).getDate();
  for (let i=1;i<=total;i++) days.push(new Date(year, month, i));
  return { first, days, prevDays };
}

export default function CreateEventStep2() {
  const navigate = useNavigate();
  const { data, update } = useCreateEvent();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calMonth, setCalMonth] = useState(() => { const t=new Date(); return { y: t.getFullYear(), m: t.getMonth() }; });

  return (
    <div className="create-event page">
      <div className="step-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="title-wrap">
          <h1>Opret event</h1>
        </div>
      </div>
      <div className="progress">
        <div className="dot">1</div>
        <div className="dot active">2</div>
        <div className="dot">3</div>
        <div className="dot">4</div>
      </div>
      <main>
        <p>Vælg dato, tidspunkt og location.</p>
        <label>
          Dato
          <div
            className="row-field"
            onClick={() => setShowDatePicker((s) => !s)}
          >
            <span className="value">{formatDateLabel(data.date) || "Vælg dato"}</span>
            <span className="chev">›</span>
          </div>
          {showDatePicker && (
            <div className="overlay" role="dialog">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <button onClick={() => setCalMonth(({y,m})=>{ const mm = m-1; return {y: mm<0?y-1:y, m: mm<0?11:mm}; })}>{'<'}</button>
                <div style={{color:'var(--text-primary)', fontWeight:600}}>{new Date(calMonth.y,calMonth.m,1).toLocaleString('da-DK',{month:'long', year:'numeric'})}</div>
                <button onClick={() => setCalMonth(({y,m})=>{ const mm = m+1; return {y: mm>11?y+1:y, m: mm>11?0:mm}; })}>{'>'}</button>
              </div>
              <div className="calendar-grid">
                {['Søn','Man','Tir','Ons','Tor','Fre','Lør'].map((d)=>(<div key={d} style={{textAlign:'center',color:'var(--text-primary)',fontSize:12}}>{d}</div>))}
                {(() => {
                  const { y,m } = calMonth;
                  const g = monthGrid(y,m);
                  const blanks = g.prevDays;
                  const arr = [];
                  for (let i=0;i<blanks;i++) arr.push(<div key={'b'+i}></div>);
                  g.days.forEach(d => arr.push(d));
                  return arr.map((item, idx) => {
                    if (item instanceof Date) {
                      const iso = item.toISOString();
                      const isSelected = data.date && new Date(data.date).toDateString() === item.toDateString();
                      return (
                        <div key={iso} className={"calendar-day" + (isSelected? ' selected':'') } onClick={()=>{ update({ date: item.toISOString() }); setShowDatePicker(false); }}>
                          {item.getDate()}
                        </div>
                      );
                    }
                    return <div key={'blk'+idx}></div>;
                  })
                })()}
              </div>
            </div>
          )}
        </label>

        <label>
          Tidspunkt
          <div className="row-field time-field" style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="time" value={data.startTime || ''} onChange={(e)=>{ const s=e.target.value; update({ startTime: s, endTime: '', time: s }); }} style={{background:'transparent',border:'none',color:'var(--text-primary)'}} />
            <span className="chev">›</span>
          </div>
        </label>

        <label>
          Lokation
          <div className="row-field">
            <input
              type="text"
              placeholder="Indtast location"
              value={data.location}
              onChange={(e) => update({ location: e.target.value })}
              style={{ width: "100%", background: "transparent", border: "none", color: "var(--text-primary)" }}
            />
            <span className="chev">›</span>
          </div>
        </label>
        <div className="map-thumb" style={{ marginTop: 10 }}>
          <img
            src={
              data.location
                ? `https://source.unsplash.com/600x300/?${encodeURIComponent(
                    data.location
                  )}`
                : `https://images.unsplash.com/photo-1564501049414-7f6b3f9f9f2b?auto=format&fit=crop&w=800&q=60`
            }
            alt="map thumbnail"
          />
        </div>
      </main>
      <footer>
        <button className="primary-btn" onClick={() => navigate("/opret/step3")}>Næste</button>
      </footer>
    </div>
  );
}
