import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────── VIDEO SOURCES (30-60s property walkthrough clips) ─────────── */
const PROPERTIES = [
  {
    id: 1, title: "Glass Tower Penthouse", locality: "HITEC City", price: "₹2.2 Cr",
    rawPrice: 22000000, bhk: 4, sqft: 3800, type: "Penthouse", status: "Ready to Move",
    builder: "Prestige Group", rera: "P02400001234", phone: "+91 98765 43210",
    tag: "LUXURY", tagColor: "#a855f7",
    amenities: ["Private Pool", "Sky Lounge", "EV Charging", "Concierge"],
    highlight: "Panoramic city views • 40th floor sky villa • Premium fittings",
    // Using free Pexels/sample MP4 videos that are property-like
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=90",
    verified: true, commission: true,
  },
  {
    id: 2, title: "Serene 3BHK Villa", locality: "Gachibowli", price: "₹85 L",
    rawPrice: 8500000, bhk: 3, sqft: 2100, type: "Villa", status: "Ready to Move",
    builder: "Aparna Constructions", rera: "P02400003456", phone: "+91 87654 32109",
    tag: "HOT DEAL", tagColor: "#ef4444",
    amenities: ["Pool", "Gym", "Club House", "24/7 Security"],
    highlight: "Corner villa • Durgam Cheruvu views • Gated community",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90",
    verified: true, commission: true,
  },
  {
    id: 3, title: "Smart 2BHK Flat", locality: "Miyapur", price: "₹48 L",
    rawPrice: 4800000, bhk: 2, sqft: 1150, type: "Apartment", status: "Under Construction",
    builder: "Vasavi Developers", rera: "P02400002345", phone: "+91 76543 21098",
    tag: "NEW LAUNCH", tagColor: "#10b981",
    amenities: ["Metro Access", "Gym", "Kids Zone", "Power Backup"],
    highlight: "5 min to Miyapur Metro • Possession Dec 2025 • RERA approved",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=90",
    verified: true, commission: true,
  },
  {
    id: 4, title: "Hillview Studio", locality: "Madhapur", price: "₹32 L",
    rawPrice: 3200000, bhk: 1, sqft: 650, type: "Studio", status: "Ready to Move",
    builder: "Cybercity Builders", rera: "P02400005678", phone: "+91 65432 10987",
    tag: "BEST BUY", tagColor: "#f59e0b",
    amenities: ["Co-working", "Rooftop Garden", "Gym"],
    highlight: "Perfect for IT pros • 10 min from HITEC offices • Fully furnished option",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=90",
    verified: true, commission: false,
  },
  {
    id: 5, title: "Township 3BHK", locality: "Bachupally", price: "₹68 L",
    rawPrice: 6800000, bhk: 3, sqft: 1680, type: "Apartment", status: "Ready to Move",
    builder: "My Home Group", rera: "P02400007890", phone: "+91 54321 09876",
    tag: "VERIFIED", tagColor: "#06b6d4",
    amenities: ["Tennis Court", "Pool", "School Nearby", "Hospital 2km"],
    highlight: "Gated township • 200+ families • Lush green campus",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    poster: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=90",
    verified: true, commission: true,
  },
  {
    id: 6, title: "Prime Office Space", locality: "HITEC City", price: "₹1.8 Cr",
    rawPrice: 18000000, bhk: 0, sqft: 3000, type: "Commercial", status: "Available",
    builder: "Phoenix Group", rera: "C02400001111", phone: "+91 43210 98765",
    tag: "PRIME SPOT", tagColor: "#f97316",
    amenities: ["24/7 Access", "Power Backup", "High-Speed Lift", "Parking x10"],
    highlight: "IT corridor • Grade-A building • Ideal for MNCs & startups",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    poster: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=90",
    verified: true, commission: true,
  },
  {
    id: 7, title: "DTCP Plot 200sqyd", locality: "Kompally", price: "₹55 L",
    rawPrice: 5500000, bhk: 0, sqft: 1800, type: "Plot", status: "Available",
    builder: "Green Valley Realty", rera: "N/A", phone: "+91 32109 87654",
    tag: "DTCP OK", tagColor: "#3b82f6",
    amenities: ["Gated Layout", "Water Supply", "Underground Drainage", "Wide Roads"],
    highlight: "North-facing corner plot • Immediate registration • Clear title",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    poster: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=90",
    verified: true, commission: false,
  },
];

/* ─────────── AI ─────────── */
async function askClaude(messages, system) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
    });
    const d = await res.json();
    return d.content?.[0]?.text || "Couldn't get a response.";
  } catch { return "Network error. Please try again."; }
}

/* ─────────── PROGRESS BAR ─────────── */
function VideoProgress({ videoRef, color = "#fff" }) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tick = () => { if (v.duration) setProg(v.currentTime / v.duration); };
    v.addEventListener("timeupdate", tick);
    return () => v.removeEventListener("timeupdate", tick);
  }, [videoRef]);
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${prog * 100}%`, background: color, borderRadius: 2, transition: "none" }} />
    </div>
  );
}

/* ─────────── AI PANEL ─────────── */
function AIPanel({ property, onClose }) {
  const [mode, setMode] = useState("menu");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [emi, setEmi] = useState({ loan: Math.round(property.rawPrice * 0.8), rate: 8.5, years: 20 });
  const [emiResult, setEmiResult] = useState(null);
  const bottomRef = useRef();

  const sys = `You are HydPropertyHub AI — Hyderabad real estate expert. Property: ${property.title}, ${property.locality}, ${property.price}, ${property.bhk > 0 ? property.bhk + " BHK" : property.type}, ${property.sqft} sqft, ${property.status}, Builder: ${property.builder}, RERA: ${property.rera}. Be concise, max 3 sentences.`;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const um = { role: "user", content: input };
    const hist = [...messages, um];
    setMessages(hist); setInput(""); setLoading(true);
    const r = await askClaude(hist, sys);
    setMessages(h => [...h, { role: "assistant", content: r }]);
    setLoading(false);
  };

  const aiScore = async () => {
    setMode("score"); setLoading(true);
    const r = await askClaude([{ role: "user", content: `Rate this Hyderabad property investment 1-10 with 3 pros and 2 cons. ${property.title}, ${property.locality}, ${property.price}, ${property.sqft} sqft, ${property.status}. JSON only: {"score":8,"pros":["...","...","..."],"cons":["...","..."]}` }], "Hyderabad RE analyst. JSON only, no markdown, no backticks.");
    setLoading(false);
    try { setScore(JSON.parse(r.replace(/```[a-z]*/gi,"").trim())); }
    catch { setScore({ score: 7, pros: ["Good location", "Reputed builder", "RERA approved"], cons: ["Market dependent", "Verify surroundings"] }); }
  };

  const quickAsk = async (q) => {
    setMode("chat"); setLoading(true);
    const r = await askClaude([{ role: "user", content: q }], sys);
    setMessages([{ role: "assistant", content: r }]); setLoading(false);
  };

  const calcEMI = () => {
    const p = emi.loan, r = emi.rate / 12 / 100, n = emi.years * 12;
    const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult({ emi: Math.round(e), total: Math.round(e * n), interest: Math.round(e * n - p) });
  };

  return (
    <div onClick={e => e.stopPropagation()} style={{ position: "absolute", inset: 0, background: "rgba(4,4,14,0.97)", backdropFilter: "blur(20px)", zIndex: 50, display: "flex", flexDirection: "column", borderRadius: "inherit" }}>
      <div style={{ padding: "16px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {mode !== "menu" && <button onClick={() => { setMode("menu"); setScore(null); setEmiResult(null); setMessages([]); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer", padding: 0 }}>‹</button>}
          <span style={{ fontSize: 11, fontWeight: 800, color: "#f59e0b", letterSpacing: 2 }}>✨ AI ASSISTANT</span>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: 30, height: 30, fontSize: 16, cursor: "pointer" }}>×</button>
      </div>

      {mode === "menu" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 2 }}>
            About <span style={{ color: "#fff", fontWeight: 700 }}>{property.title}</span>
          </div>
          {[
            ["💬", "Chat with AI", "Ask anything about this property", "#a5f3fc", () => setMode("chat")],
            ["📊", "Investment Score", "AI rates this deal /10", "#86efac", aiScore],
            ["🧮", "EMI Calculator", "Monthly payment breakdown", "#fde68a", () => setMode("emi")],
            ["🏘", "Neighbourhood Intel", "Schools, hospitals, connectivity", "#c4b5fd", () => quickAsk(`Give neighbourhood intel for ${property.locality}, Hyderabad: connectivity, schools, hospitals, price trend. Short 4 bullet points.`)],
            ["⚖️", "Is This Price Fair?", "Market rate analysis", "#fca5a5", () => quickAsk(`Is ${property.price} fair for a ${property.bhk > 0 ? property.bhk + " BHK" : property.type} of ${property.sqft} sqft in ${property.locality}, Hyderabad? What's the current market rate per sqft and negotiation tip?`)],
          ].map(([icon, label, sub, color, fn]) => (
            <button key={label} onClick={fn} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "13px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ color, fontWeight: 700, fontSize: 14 }}>{label}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 1 }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === "chat" && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.length === 0 && !loading && <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, textAlign: "center", marginTop: 30 }}>Ask me anything 👇</div>}
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", background: m.role === "user" ? "#f59e0b" : "rgba(255,255,255,0.08)", color: m.role === "user" ? "#1a1a2e" : "#fff", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, lineHeight: 1.55, fontWeight: m.role === "user" ? 700 : 400 }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", animation: `dot 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "10px 14px 18px", display: "flex", gap: 8, flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about this property..." style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "10px 16px", color: "#fff", fontSize: 13, outline: "none" }} />
            <button onClick={send} disabled={loading} style={{ background: "#f59e0b", border: "none", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer", flexShrink: 0, opacity: loading ? 0.5 : 1 }}>↑</button>
          </div>
        </>
      )}

      {mode === "score" && (
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {loading
            ? <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.35)" }}><div style={{ fontSize: 36, marginBottom: 12 }}>🤖</div>Analyzing investment...</div>
            : score && (
              <>
                <div style={{ textAlign: "center", margin: "10px 0 24px" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, letterSpacing: 1 }}>AI INVESTMENT SCORE</div>
                  <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: score.score >= 7 ? "#10b981" : score.score >= 5 ? "#f59e0b" : "#ef4444" }}>{score.score}</div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>/10</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 12 }}>
                    {[...Array(10)].map((_, i) => <div key={i} style={{ width: 20, height: 8, borderRadius: 4, background: i < score.score ? (score.score >= 7 ? "#10b981" : "#f59e0b") : "rgba(255,255,255,0.07)" }} />)}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: "#86efac", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>✅ PROS</div>
                  {score.pros?.map((p, i) => <div key={i} style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 10, padding: "9px 12px", fontSize: 13, color: "#d1fae5", marginBottom: 7 }}>• {p}</div>)}
                </div>
                <div>
                  <div style={{ color: "#fca5a5", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>⚠️ WATCH OUT</div>
                  {score.cons?.map((c, i) => <div key={i} style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 10, padding: "9px 12px", fontSize: 13, color: "#fee2e2", marginBottom: 7 }}>• {c}</div>)}
                </div>
              </>
            )
          }
        </div>
      )}

      {mode === "emi" && (
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 16 }}>Based on {property.price}</div>
          {[["Loan Amount (₹)", "loan"], ["Interest Rate (%)", "rate"], ["Tenure (Years)", "years"]].map(([l, k]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <label style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{l}</label>
              <input type="number" value={emi[k]} onChange={e => setEmi(f => ({ ...f, [k]: +e.target.value }))}
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "11px 14px", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <button onClick={calcEMI} style={{ width: "100%", background: "#f59e0b", border: "none", borderRadius: 12, padding: 14, fontWeight: 900, fontSize: 15, color: "#1a1a2e", cursor: "pointer", marginBottom: 16 }}>Calculate EMI</button>
          {emiResult && (
            <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)", borderRadius: 14, padding: 16 }}>
              {[["Monthly EMI", `₹${emiResult.emi.toLocaleString("en-IN")}`, "#f59e0b"], ["Total Payment", `₹${emiResult.total.toLocaleString("en-IN")}`, "#fff"], ["Total Interest", `₹${emiResult.interest.toLocaleString("en-IN")}`, "#fca5a5"]].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{l}</span>
                  <span style={{ color: c, fontWeight: 800, fontSize: 15 }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <style>{`@keyframes dot{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

/* ─────────── SINGLE REEL ─────────── */
function Reel({ property, isActive, onLike, onSkip }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // Tinder horizontal drag state
  const dragStart = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyDir, setFlyDir] = useState(null); // "left" | "right"
  const dragCurrent = useRef(0);

  // Play/pause based on visibility
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive && !paused) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive, paused]);

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  // ── Horizontal drag (Tinder) ──
  const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;
  const getClientY = (e) => e.touches ? e.touches[0].clientY : e.clientY;

  const onDragStart = (e) => {
    if (showAI || showContact || showDetails) return;
    if (e.target.closest("button") || e.target.closest("a")) return;
    dragStart.current = { x: getClientX(e), y: getClientY(e) };
    setIsDragging(false);
  };

  const onDragMove = (e) => {
    if (!dragStart.current) return;
    const dx = getClientX(e) - dragStart.current.x;
    const dy = getClientY(e) - dragStart.current.y;
    // Only activate horizontal drag if clearly horizontal (not vertical scroll)
    if (!isDragging && Math.abs(dx) < 12) return;
    if (!isDragging && Math.abs(dy) > Math.abs(dx)) { dragStart.current = null; return; }
    setIsDragging(true);
    dragCurrent.current = dx;
    setDragX(dx);
  };

  const onDragEnd = () => {
    if (!isDragging) { dragStart.current = null; return; }
    const dx = dragCurrent.current;
    setIsDragging(false);
    dragStart.current = null;
    if (Math.abs(dx) > 90) {
      const dir = dx > 0 ? "right" : "left";
      setFlyDir(dir);
      setDragX(dx > 0 ? 600 : -600);
      setTimeout(() => {
        if (dir === "right") onLike(property);
        else onSkip(property);
        setFlyDir(null);
        setDragX(0);
      }, 380);
    } else {
      setDragX(0);
    }
  };

  const rotate = dragX * 0.06;
  const likeOpacity = Math.min(1, Math.max(0, dragX / 70));
  const skipOpacity = Math.min(1, Math.max(0, -dragX / 70));

  return (
    <div
      ref={cardRef}
      style={{
        width: "100%", height: "100%", position: "relative", overflow: "hidden", flexShrink: 0,
        transform: `translateX(${dragX}px) rotate(${rotate}deg)`,
        transition: isDragging ? "none" : flyDir ? "transform 0.38s cubic-bezier(0.5,0,1,0.5)" : "transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
      onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={property.video}
        poster={property.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
      />

      {/* Dark gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />

      {/* LIKE stamp */}
      <div style={{ position: "absolute", top: "18%", left: 20, border: "4px solid #10b981", borderRadius: 12, padding: "6px 20px", transform: "rotate(-12deg)", opacity: likeOpacity, pointerEvents: "none", zIndex: 30 }}>
        <span style={{ color: "#10b981", fontSize: 26, fontWeight: 900, letterSpacing: 2 }}>INTERESTED ♥</span>
      </div>
      {/* SKIP stamp */}
      <div style={{ position: "absolute", top: "18%", right: 20, border: "4px solid #ef4444", borderRadius: 12, padding: "6px 20px", transform: "rotate(12deg)", opacity: skipOpacity, pointerEvents: "none", zIndex: 30 }}>
        <span style={{ color: "#ef4444", fontSize: 26, fontWeight: 900, letterSpacing: 2 }}>SKIP ✕</span>
      </div>

      {/* Top area – progress + controls */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 14px 0", zIndex: 10 }}>
        <VideoProgress videoRef={videoRef} color="#f59e0b" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>Hyd<span style={{ color: "#f59e0b" }}>Property</span></span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: property.tagColor, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>{property.tag}</div>
            {property.verified && <div style={{ background: "rgba(16,185,129,0.85)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>✓</div>}
            <button onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }} style={{ background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", borderRadius: "50%", width: 32, height: 32, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>

      {/* Center tap to pause */}
      <div onClick={togglePause} style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {paused && <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>▶️</div>}
      </div>

      {/* Right side action buttons */}
      <div style={{ position: "absolute", right: 12, bottom: 200, display: "flex", flexDirection: "column", gap: 18, alignItems: "center", zIndex: 10 }}>
        {[
          { icon: "✨", label: "AI", gold: true, fn: (e) => { e.stopPropagation(); setShowAI(true); } },
          { icon: "📋", label: "Details", fn: (e) => { e.stopPropagation(); setShowDetails(true); } },
          { icon: "📤", label: "Share", fn: (e) => { e.stopPropagation(); if (navigator.share) navigator.share({ title: property.title, text: property.price }); } },
        ].map(b => (
          <button key={b.label} onClick={b.fn} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: b.gold ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: b.gold ? "1px solid rgba(245,158,11,0.5)" : "1px solid rgba(255,255,255,0.15)" }}>{b.icon}</div>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{b.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 18px", zIndex: 10 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>📍 {property.locality}, Hyderabad</div>
        <div style={{ fontSize: 21, fontWeight: 900, color: "#fff", marginBottom: 2, lineHeight: 1.2 }}>{property.title}</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b", marginBottom: 6 }}>{property.price}</div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
          {property.bhk > 0 && <span style={P}>{property.bhk} BHK</span>}
          <span style={P}>{property.sqft} sqft</span>
          <span style={P}>{property.type}</span>
          <span style={{ ...P, background: property.status === "Ready to Move" ? "rgba(16,185,129,0.28)" : "rgba(245,158,11,0.28)" }}>{property.status}</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 13, marginBottom: 14, lineHeight: 1.45 }}>{property.highlight}</div>

        {/* Swipe hint row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, whiteSpace: "nowrap" }}>← skip &nbsp;|&nbsp; interested →</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Contact button */}
        <button onClick={(e) => { e.stopPropagation(); setShowContact(true); }}
          style={{ width: "100%", background: "#f59e0b", border: "none", color: "#1a1a2e", borderRadius: 14, padding: "13px 0", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
          📞 Contact — {property.builder}
        </button>
      </div>

      {/* ── DETAILS SHEET ── */}
      {showDetails && (
        <div onClick={() => setShowDetails(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 40, overflowY: "auto" }}>
          <div onClick={e => e.stopPropagation()} style={{ padding: "20px 18px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>📍 {property.locality}</div>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 19, margin: "3px 0" }}>{property.title}</div>
                <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 22 }}>{property.price}</div>
              </div>
              <button onClick={() => setShowDetails(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: 32, height: 32, fontSize: 17, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
              {[["🏠 Type", property.type], ["📐 Sqft", property.sqft], property.bhk > 0 ? ["🛏 BHK", property.bhk + " BHK"] : ["📋 Size", property.sqft + " sqft"], ["🏗 Status", property.status], ["🏢 Builder", property.builder], ["📋 RERA", property.rera]].map(([l, v]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 12px" }}>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{l}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>AMENITIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {property.amenities.map(a => <span key={a} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 12, padding: "5px 12px", borderRadius: 20 }}>✓ {a}</span>)}
              </div>
            </div>
            {property.commission && <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: 12, color: "#fde68a", fontSize: 13, marginBottom: 16 }}>💰 Commission available for agents</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowDetails(false); setShowAI(true); }} style={{ flex: 1, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>✨ Ask AI</button>
              <button onClick={() => { setShowDetails(false); setShowContact(true); }} style={{ flex: 1.4, background: "#f59e0b", border: "none", color: "#1a1a2e", borderRadius: 14, padding: "12px", fontWeight: 900, fontSize: 14, cursor: "pointer" }}>📞 Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT SHEET ── */}
      {showContact && (
        <div onClick={() => setShowContact(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0d0d14", borderRadius: "22px 22px 0 0", padding: "22px 20px 38px" }}>
            <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "0 auto 18px" }} />
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 16, marginBottom: 2 }}>{property.title}</div>
            <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 19, marginBottom: 20 }}>{property.price} · {property.locality}</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, letterSpacing: 1.5, marginBottom: 22 }}>{property.phone}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`tel:${property.phone}`} style={{ background: "#fff", color: "#1a1a2e", textDecoration: "none", borderRadius: 14, padding: "14px", textAlign: "center", fontWeight: 900, fontSize: 15, display: "block" }}>📞 Call Now</a>
              <a href={`https://wa.me/${property.phone.replace(/\D/g,"")}?text=Hi! I saw your property "${property.title}" at ${property.price} on HydPropertyHub and I'm interested.`} target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 14, padding: "14px", textAlign: "center", fontWeight: 900, fontSize: 15, display: "block" }}>💬 WhatsApp</a>
              <button onClick={() => setShowContact(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.35)", borderRadius: 14, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── AI PANEL ── */}
      {showAI && <AIPanel property={property} onClose={() => setShowAI(false)} />}
    </div>
  );
}

const P = { background: "rgba(255,255,255,0.13)", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,0.14)" };

/* ─────────── MAIN APP ─────────── */
export default function App() {
  const [tab, setTab] = useState("feed");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [toast, setToast] = useState(null); // {msg, color}

  // Vertical scroll state
  const feedRef = useRef(null);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);
  const isScrolling = useRef(false);
  const [transitioning, setTransitioning] = useState(false);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 1800);
  };

  const goNext = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIdx(i => Math.min(i + 1, PROPERTIES.length - 1));
    setTimeout(() => setTransitioning(false), 350);
  }, [transitioning]);

  const goPrev = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIdx(i => Math.max(i - 1, 0));
    setTimeout(() => setTransitioning(false), 350);
  }, [transitioning]);

  const handleLike = (prop) => {
    setLiked(l => l.find(x => x.id === prop.id) ? l : [prop, ...l]);
    showToast("♥ Interested!", "#10b981");
    setTimeout(goNext, 100);
  };

  const handleSkip = (prop) => {
    setSkipped(s => s.find(x => x.id === prop.id) ? s : [prop, ...s]);
    showToast("✕ Skipped", "#ef4444");
    setTimeout(goNext, 100);
  };

  // Keyboard nav
  useEffect(() => {
    const h = (e) => {
      if (tab !== "feed") return;
      if (e.key === "ArrowDown") goNext();
      if (e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [tab, goNext, goPrev]);

  // Touch vertical scroll (YouTube Shorts style)
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isScrolling.current = false;
  };
  const onTouchMove = (e) => {
    if (!touchStartY.current) return;
    const dy = touchStartY.current - e.touches[0].clientY;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    // If clearly horizontal drag (Tinder), don't intercept for scroll
    if (dx > 20) { isScrolling.current = false; return; }
    if (Math.abs(dy) > 15) isScrolling.current = true;
  };
  const onTouchEnd = (e) => {
    if (!touchStartY.current || !isScrolling.current) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) {
      if (dy > 0) goNext(); else goPrev();
    }
    touchStartY.current = null;
    isScrolling.current = false;
  };

  // Search
  const [searchQ, setSearchQ] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const filtered = PROPERTIES.filter(p => !searchQ ? true : [p.title, p.locality, p.type].some(s => s.toLowerCase().includes(searchQ.toLowerCase())));
  const aiSearch = async () => {
    if (!searchQ.trim()) return;
    setAiLoading(true);
    const r = await askClaude([{ role: "user", content: `User searching: "${searchQ}" in Hyderabad real estate. In 2-3 sentences, suggest best area/type/BHK and why.` }], "You are HydPropertyHub AI. Give smart, concise Hyderabad RE advice.");
    setAiAnswer(r); setAiLoading(false);
  };

  // Post
  const [postForm, setPostForm] = useState({ name: "", phone: "", title: "", area: "Gachibowli", price: "", type: "Apartment", desc: "" });
  const [postDone, setPostDone] = useState(false);

  return (
    <div style={{ height: "100dvh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: 430, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative" }}>

      {/* ── FEED ── */}
      {tab === "feed" && (
        <div
          ref={feedRef}
          style={{ flex: 1, position: "relative", overflow: "hidden" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={e => { if (e.deltaY > 30) goNext(); else if (e.deltaY < -30) goPrev(); }}
        >
          {/* Render only current + adjacent for perf */}
          {PROPERTIES.map((prop, i) => {
            const offset = i - currentIdx;
            if (Math.abs(offset) > 1) return null;
            return (
              <div key={prop.id} style={{
                position: "absolute", inset: 0,
                transform: `translateY(${offset * 100}%)`,
                transition: transitioning ? "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
                zIndex: i === currentIdx ? 2 : 1,
              }}>
                <Reel
                  property={prop}
                  isActive={i === currentIdx && tab === "feed"}
                  onLike={handleLike}
                  onSkip={handleSkip}
                />
              </div>
            );
          })}

          {/* Scroll indicator dots */}
          <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 5, zIndex: 20, pointerEvents: "none" }}>
            {PROPERTIES.map((_, i) => (
              <div key={i} style={{ width: 3, height: i === currentIdx ? 20 : 7, borderRadius: 2, background: i === currentIdx ? "#f59e0b" : "rgba(255,255,255,0.25)", transition: "all .3s" }} />
            ))}
          </div>

          {/* Up/Down scroll hints at edges */}
          {currentIdx > 0 && (
            <div onClick={goPrev} style={{ position: "absolute", top: 64, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 11, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", zIndex: 20, userSelect: "none" }}>
              <div style={{ animation: "arrowUp 1.5s infinite" }}>↑</div>
            </div>
          )}
          {currentIdx < PROPERTIES.length - 1 && (
            <div onClick={goNext} style={{ position: "absolute", bottom: 84, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 11, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", zIndex: 20, userSelect: "none" }}>
              <div style={{ animation: "arrowDown 1.5s infinite" }}>↓</div>
            </div>
          )}
        </div>
      )}

      {/* ── SEARCH ── */}
      {tab === "search" && (
        <div style={{ flex: 1, overflowY: "auto", background: "#060610", padding: "18px 16px 100px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 4 }}>Find Property</h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 16 }}>AI-powered search ✨</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} onKeyDown={e => e.key === "Enter" && aiSearch()}
              placeholder="2BHK under ₹50L near metro..." style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "13px 16px", color: "#fff", fontSize: 14, outline: "none" }} />
            <button onClick={aiSearch} style={{ background: "#f59e0b", border: "none", borderRadius: 12, padding: "0 16px", color: "#1a1a2e", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>✨ AI</button>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 14 }}>
            {["3 BHK", "Under ₹50L", "Ready to Move", "HITEC City", "Villa", "New Launch"].map(q => (
              <button key={q} onClick={() => setSearchQ(q)} style={{ flexShrink: 0, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{q}</button>
            ))}
          </div>
          {aiLoading && <div style={{ color: "#f59e0b", fontSize: 13, padding: "12px 0", textAlign: "center" }}>🤖 Thinking...</div>}
          {aiAnswer && (
            <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#f59e0b", fontWeight: 800, marginBottom: 6, letterSpacing: 1.5 }}>✨ AI RECOMMENDATION</div>
              <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.6 }}>{aiAnswer}</div>
            </div>
          )}
          {filtered.map(p => (
            <div key={p.id} onClick={() => { setCurrentIdx(PROPERTIES.findIndex(x => x.id === p.id)); setTab("feed"); }}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", cursor: "pointer", display: "flex", marginBottom: 10 }}>
              <img src={p.poster} alt="" style={{ width: 90, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "12px 14px", flex: 1 }}>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>📍 {p.locality}</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "2px 0 4px" }}>{p.title}</div>
                <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 15, marginBottom: 6 }}>{p.price}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {p.bhk > 0 && <span style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontSize: 10, padding: "2px 7px", borderRadius: 8 }}>{p.bhk} BHK</span>}
                  <span style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontSize: 10, padding: "2px 7px", borderRadius: 8 }}>{p.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LIKED ── */}
      {tab === "liked" && (
        <div style={{ flex: 1, overflowY: "auto", background: "#060610", padding: "18px 16px 100px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 4 }}>Interested <span style={{ color: "#f59e0b" }}>({liked.length})</span></h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 16 }}>Properties you swiped right ♥</p>
          {liked.length === 0
            ? <div style={{ textAlign: "center", padding: "70px 0", color: "rgba(255,255,255,0.2)" }}><div style={{ fontSize: 40, marginBottom: 10 }}>♥</div>Swipe right to save properties</div>
            : liked.map(p => (
              <div key={p.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, overflow: "hidden", display: "flex", marginBottom: 10 }}>
                <img src={p.poster} alt="" style={{ width: 90, objectFit: "cover" }} />
                <div style={{ padding: "12px 14px", flex: 1 }}>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>📍 {p.locality}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "2px 0 4px" }}>{p.title}</div>
                  <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 15, marginBottom: 8 }}>{p.price}</div>
                  <a href={`https://wa.me/${p.phone.replace(/\D/g,"")}?text=Hi! I'm interested in ${p.title} at ${p.price} on HydPropertyHub`} target="_blank" rel="noreferrer"
                    style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 700, display: "inline-block" }}>💬 WhatsApp</a>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* ── POST ── */}
      {tab === "post" && (
        <div style={{ flex: 1, overflowY: "auto", background: "#060610", padding: "18px 16px 100px" }}>
          {postDone ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
              <div style={{ color: "#10b981", fontWeight: 900, fontSize: 22, marginBottom: 8 }}>Submitted!</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Our team will verify and call you within 24 hours.</div>
              <button onClick={() => setPostDone(false)} style={{ marginTop: 20, background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: 12, padding: "11px 24px", cursor: "pointer", fontWeight: 700 }}>Post Another</button>
            </div>
          ) : (
            <>
              <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 4 }}>Post Property</h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 16 }}>Free listing · Your property shown as a Shorts reel 🎬</p>
              <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 12, padding: 12, marginBottom: 18, fontSize: 13, color: "#fde68a" }}>
                💰 Earn commission on every successful deal generated through HydPropertyHub
              </div>
              {[["Your Name","name","text","Ravi Kumar"],["Phone","phone","tel","+91 XXXXX XXXXX"],["Property Title","title","text","3BHK Villa Gachibowli"],["Price (₹)","price","number","8500000"]].map(([l,k,t,ph]) => (
                <div key={k} style={{ marginBottom: 13 }}>
                  <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{l}</label>
                  <input type={t} placeholder={ph} value={postForm[k]||""} onChange={e => setPostForm(f=>({...f,[k]:e.target.value}))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 13 }}>
                {[["Type","type",["Apartment","Villa","Plot","Penthouse","Commercial"]],["Area","area",["Gachibowli","HITEC City","Miyapur","Jubilee Hills","Bachupally","Madhapur","Kompally"]]].map(([l,k,opts]) => (
                  <div key={k}>
                    <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{l}</label>
                    <select value={postForm[k]} onChange={e => setPostForm(f=>({...f,[k]:e.target.value}))}
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "11px 14px", color: "#fff", fontSize: 13, outline: "none" }}>
                      {opts.map(o => <option key={o} style={{background:"#111"}}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 13 }}>
                <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>Key Highlights</label>
                <textarea placeholder="Pool view, corner flat, near metro..." value={postForm.desc||""} onChange={e => setPostForm(f=>({...f,desc:e.target.value}))} rows={3}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }} />
              </div>
              {/* Video upload UI */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "2px dashed rgba(255,255,255,0.1)", borderRadius: 14, padding: "22px", textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>🎬</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Upload Property Video</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 12 }}>30–60 second walkthrough · MP4 · Max 100MB</div>
                <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "10px 20px", display: "inline-block", color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>Choose Video File</div>
              </div>
              <button onClick={() => setPostDone(true)} style={{ width: "100%", background: "#f59e0b", border: "none", color: "#1a1a2e", borderRadius: 14, padding: "15px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>Submit Property →</button>
            </>
          )}
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: toast.color, color: "#fff", borderRadius: 20, padding: "12px 28px", fontWeight: 900, fontSize: 20, zIndex: 200, pointerEvents: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", animation: "toastPop 0.3s ease" }}>
          {toast.msg}
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div style={{ background: "rgba(4,4,12,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-around", padding: "10px 0 20px", flexShrink: 0, zIndex: 100 }}>
        {[
          { icon: "▶", label: "Shorts", key: "feed" },
          { icon: "🔍", label: "Search", key: "search" },
          { icon: "➕", label: "Post", key: "post", special: true },
          { icon: "♥", label: liked.length ? `Saved (${liked.length})` : "Saved", key: "liked" },
        ].map(n => (
          <button key={n.key} onClick={() => setTab(n.key)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
            {n.special
              ? <div style={{ width: 44, height: 44, background: "#f59e0b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginTop: -14, boxShadow: "0 0 18px rgba(245,158,11,0.45)" }}>{n.icon}</div>
              : <span style={{ fontSize: tab === n.key ? 24 : 20, color: tab === n.key ? "#f59e0b" : "rgba(255,255,255,0.28)", transition: "all .15s" }}>{n.icon}</span>
            }
            <span style={{ fontSize: 10, fontWeight: 700, color: tab === n.key ? "#f59e0b" : "rgba(255,255,255,0.28)" }}>{n.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        ::-webkit-scrollbar{display:none;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.18);}
        select option{background:#111;color:#fff;}
        @keyframes arrowUp{0%,100%{opacity:0.25;transform:translateY(0)}50%{opacity:0.6;transform:translateY(-5px)}}
        @keyframes arrowDown{0%,100%{opacity:0.25;transform:translateY(0)}50%{opacity:0.6;transform:translateY(5px)}}
        @keyframes toastPop{from{opacity:0;transform:translate(-50%,-50%) scale(0.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
      `}</style>
    </div>
  );
}
