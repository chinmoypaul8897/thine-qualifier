import { useState } from "react";
import "./index.css";

const QUESTIONS = [
  {
    q: "What best describes you?",
    sub: "Be honest. Thine will know eventually.",
    opts: [
      { l: "Founder / Co-founder", s: 30 },
      { l: "Investor or Operator", s: 25 },
      { l: "Product or Growth Leader", s: 20 },
      { l: "Student / Still figuring it out", s: 7 },
    ],
  },
  {
    q: "How many meaningful conversations do you have in a day?",
    sub: "Calls, meetings, real conversations — not Slack messages.",
    opts: [
      { l: "1 – 3", s: 7 },
      { l: "4 – 7", s: 17 },
      { l: "8 – 12", s: 25 },
      { l: "More than 12", s: 30 },
    ],
  },
  {
    q: "When something important gets said, what happens to it?",
    sub: "The insight. The decision. The thing that mattered.",
    opts: [
      { l: "It disappears. Completely.", s: 30 },
      { l: "I try to write it down but context is lost", s: 24 },
      { l: "I remember some of it, sometimes", s: 13 },
      { l: "I have a system — I capture most things", s: 5 },
    ],
  },
  {
    q: "What's keeping you up right now?",
    sub: "Pick the one that's most true.",
    opts: [
      { l: "Making the right decisions, fast", s: 24 },
      { l: "Losing context across too many conversations", s: 30 },
      { l: "Building conviction on my next move", s: 22 },
      { l: "Managing too many people pulling in different directions", s: 19 },
    ],
  },
  {
    q: "How do you currently capture important thoughts?",
    sub: "Your honest system — not the ideal one.",
    opts: [
      { l: "I don't. They live in my head.", s: 30 },
      { l: "Notes app, sporadically", s: 20 },
      { l: "Voice memos when I remember", s: 13 },
      { l: "A structured system that actually works", s: 5 },
    ],
  },
  {
    q: "How do you make your most important decisions?",
    sub: "The ones that actually change things.",
    opts: [
      { l: "Pattern recognition — connecting dots across months", s: 30 },
      { l: "Gut feeling, usually right", s: 22 },
      { l: "Frameworks and structured thinking", s: 13 },
      { l: "Talking it through with people I trust", s: 16 },
    ],
  },
  {
    q: "Thine asks for 12 hours of daily use during early access. How does that land?",
    sub: "There is no right answer. Only an honest one.",
    opts: [
      { l: "That's literally just my day — I'm all in", s: 30 },
      { l: "I can do 5–8 hours, genuinely", s: 22 },
      { l: "Maybe 2–4 hours if I'm intentional", s: 11 },
      { l: "That sounds like a lot", s: 2 },
    ],
  },
];

const MAX_SCORE = 210;
const ADMIN_PASSWORD = "thine2026";

function getTier(score) {
  const p = Math.round((score / MAX_SCORE) * 100);
  if (p >= 72)
    return {
      label: "PRIORITY ACCESS",
      headline: "You're exactly who Thine is built for.",
      body: "You live in conversation. You think in patterns. You've been losing signal your entire career — and you know it. Expect a DM.",
      color: "#E87B4A",
    };
  if (p >= 48)
    return {
      label: "ON THE RADAR",
      headline: "You're in. We'll be in touch.",
      body: "You understand the problem. Thine will reach out when your profile fits the current cohort.",
      color: "#999",
    };
  return {
    label: "NOT YET",
    headline: "Thine isn't for where you are today.",
    body: "Thine is built for a specific inflection point — when the volume of life demands a different kind of intelligence. Come back when you're there.",
    color: "#555",
  };
}

const styles = {
  wrap: {
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100vw",
  overflowX: "hidden",
  background: "#0a0a0a",
  display: "flex",
  flexDirection: "column",
},
  header: {
    padding: "22px 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "40px",
  fontWeight: 400,
  color: "#f0ede6",
  letterSpacing: "-0.5px",
},
  progBar: { height: "2px", background: "#141414" },
  progFill: (pct) => ({
    height: "2px",
    background: "#E87B4A",
    width: `${pct}%`,
    transition: "width 0.4s ease",
  }),
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  inner: { maxWidth: "560px", width: "100%" },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: "#E87B4A",
    marginBottom: "20px",
  },
  h1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(38px, 6vw, 58px)",
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: "-1px",
    color: "#f0ede6",
    marginBottom: "16px",
  },
  sub: {
    fontSize: "15px",
    color: "#888",
    lineHeight: 1.7,
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#666",
    marginBottom: "8px",
  },
  input: {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #2a2a2a",
    color: "#f0ede6",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    padding: "10px 0",
    width: "100%",
    outline: "none",
    marginBottom: "24px",
  },
  btn: (disabled) => ({
    background: disabled ? "transparent" : "#E87B4A",
    color: disabled ? "#333" : "#fff",
    border: disabled ? "1px solid #222" : "none",
    borderRadius: "100px",
    padding: "14px 34px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: disabled ? "default" : "pointer",
    letterSpacing: "0.3px",
    marginTop: "8px",
    transition: "opacity 0.15s",
  }),
  qnum: {
    fontSize: "11px",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#666",
    marginBottom: "18px",
  },
  question: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(26px, 4.5vw, 38px)",
    fontWeight: 400,
    lineHeight: 1.22,
    letterSpacing: "-0.5px",
    color: "#f0ede6",
    marginBottom: "10px",
  },
  qsub: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "32px",
    lineHeight: 1.6,
  },
  opt: (selected) => ({
    border: selected ? "1px solid #E87B4A" : "1px solid #222",
    background: selected ? "rgba(232,123,74,0.07)" : "transparent",
    borderRadius: "8px",
    padding: "15px 20px",
    cursor: "pointer",
    marginBottom: "9px",
    fontSize: "15px",
    color: selected ? "#f0ede6" : "#ccc",
    transition: "all 0.15s",
    userSelect: "none",
  }),
  footer: {
    padding: "18px 36px",
    textAlign: "center",
    borderTop: "none",
  },
};

export default function App() {
  const [adminLoading, setAdminLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [screen, setScreen] = useState("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [submissions, setSubmissions] = useState([]);

  const pct = Math.round((score / MAX_SCORE) * 100);
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  async function saveToAirtable(submissionData) {
    try {
      await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_ID}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [{
            fields: {
              Name: submissionData.name,
              Email: submissionData.email,
              Score: submissionData.pct,
              Tier: submissionData.tier,
              Time: submissionData.time,
              Role: submissionData.answers[0],
              "Daily Conversations": submissionData.answers[1],
              "Signal Loss": submissionData.answers[2],
              "Current Challenge": submissionData.answers[3],
              "Capture System": submissionData.answers[4],
              "Decision Making": submissionData.answers[5],
              Commitment: submissionData.answers[6],
              Contacted: false,
            }
          }]
        }),
      });
    } catch (e) {
      console.error("Airtable save failed:", e);
    }
  }

  function handleOptClick(opt) {
    if (selected !== null) return;
    setSelected(opt.l);
    setTimeout(() => {
      const newScore = score + opt.s;
      if (step < QUESTIONS.length - 1) {
        setScore(newScore);
        setAnswers([...answers, opt.l]);
        setStep(step + 1);
        setSelected(null);
      } else {
        const newAnswers = [...answers, opt.l];
      const submission = {
        name,
        email,
        score: newScore,
        pct: Math.round((newScore / MAX_SCORE) * 100),
        tier: getTier(newScore).label,
        time: new Date().toLocaleDateString('en-IN') + ", " + new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'}),
        answers: newAnswers,
      };
      setScore(newScore);
      setAnswers(newAnswers);
      setSubmissions((prev) => [...prev, submission]);
      saveToAirtable(submission);
      setScreen("result");
      }
    }, 380);
  }

  async function fetchSubmissions() {
    setAdminLoading(true);
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_ID}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (!data.records) return;
      const records = data.records.map((r) => ({
        id: r.id,
        name: r.fields.Name,
        email: r.fields.Email,
        pct: r.fields.Score,
        tier: r.fields.Tier,
        time: r.fields.Time,
        score: Math.round((r.fields.Score / 100) * MAX_SCORE),
        contacted: r.fields.Contacted || false,
        answers: {
          Role: r.fields.Role || "-",
          "Daily Conversations": r.fields["Daily Conversations"] || "-",
          "Signal Loss": r.fields["Signal Loss"] || "-",
          "Current Challenge": r.fields["Current Challenge"] || "-",
          "Capture System": r.fields["Capture System"] || "-",
          "Decision Making": r.fields["Decision Making"] || "-",
          Commitment: r.fields.Commitment || "-",
        },
      }));
      setSubmissions(records);
    } catch (e) {
      console.error("Failed to fetch submissions:", e);
    } finally {
      setAdminLoading(false);
    }
  }
  async function updateContacted(recordId, currentStatus) {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === recordId ? { ...s, contacted: !currentStatus } : s
      )
    );
    try {
      await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_ID}/${recordId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Contacted: !currentStatus,
            },
          }),
        }
      );
    } catch (e) {
      console.error("Failed to update contacted status:", e);
    }
  }
  function toggleExpanded(id) {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleAdminKey(e) {
    if (e.key === "Enter") {
      if (adminInput === ADMIN_PASSWORD) {
        setAdminError(false);
        setAdminOpen(true);
        fetchSubmissions();
      } else {
        setAdminError(true);
      }
    }
  }

  function restart() {
    setScreen("intro");
    setName("");
    setEmail("");
    setStep(0);
    setScore(0);
    setSelected(null);
    setAnswers([]);
    setAdminInput("");
    setAdminOpen(false);
    setAdminError(false);
  }

  const tier = getTier(score);

  return (
    <div style={styles.wrap}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={{ color: "#E87B4A", marginRight: "6px" }}>ʑ</span>thine
        </div>
        {screen === "question" && (
          <span style={{ fontSize: "12px", color: "#444" }}>
            {step + 1} / {QUESTIONS.length}
          </span>
        )}
      </div>

      {/* PROGRESS */}
      {screen === "question" && (
        <div style={styles.progBar}>
          <div style={styles.progFill(progress)} />
        </div>
      )}

      {/* BODY */}
      <div style={{...styles.body, padding: screen === "question" ? "56px 24px" : screen === "result" ? "32px 24px" : "0px 24px"}}>
        <div style={styles.inner}>

          {/* INTRO */}
          {screen === "intro" && (
            <>
              <p style={styles.eyebrow}>Early Access</p>
              <h1 style={styles.h1}>
                Are you who<br />
                <em style={{ fontStyle: "italic" }}>Thine</em> is built for?
              </h1>
              <p style={styles.sub}>
                7 questions. Not to filter you out — to make sure early access goes to the right people.
              </p>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                placeholder="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                style={styles.btn(!name.trim() || !email.trim())}
                disabled={!name.trim() || !email.trim()}
                onClick={() => setScreen("question")}
              >
                Find out →
              </button>
            </>
          )}

          {/* QUESTION */}
          {screen === "question" && (
            <>
              <p style={styles.qnum}>Question {step + 1}</p>
              <h2 style={styles.question}>{QUESTIONS[step].q}</h2>
              <p style={styles.qsub}>{QUESTIONS[step].sub}</p>
              {QUESTIONS[step].opts.map((opt) => (
                <div
                  key={opt.l}
                  style={styles.opt(selected === opt.l)}
                  onClick={() => handleOptClick(opt)}
                >
                  {opt.l}
                </div>
              ))}
            </>
          )}

          {/* RESULT */}
          {screen === "result" && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                border: `2px solid ${tier.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px"
              }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: tier.color }} />
              </div>
              <p style={{ fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: tier.color, marginBottom: "16px" }}>
                {tier.label}
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px,5vw,40px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#f0ede6", marginBottom: "14px" }}>
                {tier.headline}
              </h2>
              <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 36px" }}>
                {tier.body}
              </p>
              <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "22px 28px", marginBottom: "28px" }}>
                <p style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>Signal score</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: 300, color: tier.color, lineHeight: 1 }}>
                  {pct}<span style={{ fontSize: "22px", color: "#333" }}>/100</span>
                </p>
                <p style={{ fontSize: "12px", color: "#444", marginTop: "10px" }}>{name} · {email}</p>
              </div>
              <p style={{ fontSize: "12px", color: "#444", marginBottom: "24px" }}>
                Share your result — the right people will know what it means.
              </p>
              <button style={styles.btn(false)} onClick={restart}>
                Start over
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER — ADMIN */}
      <div style={{ padding: "24px 36px", textAlign: "center", borderTop: "none" }}>
  {!adminOpen ? (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#111", border: "1px solid #1e1e1e", borderRadius: "100px", padding: "8px 18px" }}>
      <span style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#333" }}>Admin</span>
      <input
        type="password"
        placeholder="Only for admins"
        value={adminInput}
        onChange={(e) => { setAdminInput(e.target.value); setAdminError(false); }}
        onKeyDown={handleAdminKey}
        style={{ background: "transparent", border: "none", color: "#666", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", outline: "none", width: "120px" }}
      />
      {adminError && <span style={{ fontSize: "11px", color: "#E87B4A" }}>incorrect</span>}
    </div>
  ) : (
    <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
  <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#333", marginBottom: "24px" }}>
    Submissions · {submissions.length} total
  </p>
  {adminLoading ? (
    <p style={{ fontSize: "13px", color: "#444", letterSpacing: "1px" }}>Loading submissions...</p>
  ) : submissions.length === 0 ? (
    <p style={{ fontSize: "13px", color: "#333" }}>No submissions yet.</p>
  ) : (
    (() => {
      const grouped = {};
      submissions.forEach((s) => {
        const date = s.time ? s.time.split(",")[0] : "Unknown";
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(s);
      });
      const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
      return sortedDates.map((date) => {
        const daySubmissions = [...grouped[date]].sort((a, b) => b.pct - a.pct);
        return (
          <div key={date} style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#E87B4A" }}>{date}</p>
              <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
              <p style={{ fontSize: "11px", color: "#333" }}>{daySubmissions.length} submissions</p>
            </div>
            {daySubmissions.map((s, i) => {
  const t = getTier(s.score);
  const expanded = expandedRows[s.id] || false;
  return (
    <div key={i} style={{ borderBottom: "1px solid #111", opacity: s.contacted ? 0.35 : 1, transition: "opacity 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "13px 0", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ width: "100%" }}>
          <span style={{ color: "#c8c4bc", fontSize: "18px", fontWeight: 500, display: "block", marginBottom: "6px" }}>{s.name}</span>
<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <span style={{ color: "#666", fontSize: "12px" }}>{s.email}</span>
          <button
  onClick={() => {
    navigator.clipboard.writeText(s.email);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 1500);
  }}
  style={{ background: "transparent", border: "none", color: copiedId === s.id ? "#4caf50" : "#666", fontSize: "10px", cursor: "pointer", marginLeft: "8px", padding: "2px 6px", borderRadius: "4px", transition: "color 0.15s" }}
>
  {copiedId === s.id ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  )}
</button>
</div>
        </div>
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px", width: "100%", borderTop: "1px solid #111", paddingTop: "10px", marginTop: "4px" }}>
          <div>
            <span style={{ color: t.color, fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300 }}>{s.pct}</span>
            <span style={{ color: "#333", fontSize: "11px" }}>/100</span>
          </div>
          <p style={{ fontSize: "10px", color: t.color, letterSpacing: "1px" }}>{t.label}</p>
          <p style={{ fontSize: "10px", color: "#555" }}>{s.time ? s.time.split(",")[1] : ""}</p>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => toggleExpanded(s.id)}
              style={{
                background: expanded ? "#1a1a2e" : "transparent",
                border: expanded ? "1px solid #E87B4A" : "1px solid #333",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "10px",
                color: expanded ? "#E87B4A" : "#888",
                cursor: "pointer",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {expanded ? "Hide answers" : "View answers"}
            </button>
            <button
              onClick={() => updateContacted(s.id, s.contacted)}
              style={{
                background: s.contacted ? "#1a3a1a" : "transparent",
                border: s.contacted ? "1px solid #2d6a2d" : "1px solid #333",
                borderRadius: "100px",
                padding: "4px 12px",
                fontSize: "10px",
                color: s.contacted ? "#4caf50" : "#888",
                cursor: "pointer",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {s.contacted ? "Contacted" : "Mark contacted"}
            </button>
          </div>
        </div>
      </div>
      {expanded && (
        <div style={{ paddingBottom: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {Object.entries(s.answers).map(([key, val]) => (
            <span key={key} style={{ fontSize: "10px", color: "#888", background: "#111", border: "1px solid #1a1a1a", borderRadius: "4px", padding: "4px 10px" }}>
              <span style={{ color: "#444" }}>{key}: </span>{val}
            </span>
          ))}
        </div>
      )}
    </div>
  );
})}
          </div>
        );
      });
    })()
  )}
</div>
  )}
</div>
    </div>
  );
}