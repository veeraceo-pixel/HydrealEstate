import { useState, useRef, useEffect, useCallback } from "react";

const GFONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
const Saffron = "#f59e0b";
const SaffronD = "#e85d04";
const Teal = "#0d9488";

const PROPERTIES = [
  { id:1, title:"Glass Tower Penthouse", locality:"HITEC City", price:"₹2.2 Cr", rawPrice:22000000, bhk:4, sqft:3800, bath:4, type:"Penthouse", status:"Ready to Move", builder:"Prestige Group", rera:"P02400001234", phone:"+91 98765 43210", tag:"LUXURY", tagColor:"#a855f7", tagBg:"rgba(168,85,247,0.18)", amenities:["Private Pool","Sky Lounge","EV Charging","Concierge","Smart Home"], highlights:["Panoramic 360° city view","40th floor sky villa","Italian marble throughout","Private terrace 800 sqft"], facing:"East", furnishing:"Semi-Furnished", parking:2, postedBy:"Builder", postedDaysAgo:2, verified:true, featured:true, commission:true, pricePerSqft:5789, possession:"Immediate", likes:847, views:12400, video:"https://www.w3schools.com/html/mov_bbb.mp4", images:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85","https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"] },
  { id:2, title:"Serene 3BHK Villa", locality:"Gachibowli", price:"₹85 L", rawPrice:8500000, bhk:3, sqft:2100, bath:3, type:"Villa", status:"Ready to Move", builder:"Aparna Constructions", rera:"P02400003456", phone:"+91 87654 32109", tag:"HOT DEAL", tagColor:"#ef4444", tagBg:"rgba(239,68,68,0.18)", amenities:["Pool","Gym","Club House","24/7 Security","Garden"], highlights:["Corner villa with garden","Durgam Cheruvu views","Gated community 200+","School & hospital nearby"], facing:"North-East", furnishing:"Unfurnished", parking:2, postedBy:"Owner", postedDaysAgo:1, verified:true, featured:true, commission:true, pricePerSqft:4047, possession:"Immediate", likes:423, views:7800, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", images:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85","https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=900&q=85"] },
  { id:3, title:"Smart 2BHK Flat", locality:"Miyapur", price:"₹48 L", rawPrice:4800000, bhk:2, sqft:1150, bath:2, type:"Apartment", status:"Under Construction", builder:"Vasavi Developers", rera:"P02400002345", phone:"+91 76543 21098", tag:"NEW LAUNCH", tagColor:"#10b981", tagBg:"rgba(16,185,129,0.18)", amenities:["Metro Access","Gym","Kids Zone","Power Backup","Solar Panels"], highlights:["5 min to Miyapur Metro","Possession Dec 2025","RERA approved","Zero brokerage"], facing:"West", furnishing:"Unfurnished", parking:1, postedBy:"Builder", postedDaysAgo:3, verified:true, featured:false, commission:true, pricePerSqft:4173, possession:"Dec 2025", likes:234, views:5300, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", images:["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85","https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=85"] },
  { id:4, title:"Studio Apartment HITEC", locality:"Madhapur", price:"₹32 L", rawPrice:3200000, bhk:1, sqft:650, bath:1, type:"Studio", status:"Ready to Move", builder:"Cybercity Builders", rera:"P02400005678", phone:"+91 65432 10987", tag:"BEST BUY", tagColor:"#f59e0b", tagBg:"rgba(245,158,11,0.18)", amenities:["Co-working","Rooftop Garden","Gym","Café"], highlights:["10 min from HITEC offices","Furnished option available","6%+ rental yield","Great connectivity"], facing:"South", furnishing:"Semi-Furnished", parking:1, postedBy:"Agent", postedDaysAgo:5, verified:true, featured:false, commission:false, pricePerSqft:4923, possession:"Immediate", likes:156, views:3100, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", images:["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=85","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=85"] },
  { id:5, title:"3BHK Township Flat", locality:"Bachupally", price:"₹68 L", rawPrice:6800000, bhk:3, sqft:1680, bath:3, type:"Apartment", status:"Ready to Move", builder:"My Home Group", rera:"P02400007890", phone:"+91 54321 09876", tag:"VERIFIED", tagColor:"#06b6d4", tagBg:"rgba(6,182,212,0.18)", amenities:["Tennis Court","Pool","School Nearby","Hospital 2km","Supermarket"], highlights:["Gated township 200+ families","5-acre green campus","Vastu compliant","Pre-approved loans"], facing:"North", furnishing:"Unfurnished", parking:2, postedBy:"Builder", postedDaysAgo:7, verified:true, featured:false, commission:true, pricePerSqft:4047, possession:"Immediate", likes:389, views:6700, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", images:["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85"] },
  { id:6, title:"Luxury 4BHK Jubilee Hills", locality:"Jubilee Hills", price:"₹1.4 Cr", rawPrice:14000000, bhk:4, sqft:2800, bath:4, type:"Apartment", status:"Ready to Move", builder:"Hallmark Builders", rera:"P02400004321", phone:"+91 44444 55555", tag:"PREMIUM", tagColor:"#a855f7", tagBg:"rgba(168,85,247,0.18)", amenities:["Rooftop Pool","Private Lift","Home Theatre","Smart Home","3 Car Park"], highlights:["Premium Jubilee Hills address","Near malls & schools","14-ft ceilings","Imported fittings"], facing:"East", furnishing:"Fully-Furnished", parking:3, postedBy:"Owner", postedDaysAgo:4, verified:true, featured:true, commission:true, pricePerSqft:5000, possession:"Immediate", likes:291, views:5800, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", images:["https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85"] },
  { id:7, title:"DTCP Plot 200 Sqyd", locality:"Kompally", price:"₹55 L", rawPrice:5500000, bhk:0, sqft:1800, bath:0, type:"Plot", status:"Available", builder:"Green Valley Realty", rera:"N/A", phone:"+91 32109 87654", tag:"DTCP APPROVED", tagColor:"#3b82f6", tagBg:"rgba(59,130,246,0.18)", amenities:["Gated Layout","Water Supply","Drainage","Wide Roads","Street Lights"], highlights:["North-facing corner plot","Immediate registration","Clear title deed","No litigation"], facing:"North", furnishing:"N/A", parking:0, postedBy:"Owner", postedDaysAgo:10, verified:true, featured:false, commission:false, pricePerSqft:3055, possession:"Immediate", likes:67, views:1800, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", images:["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85","https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=900&q=85"] },
  { id:8, title:"Prime Office 3000 Sqft", locality:"HITEC City", price:"₹1.8 Cr", rawPrice:18000000, bhk:0, sqft:3000, bath:4, type:"Commercial", status:"Available", builder:"Phoenix Group", rera:"C02400001111", phone:"+91 43210 98765", tag:"PRIME SPOT", tagColor:"#f97316", tagBg:"rgba(249,115,22,0.18)", amenities:["24/7 Access","Power Backup","High-Speed Lift","Parking x10","Fiber"], highlights:["IT corridor Grade-A","MNC ready","Fit-out support","Dedicated power"], facing:"West", furnishing:"Bare Shell", parking:10, postedBy:"Builder", postedDaysAgo:6, verified:true, featured:false, commission:true, pricePerSqft:6000, possession:"Immediate", likes:91, views:2200, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", images:["https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85","https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85"] },
];

async function askClaude(messages, system) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800, system: system || "You are a Hyderabad real estate expert. Be concise.", messages }),
    });
    const d = await r.json();
    return d.content?.[0]?.text || "";
  } catch { return ""; }
}

const css = `
  @import url('${GFONTS}');
  *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0;}
  body{background:#000;font-family:'DM Sans',sans-serif;overscroll-behavior:none;}
  ::-webkit-scrollbar{display:none;}
  input,select,textarea,button{font-family:'DM Sans',sans-serif;}
  input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.25);}
  select option{background:#111;color:#fff;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes modalIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  @keyframes sheetIn{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes dot{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes bounceD{0%,100%{opacity:.2;transform:translateY(0)}60%{opacity:.6;transform:translateY(5px)}}
  @keyframes bounceU{0%,100%{opacity:.2;transform:translateY(0)}60%{opacity:.6;transform:translateY(-5px)}}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(245,158,11,.3)}50%{box-shadow:0 0 22px rgba(245,158,11,.7)}}
  @keyframes heartPop{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .btn-s{background:linear-gradient(135deg,#f59e0b,#e85d04);border:none;color:#1a1a2e;font-weight:900;cursor:pointer;font-family:'DM Sans',sans-serif;}
  .btn-s:active{transform:scale(.97);}
  .card-li{background:#f9f7f4;border:1px solid #ede8e0;border-radius:16px;overflow:hidden;transition:box-shadow .2s,transform .2s;cursor:pointer;}
  .card-li:hover{box-shadow:0 8px 28px rgba(0,0,0,.1);transform:translateY(-2px);}
  .lbg{background:#f5f4f0;}
`;

/* Small shared */
const Chip = ({children,style}) => <span style={{background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:600,border:"1px solid rgba(255,255,255,0.14)",...style}}>{children}</span>;
const Badge = ({text,color,bg}) => <span style={{background:bg||`${color}20`,color,fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20,border:`1px solid ${color}35`,letterSpacing:.4}}>{text}</span>;

/* ── VIDEO PROGRESS ── */
function VideoProgress({videoRef}) {
  const [p,setP] = useState(0);
  useEffect(()=>{
    const v = videoRef.current; if(!v) return;
    const t = ()=>{ if(v.duration) setP(v.currentTime/v.duration); };
    v.addEventListener("timeupdate",t);
    return ()=>v.removeEventListener("timeupdate",t);
  },[videoRef]);
  return <div style={{height:2,background:"rgba(255,255,255,0.18)",borderRadius:1,overflow:"hidden"}}><div style={{height:"100%",width:`${p*100}%`,background:`linear-gradient(90deg,${Saffron},${SaffronD})`,borderRadius:1,boxShadow:`0 0 6px ${Saffron}80`}}/></div>;
}

/* ── AUTH MODAL ── */
function AuthModal({onClose,onSuccess,property}) {
  const [step,setStep] = useState("intro");
  const [phone,setPhone] = useState("");
  const [otp,setOtp] = useState(["","","","","",""]);
  const [name,setName] = useState("");
  const [role,setRole] = useState("Buyer");
  const [loading,setLoading] = useState(false);
  const [timer,setTimer] = useState(30);
  const refs = useRef([]);

  useEffect(()=>{
    if(step!=="otp") return;
    refs.current[0]?.focus();
    const t = setInterval(()=>setTimer(s=>s>0?s-1:0),1000);
    return ()=>clearInterval(t);
  },[step]);

  const sendOtp = ()=>{
    if(phone.replace(/\D/g,"").length<10) return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);setStep("otp");setTimer(30);},1100);
  };

  const handleOtp = (v,i)=>{
    const val = v.replace(/\D/g,"").slice(-1);
    const next=[...otp]; next[i]=val; setOtp(next);
    if(val&&i<5) refs.current[i+1]?.focus();
    if(next.every(d=>d)&&i===5) setTimeout(()=>setStep("profile"),300);
  };

  const handleKey = (e,i)=>{
    if(e.key==="Backspace"&&!otp[i]&&i>0){
      refs.current[i-1]?.focus();
      const n=[...otp]; n[i-1]=""; setOtp(n);
    }
  };

  const finish = ()=>{
    if(!name.trim()) return;
    setLoading(true);
    setTimeout(()=>onSuccess({name:name.trim(),phone:`+91 ${phone}`,role}),700);
  };

  const inp = (val,set,ph,type,extra)=>(
    <input type={type||"text"} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
      style={{width:"100%",background:"#f5f4f0",border:"1.5px solid #e0d9d0",borderRadius:12,padding:"13px 16px",fontSize:15,outline:"none",...extra}}/>
  );

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:22,padding:28,width:"100%",maxWidth:370,animation:"modalIn .25s ease",boxShadow:"0 28px 60px rgba(0,0,0,0.25)"}}>
        {step==="intro"&&(<>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{fontSize:46,marginBottom:10}}>🔑</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:8}}>One step to contact</div>
            <div style={{color:"#888",fontSize:13,lineHeight:1.65}}>Sign in free to see <strong style={{color:"#1a1a1a"}}>{property?.builder}</strong>'s number for <strong style={{color:SaffronD}}>{property?.title}</strong></div>
          </div>
          {[["📱","Phone OTP — instant, no password"],["🔒","Number never shared publicly"],["✅","100% free · No spam"]].map(([i,t])=>(
            <div key={t} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:18}}>{i}</span><span style={{color:"#555",fontSize:13}}>{t}</span>
            </div>
          ))}
          <button className="btn-s" onClick={()=>setStep("phone")} style={{width:"100%",padding:"14px",fontSize:15,borderRadius:12,marginTop:16}}>Continue with Phone →</button>
          <button onClick={onClose} style={{width:"100%",background:"none",border:"none",color:"#bbb",fontSize:13,cursor:"pointer",marginTop:10,padding:"6px"}}>Maybe later</button>
        </>)}
        {step==="phone"&&(<>
          <button onClick={()=>setStep("intro")} style={{background:"none",border:"none",color:"#aaa",fontSize:24,cursor:"pointer",marginBottom:14}}>‹</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>Your mobile number</div>
          <div style={{color:"#999",fontSize:13,marginBottom:18}}>We'll send a 6-digit OTP</div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <div style={{background:"#f5f4f0",border:"1.5px solid #e0d9d0",borderRadius:12,padding:"13px 12px",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              <span style={{fontSize:18}}>🇮🇳</span><span style={{fontWeight:800,color:"#333",fontSize:14}}>+91</span>
            </div>
            {inp(phone,v=>setPhone(v.replace(/\D/g,"").slice(0,10)),"98765 43210","tel",{fontSize:18,fontWeight:700,letterSpacing:2,flex:1})}
          </div>
          <button className="btn-s" onClick={sendOtp} disabled={loading||phone.replace(/\D/g,"").length<10}
            style={{width:"100%",padding:"14px",fontSize:15,borderRadius:12,opacity:phone.replace(/\D/g,"").length<10?.5:1}}>
            {loading?"Sending…":"Send OTP →"}
          </button>
        </>)}
        {step==="otp"&&(<>
          <button onClick={()=>setStep("phone")} style={{background:"none",border:"none",color:"#aaa",fontSize:24,cursor:"pointer",marginBottom:14}}>‹</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>Verify OTP</div>
          <div style={{color:"#999",fontSize:13,marginBottom:18}}>Sent to +91 {phone.slice(0,5)}XXXXX · <span style={{color:"#ccc",fontSize:11}}>Any 6 digits work</span></div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
            {otp.map((d,i)=>(
              <input key={i} ref={el=>refs.current[i]=el} type="tel" maxLength={1} value={d}
                onChange={e=>handleOtp(e.target.value,i)} onKeyDown={e=>handleKey(e,i)}
                style={{width:46,height:54,textAlign:"center",fontSize:22,fontWeight:900,borderRadius:12,outline:"none",border:`2px solid ${d?SaffronD:"#e0d9d0"}`,background:d?"#fff8f0":"#f5f4f0",transition:"border .15s"}}/>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            {timer>0?<span style={{color:"#bbb",fontSize:13}}>Resend in <strong style={{color:SaffronD}}>{timer}s</strong></span>
            :<button onClick={()=>{setTimer(30);setOtp(["","","","","",""]);}} style={{background:"none",border:"none",color:SaffronD,fontSize:13,fontWeight:700,cursor:"pointer"}}>Resend OTP</button>}
          </div>
        </>)}
        {step==="profile"&&(<>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:44,marginBottom:10}}>🎉</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>Almost there!</div>
            <div style={{color:"#999",fontSize:13}}>Just your name to complete</div>
          </div>
          {inp(name,setName,"Your full name")}
          <div style={{display:"flex",gap:7,margin:"12px 0 18px"}}>
            {["Buyer","Seller","Agent","Investor"].map(r=>(
              <button key={r} onClick={()=>setRole(r)} style={{flex:1,background:role===r?"#fff8f0":"#f5f4f0",border:`1.5px solid ${role===r?SaffronD:"#e0d9d0"}`,color:role===r?SaffronD:"#888",borderRadius:9,padding:"8px 2px",fontSize:11,fontWeight:800,cursor:"pointer"}}>{r}</button>
            ))}
          </div>
          <button className="btn-s" onClick={finish} disabled={!name.trim()||loading} style={{width:"100%",padding:"14px",fontSize:15,borderRadius:12,opacity:!name.trim()?.5:1}}>
            {loading?"Setting up…":"Enter HydPropertyHub →"}
          </button>
        </>)}
      </div>
    </div>
  );
}

/* ── CONTACT SHEET ── */
function ContactSheet({property,user,onClose}) {
  const [msg,setMsg] = useState("");
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    askClaude([{role:"user",content:`Write a short 2-sentence WhatsApp message from buyer "${user.name}" to builder about "${property.title}" in ${property.locality} at ${property.price}. Professional and brief.`}])
      .then(r=>{setMsg(r||`Hi! I'm ${user.name}. I'm interested in "${property.title}" at ${property.price} — please share details.`);setLoading(false);});
  },[]);
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:900,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"22px 22px 0 0",padding:"22px 20px 40px",width:"100%",maxWidth:480,animation:"sheetIn .3s ease",boxShadow:"0 -8px 40px rgba(0,0,0,0.2)"}}>
        <div style={{width:40,height:4,background:"#e0d9d0",borderRadius:2,margin:"0 auto 18px"}}/>
        <div style={{display:"flex",gap:12,marginBottom:18}}>
          <img src={property.images[0]} alt="" style={{width:56,height:56,borderRadius:12,objectFit:"cover",flexShrink:0}}/>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:"#1a1a1a",marginBottom:2}}>{property.title}</div>
            <div style={{color:SaffronD,fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17}}>{property.price}</div>
            <div style={{color:"#aaa",fontSize:12}}>📍 {property.locality} · {property.builder}</div>
          </div>
        </div>
        <div style={{background:"#f5f4f0",borderRadius:14,padding:14,marginBottom:12}}>
          <div style={{color:"#aaa",fontSize:10,fontWeight:800,letterSpacing:1.2,marginBottom:6}}>CONTACT NUMBER</div>
          <div style={{fontSize:24,fontWeight:900,color:"#1a1a1a",letterSpacing:1}}>{property.phone}</div>
        </div>
        <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:12,marginBottom:14}}>
          <div style={{color:"#166534",fontSize:10,fontWeight:800,letterSpacing:1,marginBottom:6}}>✨ AI MESSAGE READY</div>
          {loading
            ?<div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",animation:`dot 1.2s ${i*.2}s infinite`}}/>)}</div>
            :<div style={{color:"#166534",fontSize:13,lineHeight:1.6}}>{msg}</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          <a href={`tel:${property.phone}`} className="btn-s" style={{display:"block",padding:"14px",fontSize:15,textAlign:"center",borderRadius:12}}>📞 Call Now</a>
          <a href={`https://wa.me/${property.phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer"
            style={{display:"block",background:"#25d366",color:"#fff",borderRadius:12,padding:"14px",textAlign:"center",fontWeight:900,fontSize:15}}>💬 WhatsApp</a>
          <button onClick={onClose} style={{background:"none",border:"1.5px solid #e0d9d0",color:"#aaa",borderRadius:12,padding:"11px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── REEL ── */
function Reel({property,isActive,onContact,savedIds,onToggleSave,onSwipe}) {
  const videoRef = useRef(null);
  const [muted,setMuted] = useState(true);
  const [paused,setPaused] = useState(false);
  const [showDetails,setShowDetails] = useState(false);
  const [localLikes,setLocalLikes] = useState(property.likes);
  const [liked,setLiked] = useState(false);
  const [videoLoaded,setVideoLoaded] = useState(false);
  const saved = savedIds.has(property.id);

  const dragStart = useRef(null);
  const dragCur = useRef(0);
  const [dragX,setDragX] = useState(0);
  const [dragging,setDragging] = useState(false);
  const [stamp,setStamp] = useState(null);

  useEffect(()=>{
    const v = videoRef.current; if(!v) return;
    if(isActive&&!paused){v.currentTime=0;v.play().catch(()=>{});}
    else v.pause();
  },[isActive,paused]);

  const togglePause = ()=>{
    const v=videoRef.current; if(!v) return;
    if(paused){v.play();setPaused(false);}else{v.pause();setPaused(true);}
  };

  const getX = e=>e.touches?e.touches[0].clientX:e.clientX;
  const getY = e=>e.touches?e.touches[0].clientY:e.clientY;

  const onDS = e=>{
    if(showDetails) return;
    if(e.target.closest("button")||e.target.closest("a")) return;
    dragStart.current={x:getX(e),y:getY(e)};
    setDragging(false);
  };
  const onDM = e=>{
    if(!dragStart.current) return;
    const dx=getX(e)-dragStart.current.x;
    const dy=getY(e)-dragStart.current.y;
    if(!dragging&&Math.abs(dx)<10) return;
    if(!dragging&&Math.abs(dy)>Math.abs(dx)){dragStart.current=null;return;}
    setDragging(true);
    dragCur.current=dx;
    setDragX(dx);
    setStamp(dx>30?"like":dx<-30?"skip":null);
  };
  const onDE = ()=>{
    if(!dragging){dragStart.current=null;return;}
    const dx=dragCur.current;
    setDragging(false);dragStart.current=null;setStamp(null);
    if(Math.abs(dx)>90){
      const dir=dx>0?"right":"left";
      setDragX(dir==="right"?700:-700);
      if(dir==="right"&&!liked){setLiked(true);setLocalLikes(l=>l+1);onToggleSave(property.id);}
      setTimeout(()=>{setDragX(0);onSwipe(dir);},380);
    }else{setDragX(0);}
  };

  const rotate = dragging?dragX*0.045:0;
  const likeOp = Math.min(1,Math.max(0,dragX/60));
  const skipOp = Math.min(1,Math.max(0,-dragX/60));

  return (
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden",transform:`translateX(${dragX}px) rotate(${rotate}deg)`,transition:dragging?"none":"transform .4s cubic-bezier(.175,.885,.32,1.275)",cursor:dragging?"grabbing":"default"}}
      onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE}
      onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE}>

      {!videoLoaded&&<img src={property.images[0]} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>}
      <video ref={videoRef} src={property.video} poster={property.images[0]} muted={muted} loop playsInline preload="metadata"
        onLoadedData={()=>setVideoLoaded(true)}
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",pointerEvents:"none"}}/>

      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,5,.95) 0%,rgba(0,0,0,.45) 38%,rgba(0,0,0,.08) 62%,rgba(0,0,0,.5) 100%)",pointerEvents:"none"}}/>

      {/* Swipe stamps */}
      <div style={{position:"absolute",top:"22%",left:14,zIndex:30,pointerEvents:"none",border:"3px solid #10b981",borderRadius:10,padding:"5px 16px",transform:`rotate(-14deg) scale(${0.7+likeOp*.3})`,opacity:likeOp}}>
        <span style={{color:"#10b981",fontSize:22,fontWeight:900}}>INTERESTED ♥</span>
      </div>
      <div style={{position:"absolute",top:"22%",right:14,zIndex:30,pointerEvents:"none",border:"3px solid #ef4444",borderRadius:10,padding:"5px 16px",transform:`rotate(14deg) scale(${0.7+skipOp*.3})`,opacity:skipOp}}>
        <span style={{color:"#ef4444",fontSize:22,fontWeight:900}}>SKIP ✕</span>
      </div>

      {/* Progress bar */}
      <div style={{position:"absolute",top:0,left:0,right:0,padding:"14px 14px 0",zIndex:10,pointerEvents:"none"}}>
        <VideoProgress videoRef={videoRef}/>
      </div>

      {/* Tags + mute top right */}
      <div style={{position:"absolute",top:22,right:12,zIndex:15,display:"flex",gap:6,alignItems:"center"}}>
        <div style={{background:property.tagBg,color:property.tagColor,fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20,border:`1px solid ${property.tagColor}40`,letterSpacing:.8}}>{property.tag}</div>
        {property.verified&&<div style={{background:"rgba(13,148,136,0.85)",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:20}}>✓ RERA</div>}
        <button onClick={e=>{e.stopPropagation();setMuted(m=>!m);}} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",borderRadius:"50%",width:30,height:30,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{muted?"🔇":"🔊"}</button>
      </div>

      {/* Pause */}
      <div onClick={togglePause} style={{position:"absolute",inset:0,zIndex:5,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {paused&&<div style={{background:"rgba(0,0,0,0.55)",borderRadius:"50%",width:68,height:68,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,border:"2px solid rgba(255,255,255,0.2)"}}>▶️</div>}
      </div>

      {/* Right actions */}
      <div style={{position:"absolute",right:12,bottom:210,display:"flex",flexDirection:"column",gap:18,alignItems:"center",zIndex:10}}>
        <button onClick={e=>{e.stopPropagation();if(!liked){setLiked(true);setLocalLikes(l=>l+1);}onToggleSave(property.id);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:saved?"rgba(239,68,68,0.25)":"rgba(255,255,255,0.14)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:saved?"1px solid rgba(239,68,68,0.45)":"1px solid rgba(255,255,255,0.18)"}}>{saved?"❤️":"🤍"}</div>
          <span style={{color:saved?"#f87171":"rgba(255,255,255,0.55)",fontSize:10,fontWeight:600}}>{localLikes.toLocaleString()}</span>
        </button>
        <button onClick={e=>{e.stopPropagation();setShowDetails(true);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:"rgba(245,158,11,0.2)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:"1px solid rgba(245,158,11,0.45)",animation:"glow 2.5s infinite"}}>✨</div>
          <span style={{color:Saffron,fontSize:10,fontWeight:700}}>Details</span>
        </button>
        <button onClick={e=>{e.stopPropagation();navigator.share&&navigator.share({title:property.title,text:property.price});}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:"1px solid rgba(255,255,255,0.18)"}}>📤</div>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:600}}>Share</span>
        </button>
      </div>

      {/* Bottom info */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 14px 16px",zIndex:10}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginBottom:3}}>📍 {property.locality}, Hyderabad</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#fff",marginBottom:2,lineHeight:1.2}}>{property.title}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:Saffron,marginBottom:6}}>
          {property.price}<span style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"'DM Sans',sans-serif",fontWeight:500,marginLeft:8}}>₹{property.pricePerSqft.toLocaleString("en-IN")}/sqft</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          {property.bhk>0&&<Chip>{property.bhk} BHK</Chip>}
          <Chip>{property.sqft.toLocaleString()} sqft</Chip>
          <Chip>{property.type}</Chip>
          <Chip style={{background:property.status==="Ready to Move"?"rgba(16,185,129,0.25)":"rgba(245,158,11,0.25)",color:property.status==="Ready to Move"?"#6ee7b7":"#fde68a",border:`1px solid ${property.status==="Ready to Move"?"rgba(16,185,129,0.35)":"rgba(245,158,11,0.35)"}`}}>{property.status}</Chip>
        </div>
        <div style={{color:"rgba(255,255,255,0.55)",fontSize:12,marginBottom:12,lineHeight:1.45}}>{property.highlights[0]} • {property.highlights[1]}</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:11}}>
          <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
          <span style={{color:"rgba(255,255,255,0.2)",fontSize:10,whiteSpace:"nowrap"}}>← skip · swipe right to save →</span>
          <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
        </div>
        <button onClick={e=>{e.stopPropagation();onContact(property);}} className="btn-s" style={{width:"100%",padding:"14px 0",fontSize:15,borderRadius:14,boxShadow:`0 4px 20px rgba(245,158,11,0.35)`}}>
          📞 Contact — {property.builder}
        </button>
      </div>

      {/* Details overlay */}
      {showDetails&&(
        <div onClick={()=>setShowDetails(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,8,0.97)",zIndex:40,overflowY:"auto"}}>
          <div onClick={e=>e.stopPropagation()} style={{paddingBottom:40}}>
            <div style={{position:"relative",height:200}}>
              <img src={property.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,8,1) 0%,transparent 60%)"}}/>
              <button onClick={()=>setShowDetails(false)} style={{position:"absolute",top:14,right:14,background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",borderRadius:"50%",width:34,height:34,fontSize:16,cursor:"pointer"}}>×</button>
              <div style={{position:"absolute",bottom:14,left:16}}>
                <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,marginBottom:3}}>📍 {property.locality}</div>
                <div style={{fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,fontSize:19}}>{property.title}</div>
                <div style={{fontFamily:"'Playfair Display',serif",color:Saffron,fontWeight:900,fontSize:22}}>{property.price}</div>
              </div>
            </div>
            <div style={{padding:"18px 16px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                {[["🏠",property.type,"Type"],["📐",`${property.sqft.toLocaleString()} sqft`,"Area"],property.bhk>0?["🛏",`${property.bhk} BHK`,"Bedrooms"]:["📋","N/A","BHK"],["🏗",property.status,"Status"],["🧭",property.facing,"Facing"],["📅",property.possession,"Possession"]].map(([icon,val,label])=>(
                  <div key={label} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"11px 8px",textAlign:"center"}}>
                    <div style={{fontSize:18,marginBottom:3}}>{icon}</div>
                    <div style={{color:"#fff",fontWeight:700,fontSize:11}}>{val}</div>
                    <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,marginTop:1}}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:14}}>
                <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontWeight:800,letterSpacing:1.5,marginBottom:8}}>HIGHLIGHTS</div>
                {property.highlights.map(h=>(
                  <div key={h} style={{display:"flex",gap:8,marginBottom:7}}>
                    <span style={{color:Teal,fontSize:13,flexShrink:0}}>✓</span>
                    <span style={{color:"rgba(255,255,255,0.75)",fontSize:13,lineHeight:1.5}}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:16}}>
                <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontWeight:800,letterSpacing:1.5,marginBottom:8}}>AMENITIES</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {property.amenities.map(a=><span key={a} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",fontSize:12,padding:"5px 12px",borderRadius:20}}>✓ {a}</span>)}
                </div>
              </div>
              <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:12,marginBottom:16,display:"flex",justifyContent:"space-between"}}>
                <div><div style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>Builder</div><div style={{color:"#fff",fontWeight:700,fontSize:13}}>{property.builder}</div></div>
                <div style={{textAlign:"right"}}><div style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>RERA</div><div style={{color:Saffron,fontWeight:700,fontSize:12}}>{property.rera}</div></div>
              </div>
              <button onClick={()=>{setShowDetails(false);onContact(property);}} className="btn-s" style={{width:"100%",padding:"14px",fontSize:15,borderRadius:14}}>📞 Contact — {property.builder}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── FEED FILTER BAR ── */
function FeedFilterBar({filters,setFilters,count,total}) {
  const [open,setOpen] = useState(false);
  const {type,bhk,budget,locality} = filters;
  const LOCALITIES = ["All",...Array.from(new Set(PROPERTIES.map(p=>p.locality)))];
  const active = [type!=="All",bhk!=="All",budget!=="All",locality!=="All"].filter(Boolean).length;

  const Pill = ({val,cur,set,label}) => (
    <button onClick={()=>set(val)} style={{flexShrink:0,background:cur===val?"rgba(245,158,11,0.22)":"rgba(255,255,255,0.08)",border:`1px solid ${cur===val?"rgba(245,158,11,0.6)":"rgba(255,255,255,0.15)"}`,color:cur===val?Saffron:"rgba(255,255,255,0.7)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{label||val}</button>
  );

  return (
    <div style={{position:"absolute",top:0,left:0,right:0,zIndex:30,padding:"12px 14px 0"}}>
      {/* Top row */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:open?10:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff"}}>Hyd<span style={{color:Saffron}}>Property</span></div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {active>0&&!open&&(
            <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:200}}>
              {type!=="All"&&<span style={{background:"rgba(245,158,11,0.2)",color:Saffron,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:"1px solid rgba(245,158,11,0.4)"}}>{type}</span>}
              {bhk!=="All"&&<span style={{background:"rgba(245,158,11,0.2)",color:Saffron,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:"1px solid rgba(245,158,11,0.4)"}}>{bhk} BHK</span>}
              {budget!=="All"&&<span style={{background:"rgba(245,158,11,0.2)",color:Saffron,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:"1px solid rgba(245,158,11,0.4)"}}>{budget}</span>}
              {locality!=="All"&&<span style={{background:"rgba(245,158,11,0.2)",color:Saffron,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:"1px solid rgba(245,158,11,0.4)"}}>{locality}</span>}
            </div>
          )}
          <button onClick={()=>setOpen(o=>!o)} style={{background:open||active>0?"rgba(245,158,11,0.22)":"rgba(0,0,0,0.35)",backdropFilter:"blur(10px)",border:`1px solid ${active>0?"rgba(245,158,11,0.6)":"rgba(255,255,255,0.2)"}`,color:active>0?Saffron:"#fff",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            ⚙ Filter {active>0&&<span style={{background:Saffron,color:"#1a1a2e",fontSize:9,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{active}</span>}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {open&&(
        <div style={{background:"rgba(0,0,0,0.8)",backdropFilter:"blur(16px)",borderRadius:16,padding:12,border:"1px solid rgba(255,255,255,0.1)",animation:"fadeUp .2s ease"}}>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:7}}>TYPE</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {["All","Apartment","Villa","Plot","Commercial","Studio","Penthouse"].map(v=><Pill key={v} val={v} cur={type} set={v=>setFilters(f=>({...f,type:v}))} />)}
          </div>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:7}}>BHK</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {["All","1","2","3","4+"].map(v=><Pill key={v} val={v} cur={bhk} set={v=>setFilters(f=>({...f,bhk:v}))} label={v==="All"?"Any BHK":v+" BHK"} />)}
          </div>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:7}}>BUDGET</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {["All","Under ₹50L","₹50L–₹1Cr","₹1Cr–₹2Cr","₹2Cr+"].map(v=><Pill key={v} val={v} cur={budget} set={v=>setFilters(f=>({...f,budget:v}))} label={v==="All"?"Any Budget":v} />)}
          </div>
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:7}}>AREA</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {LOCALITIES.map(v=><Pill key={v} val={v} cur={locality} set={v=>setFilters(f=>({...f,locality:v}))} label={v==="All"?"All Areas":v} />)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>{count} of {total} properties</span>
            <div style={{display:"flex",gap:8}}>
              {active>0&&<button onClick={()=>setFilters({type:"All",bhk:"All",budget:"All",locality:"All"})} style={{background:"none",border:"none",color:Saffron,fontSize:12,fontWeight:800,cursor:"pointer"}}>Clear all</button>}
              <button onClick={()=>setOpen(false)} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",borderRadius:10,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SEARCH TAB ── */
function SearchTab({onContact,savedIds,onToggleSave,onViewDetail}) {
  const [q,setQ] = useState("");
  const [filterType,setFilterType] = useState("All");
  const [filterBHK,setFilterBHK] = useState("All");
  const [filterBudget,setFilterBudget] = useState("All");
  const [filterLocality,setFilterLocality] = useState("All");
  const [sortBy,setSortBy] = useState("Newest");
  const [aiAnswer,setAiAnswer] = useState("");
  const [aiLoading,setAiLoading] = useState(false);

  const LOCALITIES = ["All",...Array.from(new Set(PROPERTIES.map(p=>p.locality)))];
  const filtered = PROPERTIES.filter(p=>{
    const ms=!q||[p.title,p.locality,p.builder,p.type].some(s=>s.toLowerCase().includes(q.toLowerCase()));
    const mt=filterType==="All"||p.type===filterType;
    const mb=filterBHK==="All"||(filterBHK==="4+"?p.bhk>=4:String(p.bhk)===filterBHK);
    const mp=filterBudget==="All"||(filterBudget==="Under ₹50L"&&p.rawPrice<5000000)||(filterBudget==="₹50L–₹1Cr"&&p.rawPrice>=5000000&&p.rawPrice<10000000)||(filterBudget==="₹1Cr–₹2Cr"&&p.rawPrice>=10000000&&p.rawPrice<20000000)||(filterBudget==="₹2Cr+"&&p.rawPrice>=20000000);
    const ml=filterLocality==="All"||p.locality===filterLocality;
    return ms&&mt&&mb&&mp&&ml;
  }).sort((a,b)=>sortBy==="Price ↑"?a.rawPrice-b.rawPrice:sortBy==="Price ↓"?b.rawPrice-a.rawPrice:a.postedDaysAgo-b.postedDaysAgo);

  const aiSearch = async()=>{
    if(!q.trim()) return;
    setAiLoading(true);setAiAnswer("");
    const r = await askClaude([{role:"user",content:`User searching "${q}" on HydPropertyHub Hyderabad real estate app. Give 2-3 bullet tips: best area, price range, key advice. Hyderabad specific.`}]);
    setAiAnswer(r);setAiLoading(false);
  };

  return (
    <div style={{flex:1,overflowY:"auto",background:"#f5f4f0"}}>
      <div style={{background:"#fff",padding:"14px 16px",borderBottom:"1px solid #ede8e0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,display:"flex",background:"#f5f4f0",border:"1.5px solid #e0d9d0",borderRadius:10,overflow:"hidden"}}>
            <span style={{padding:"0 12px",display:"flex",alignItems:"center",color:"#bbb",fontSize:16}}>🔍</span>
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&aiSearch()}
              placeholder="Area, project, builder…"
              style={{flex:1,background:"none",border:"none",outline:"none",fontSize:13,padding:"10px 0",color:"#333"}}/>
            {q&&<button onClick={()=>setQ("")} style={{padding:"0 12px",background:"none",border:"none",color:"#bbb",cursor:"pointer",fontSize:18}}>×</button>}
          </div>
          <button onClick={aiSearch} disabled={!q.trim()||aiLoading} style={{background:`linear-gradient(135deg,${Saffron},${SaffronD})`,border:"none",color:"#1a1a2e",borderRadius:10,padding:"0 14px",fontWeight:800,fontSize:12,cursor:"pointer"}}>
            {aiLoading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:"✨ AI"}
          </button>
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingTop:10,paddingBottom:2}}>
          {[
            {opts:["All","Apartment","Villa","Plot","Commercial","Studio","Penthouse"],cur:filterType,set:setFilterType},
            {opts:["All","1","2","3","4+"],cur:filterBHK,set:setFilterBHK},
            {opts:["All","Under ₹50L","₹50L–₹1Cr","₹1Cr–₹2Cr","₹2Cr+"],cur:filterBudget,set:setFilterBudget},
            {opts:LOCALITIES,cur:filterLocality,set:setFilterLocality},
          ].map(({opts,cur,set},i)=>(
            <select key={i} value={cur} onChange={e=>set(e.target.value)} style={{flexShrink:0,background:cur!=="All"?"#fff8f0":"#fff",border:`1.5px solid ${cur!=="All"?SaffronD:"#e0d9d0"}`,color:cur!=="All"?SaffronD:"#666",borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",outline:"none"}}>
              {opts.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          ))}
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{flexShrink:0,marginLeft:"auto",background:"#fff",border:"1.5px solid #e0d9d0",borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",outline:"none",color:"#666"}}>
            {["Newest","Price ↑","Price ↓"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {aiAnswer&&<div style={{background:"#fff8f0",border:`1px solid ${SaffronD}25`,borderRadius:14,padding:14,marginBottom:14,animation:"fadeUp .3s ease"}}><div style={{fontSize:10,color:SaffronD,fontWeight:800,letterSpacing:1.5,marginBottom:8}}>✨ AI RECOMMENDATION</div><div style={{color:"#444",fontSize:13,lineHeight:1.7,whiteSpace:"pre-line"}}>{aiAnswer}</div></div>}
        <div style={{color:"#aaa",fontSize:12,fontWeight:600,marginBottom:12}}><strong style={{color:"#333"}}>{filtered.length}</strong> properties found</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {filtered.map(p=>(
            <div key={p.id} className="card-li" onClick={()=>onViewDetail(p)}>
              <div style={{position:"relative",height:180}}>
                <img src={p.images[0]} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy"/>
                <div style={{position:"absolute",top:8,left:8,display:"flex",gap:5}}>
                  <Badge text={p.tag} color={p.tagColor} bg={p.tagBg}/>
                  {p.featured&&<Badge text="FEATURED" color={Saffron}/>}
                </div>
                <button onClick={e=>{e.stopPropagation();onToggleSave(p.id);}} style={{position:"absolute",top:6,right:8,background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:32,height:32,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}>
                  {savedIds.has(p.id)?"❤️":"🤍"}
                </button>
                {p.verified&&<div style={{position:"absolute",bottom:8,right:8,background:"rgba(13,148,136,0.88)",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5}}>✓ RERA</div>}
              </div>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#1a1a1a",lineHeight:1.3,marginBottom:4}}>{p.title}</div>
                <div style={{color:SaffronD,fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:19,marginBottom:4}}>{p.price} <span style={{color:"#bbb",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>₹{p.pricePerSqft.toLocaleString()}/sqft</span></div>
                <div style={{color:"#888",fontSize:12,marginBottom:8}}>📍 {p.locality}, Hyderabad</div>
                <div style={{display:"flex",gap:0,borderTop:"1px solid #f0ebe3",paddingTop:8}}>
                  {[p.bhk>0?`🛏 ${p.bhk}BHK`:null,`📐 ${p.sqft.toLocaleString()}`,p.bath>0?`🚿 ${p.bath}`:null,p.status==="Ready to Move"?"✅ Ready":"🏗 UC"].filter(Boolean).slice(0,4).map(v=>(
                    <div key={v} style={{flex:1,textAlign:"center",fontSize:11,fontWeight:700,color:"#666",borderRight:"1px solid #f0ebe3"}}>{v}</div>
                  ))}
                </div>
              </div>
              <div style={{padding:"0 14px 12px",display:"flex",gap:7}}>
                <button onClick={e=>{e.stopPropagation();onViewDetail(p);}} style={{flex:1,background:"transparent",border:"1.5px solid #e0d9d0",color:"#666",borderRadius:8,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer"}}>View Details</button>
                <button onClick={e=>{e.stopPropagation();onContact(p);}} className="btn-s" style={{flex:1.2,padding:"9px",fontSize:12,borderRadius:8}}>📞 Contact</button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:"#bbb"}}><div style={{fontSize:44,marginBottom:12}}>🔍</div><div style={{fontWeight:700,fontSize:16,color:"#888",marginBottom:6}}>No properties found</div><div style={{fontSize:13}}>Try different filters</div></div>}
      </div>
    </div>
  );
}

/* ── DETAIL PAGE ── */
function DetailPage({property,onBack,onContact,savedIds,onToggleSave}) {
  const [imgIdx,setImgIdx] = useState(0);
  const [dtab,setDtab] = useState("overview");
  const [aiQ,setAiQ] = useState("");
  const [aiA,setAiA] = useState("");
  const [aiLoad,setAiLoad] = useState(false);
  const saved = savedIds.has(property.id);

  const askAI = async()=>{
    if(!aiQ.trim()) return;
    setAiLoad(true);setAiA("");
    const r = await askClaude([{role:"user",content:`About "${property.title}" in ${property.locality} at ${property.price} (${property.sqft}sqft, ${property.bhk>0?property.bhk+" BHK":property.type}, RERA:${property.rera}): ${aiQ}`}]);
    setAiA(r||"Sorry, try again.");setAiLoad(false);
  };

  return (
    <div style={{background:"#f5f4f0",minHeight:"100vh"}}>
      <div style={{position:"relative",height:280,background:"#111"}}>
        <img src={property.images[imgIdx]} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.94}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.35) 0%,transparent 45%,rgba(0,0,0,.15) 100%)"}}/>
        <div style={{position:"absolute",top:16,left:16,right:16,display:"flex",justifyContent:"space-between"}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:38,height:38,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>←</button>
          <button onClick={()=>onToggleSave(property.id)} style={{background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:38,height:38,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>{saved?"❤️":"🤍"}</button>
        </div>
        <div style={{position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6}}>
          {property.images.map((_,i)=>(
            <div key={i} onClick={()=>setImgIdx(i)} style={{width:i===imgIdx?22:8,height:8,borderRadius:4,background:i===imgIdx?"#fff":"rgba(255,255,255,.5)",cursor:"pointer",transition:"all .2s"}}/>
          ))}
        </div>
      </div>
      <div style={{position:"sticky",top:0,zIndex:100,background:"#fff",borderBottom:"1px solid #ede8e0",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#1a1a1a"}}>{property.price}</div>
          <div style={{color:"#aaa",fontSize:11}}>₹{property.pricePerSqft.toLocaleString()}/sqft · {property.locality}</div>
        </div>
        <button onClick={()=>onContact(property)} className="btn-s" style={{padding:"11px 20px",fontSize:14,borderRadius:10}}>📞 Contact</button>
      </div>
      <div style={{padding:"16px 16px 100px",maxWidth:640,margin:"0 auto"}}>
        <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:12,border:"1px solid #ede8e0"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            <Badge text={property.tag} color={property.tagColor} bg={property.tagBg}/>
            {property.verified&&<Badge text="✓ RERA" color={Teal}/>}
            {property.featured&&<Badge text="FEATURED" color={Saffron}/>}
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1a1a",marginBottom:6,lineHeight:1.3}}>{property.title}</h1>
          <div style={{color:SaffronD,fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:26,marginBottom:6}}>{property.price}</div>
          <div style={{color:"#777",fontSize:14,marginBottom:14}}>📍 {property.locality}, Hyderabad</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[property.bhk>0?["🛏",`${property.bhk} BHK`,"Bedrooms"]:["📋",property.type,"Type"],["📐",`${property.sqft.toLocaleString()} sqft`,"Area"],property.bath>0?["🚿",`${property.bath}`,"Bathrooms"]:["📅",property.status,"Status"],["🧭",property.facing,"Facing"],["🏗",property.status,"Status"],["🛋",property.furnishing,"Furnishing"]].map(([icon,val,label])=>(
              <div key={label} style={{background:"#f9f7f4",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                <div style={{fontWeight:800,fontSize:12,color:"#1a1a1a",marginBottom:1}}>{val}</div>
                <div style={{color:"#bbb",fontSize:10}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:2,background:"#fff",borderRadius:12,padding:4,marginBottom:12,border:"1px solid #ede8e0"}}>
          {[["overview","Overview"],["amenities","Amenities"],["ai","✨ Ask AI"]].map(([k,l])=>(
            <button key={k} onClick={()=>setDtab(k)} style={{flex:1,background:dtab===k?SaffronD:"transparent",color:dtab===k?"#fff":"#888",border:"none",borderRadius:9,padding:"9px 4px",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .15s"}}>{l}</button>
          ))}
        </div>
        {dtab==="overview"&&(<>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:12,border:"1px solid #ede8e0"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#1a1a1a",marginBottom:12}}>Highlights</div>
            {property.highlights.map(h=><div key={h} style={{display:"flex",gap:10,marginBottom:9}}><span style={{color:Teal,fontSize:14,flexShrink:0}}>✓</span><span style={{color:"#444",fontSize:14,lineHeight:1.5}}>{h}</span></div>)}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #ede8e0"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#1a1a1a",marginBottom:12}}>Builder & Legal</div>
            {[["Builder",property.builder],["RERA No.",property.rera],["Posted By",property.postedBy],["Price/sqft",`₹${property.pricePerSqft.toLocaleString()}`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #f5f0e8"}}>
                <span style={{color:"#aaa",fontSize:13}}>{k}</span><span style={{color:"#1a1a1a",fontWeight:700,fontSize:13}}>{v}</span>
              </div>
            ))}
          </div>
        </>)}
        {dtab==="amenities"&&(
          <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #ede8e0"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#1a1a1a",marginBottom:14}}>Amenities</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {property.amenities.map(a=><div key={a} style={{background:"#f9f7f4",border:"1px solid #ede8e0",borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#444",display:"flex",alignItems:"center",gap:6}}><span style={{color:Teal}}>✓</span> {a}</div>)}
            </div>
          </div>
        )}
        {dtab==="ai"&&(
          <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #ede8e0"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}><span style={{fontSize:20}}>✨</span><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#1a1a1a"}}>Ask AI about this property</div></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
              {["Is this price fair?","Good investment?","EMI at 8.5%?","Neighbourhood?","Resale value?"].map(q=>(
                <button key={q} onClick={()=>setAiQ(q)} style={{background:"#f9f7f4",border:"1px solid #ede8e0",borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:600,color:"#555",cursor:"pointer"}}>{q}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder="Ask anything…" style={{flex:1,background:"#f9f7f4",border:"1.5px solid #ede8e0",borderRadius:10,padding:"11px 14px",fontSize:13,outline:"none"}}/>
              <button onClick={askAI} disabled={!aiQ.trim()||aiLoad} className="btn-s" style={{padding:"11px 16px",fontSize:14,borderRadius:10}}>{aiLoad?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:"→"}</button>
            </div>
            {aiLoad&&<div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:SaffronD,animation:`dot 1.2s ${i*.2}s infinite`}}/>)}</div>}
            {aiA&&<div style={{background:"#fff8f0",border:`1px solid ${SaffronD}25`,borderRadius:12,padding:14,lineHeight:1.7,color:"#333",fontSize:14,animation:"fadeUp .3s ease"}}>{aiA}</div>}
          </div>
        )}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #ede8e0",padding:"12px 16px 24px",display:"flex",gap:10,maxWidth:640,margin:"0 auto"}}>
        <button onClick={()=>onContact(property)} className="btn-s" style={{flex:2,padding:"14px",fontSize:15,borderRadius:10}}>📞 Contact Builder</button>
        <button onClick={()=>onToggleSave(property.id)} style={{flex:1,background:saved?"#fff8f0":"#f9f7f4",border:`1.5px solid ${saved?SaffronD:"#e0d9d0"}`,color:saved?SaffronD:"#777",borderRadius:10,padding:"14px",fontWeight:800,fontSize:14,cursor:"pointer"}}>{saved?"❤️ Saved":"🤍 Save"}</button>
      </div>
    </div>
  );
}

/* ── SAVED TAB ── */
function SavedTab({savedIds,onContact,onToggleSave,onViewDetail}) {
  const saved = PROPERTIES.filter(p=>savedIds.has(p.id));
  return (
    <div style={{flex:1,overflowY:"auto",background:"#f5f4f0",padding:"20px 16px 100px"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>Saved <span style={{color:SaffronD}}>({saved.length})</span></div>
      <div style={{color:"#aaa",fontSize:13,marginBottom:18}}>Swipe right or tap 🤍 to save</div>
      {saved.length===0?(
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{fontSize:52,marginBottom:14}}>🤍</div>
          <div style={{fontWeight:700,fontSize:17,color:"#888",marginBottom:6}}>Nothing saved yet</div>
          <div style={{color:"#bbb",fontSize:14}}>Swipe right in the feed or tap 🤍 on any listing</div>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {saved.map(p=>(
            <div key={p.id} className="card-li" onClick={()=>onViewDetail(p)} style={{display:"flex"}}>
              <div style={{position:"relative",flexShrink:0}}>
                <img src={p.images[0]} alt="" style={{width:100,height:110,objectFit:"cover"}}/>
                <div style={{position:"absolute",top:6,left:6}}><Badge text={p.tag} color={p.tagColor} bg={p.tagBg}/></div>
              </div>
              <div style={{padding:"12px 14px",flex:1,minWidth:0}}>
                <div style={{color:"#aaa",fontSize:10,marginBottom:2}}>📍 {p.locality}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:"#1a1a1a",marginBottom:3}}>{p.title}</div>
                <div style={{color:SaffronD,fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,marginBottom:8}}>{p.price}</div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={e=>{e.stopPropagation();onContact(p);}} className="btn-s" style={{flex:1,padding:"8px 10px",fontSize:12,borderRadius:8}}>📞 Contact</button>
                  <button onClick={e=>{e.stopPropagation();onToggleSave(p.id);}} style={{background:"#fff0f0",border:"1px solid #fca5a5",color:"#ef4444",borderRadius:8,padding:"8px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── POST TAB ── */
function PostTab({user,onAuthRequired}) {
  const [form,setForm] = useState({title:"",locality:"Gachibowli",price:"",rawPrice:"",bhk:"2",sqft:"",type:"Apartment",status:"Ready to Move",builder:"",rera:"",phone:"",highlights:"",amenities:"",tag:"VERIFIED",commission:true});
  const [done,setDone] = useState(false);
  const [errors,setErrors] = useState({});
  const f = k=>v=>setForm(p=>({...p,[k]:v}));

  const submit = ()=>{
    if(!user){onAuthRequired();return;}
    const e={};
    if(!form.title.trim())e.title="Required";
    if(!form.price.trim())e.price="Required";
    if(!form.builder.trim())e.builder="Required";
    if(!form.phone.trim())e.phone="Required";
    if(Object.keys(e).length){setErrors(e);return;}
    setDone(true);
  };

  if(done) return (
    <div style={{flex:1,background:"#f5f4f0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30,textAlign:"center"}}>
      <div style={{fontSize:60,marginBottom:16}}>🎉</div>
      <div style={{fontFamily:"'Playfair Display',serif",color:"#10b981",fontSize:22,fontWeight:700,marginBottom:8}}>Submitted!</div>
      <div style={{color:"#888",fontSize:14,lineHeight:1.7,marginBottom:24}}>Our team will verify and publish your listing as a Shorts reel within 24 hours.</div>
      <button onClick={()=>setDone(false)} style={{background:"#f5f4f0",border:"1.5px solid #e0d9d0",color:"#666",borderRadius:12,padding:"11px 24px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Post Another</button>
    </div>
  );

  const Row=({label,k,type,ph,hint})=>(
    <div style={{marginBottom:14}}>
      <label style={{color:"#888",fontSize:11,fontWeight:700,letterSpacing:1.2,display:"block",marginBottom:5}}>{label}</label>
      <input type={type||"text"} placeholder={ph} value={form[k]} onChange={e=>f(k)(e.target.value)}
        style={{width:"100%",background:"#fff",border:`1.5px solid ${errors[k]?"#fca5a5":"#e0d9d0"}`,borderRadius:12,padding:"12px 14px",color:"#1a1a1a",fontSize:14,outline:"none"}}/>
      {errors[k]&&<div style={{color:"#ef4444",fontSize:11,marginTop:3}}>{errors[k]}</div>}
      {hint&&<div style={{color:"#ccc",fontSize:11,marginTop:3}}>{hint}</div>}
    </div>
  );
  const Sel=({label,k,opts})=>(
    <div style={{marginBottom:14}}>
      <label style={{color:"#888",fontSize:11,fontWeight:700,letterSpacing:1.2,display:"block",marginBottom:5}}>{label}</label>
      <select value={form[k]} onChange={e=>f(k)(e.target.value)} style={{width:"100%",background:"#fff",border:"1.5px solid #e0d9d0",borderRadius:12,padding:"12px 14px",color:"#1a1a1a",fontSize:14,outline:"none"}}>
        {opts.map(o=><option key={o} value={o} style={{background:"#fff",color:"#1a1a1a"}}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",background:"#f5f4f0",padding:"20px 16px 100px"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>List Your Property</div>
      <div style={{color:"#aaa",fontSize:13,marginBottom:20}}>Free listing · Shown as Shorts reel 🎬</div>
      {!user&&<div style={{background:"#fff8f0",border:`1px solid ${SaffronD}30`,borderRadius:14,padding:14,marginBottom:20,display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:24}}>🔑</span><div style={{flex:1}}><div style={{fontWeight:700,color:"#1a1a1a",fontSize:14,marginBottom:2}}>Sign in to post</div><div style={{color:"#aaa",fontSize:12}}>Free signup required</div></div><button onClick={onAuthRequired} className="btn-s" style={{padding:"8px 16px",fontSize:13,borderRadius:8,flexShrink:0}}>Sign In</button></div>}
      <Row label="PROPERTY TITLE *" k="title" ph="3BHK Villa in Gachibowli"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Row label="DISPLAY PRICE *" k="price" ph="₹85 L"/>
        <Row label="RAW PRICE ₹" k="rawPrice" type="number" ph="8500000"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Sel label="TYPE" k="type" opts={["Apartment","Villa","Plot","Penthouse","Studio","Commercial"]}/>
        <Sel label="BHK" k="bhk" opts={["0","1","2","3","4","5"]}/>
        <Sel label="STATUS" k="status" opts={["Ready to Move","Under Construction","Available"]}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Sel label="LOCALITY" k="locality" opts={["Gachibowli","HITEC City","Miyapur","Jubilee Hills","Bachupally","Madhapur","Kompally","Kukatpally","Banjara Hills","Kondapur"]}/>
        <Row label="AREA (SQFT)" k="sqft" type="number" ph="1800"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Row label="BUILDER NAME *" k="builder" ph="Aparna Constructions"/>
        <Row label="RERA NUMBER" k="rera" ph="P02400003456"/>
      </div>
      <Row label="CONTACT PHONE *" k="phone" ph="+91 87654 32109"/>
      <div style={{marginBottom:14}}>
        <label style={{color:"#888",fontSize:11,fontWeight:700,letterSpacing:1.2,display:"block",marginBottom:5}}>KEY HIGHLIGHTS</label>
        <textarea value={form.highlights} onChange={e=>f("highlights")(e.target.value)} placeholder="Corner villa, near metro, pool view…" rows={2}
          style={{width:"100%",background:"#fff",border:"1.5px solid #e0d9d0",borderRadius:12,padding:"12px 14px",color:"#1a1a1a",fontSize:14,outline:"none",resize:"none"}}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div onClick={()=>f("commission")(!form.commission)} style={{width:44,height:24,borderRadius:12,background:form.commission?SaffronD:"#e0d9d0",position:"relative",cursor:"pointer",transition:"all .2s"}}>
          <div style={{position:"absolute",top:3,left:form.commission?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
        </div>
        <span style={{color:"#555",fontSize:13,fontWeight:600}}>Commission available for agents</span>
      </div>
      <button onClick={submit} className="btn-s" style={{width:"100%",padding:"15px",fontSize:16,borderRadius:14,boxShadow:`0 4px 20px rgba(245,158,11,0.35)`}}>
        {user?"Submit Listing →":"Sign In to Post →"}
      </button>
    </div>
  );
}

/* ── ACCOUNT TAB ── */
function AccountTab({user,savedIds,onLogout,onEditProfile,onAuthRequired}) {
  const [editMode,setEditMode] = useState(false);
  const [editName,setEditName] = useState(user?.name||"");
  const [open,setOpen] = useState(null);
  const [notif,setNotif] = useState({newListings:true,priceDrops:true,promo:false});
  const saved = PROPERTIES.filter(p=>savedIds.has(p.id));

  if(!user) return (
    <div style={{flex:1,background:"#f5f4f0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>👤</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1a1a",marginBottom:8}}>Sign in to your account</div>
      <div style={{color:"#aaa",fontSize:14,marginBottom:24}}>Save properties, contact builders, track listings</div>
      <button onClick={onAuthRequired} className="btn-s" style={{padding:"14px 32px",fontSize:15,borderRadius:12}}>Sign In Free →</button>
    </div>
  );

  const Sec=({icon,label,id,badge,children})=>(
    <div style={{background:"#fff",border:"1px solid #ede8e0",borderRadius:16,overflow:"hidden",marginBottom:10}}>
      <button onClick={()=>setOpen(open===id?null:id)} style={{width:"100%",background:"none",border:"none",padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
        <span style={{fontSize:20}}>{icon}</span>
        <span style={{color:"#1a1a1a",fontWeight:700,fontSize:15,flex:1}}>{label}</span>
        {badge>0&&<span style={{background:`${SaffronD}22`,color:SaffronD,fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:10}}>{badge}</span>}
        <span style={{color:"#ccc",fontSize:18,transition:"transform .2s",transform:open===id?"rotate(90deg)":"none"}}>›</span>
      </button>
      {open===id&&<div style={{borderTop:"1px solid #f0ebe3",padding:16}}>{children}</div>}
    </div>
  );
  const Toggle=({label,sub,k})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f5f0e8"}}>
      <div><div style={{color:"#1a1a1a",fontSize:13,fontWeight:600}}>{label}</div>{sub&&<div style={{color:"#bbb",fontSize:11,marginTop:1}}>{sub}</div>}</div>
      <div onClick={()=>setNotif(n=>({...n,[k]:!n[k]}))} style={{width:44,height:24,borderRadius:12,background:notif[k]?`linear-gradient(135deg,${Saffron},${SaffronD})`:"#e0d9d0",position:"relative",cursor:"pointer",transition:"all .25s",flexShrink:0}}>
        <div style={{position:"absolute",top:3,left:notif[k]?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:"auto",background:"#f5f4f0"}}>
      <div style={{background:"linear-gradient(135deg,#18060a,#2d1200)",padding:"28px 20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${Saffron},${SaffronD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#1a1a2e",border:"3px solid rgba(245,158,11,0.4)",boxShadow:"0 0 24px rgba(245,158,11,0.25)"}}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",color:"#fff",fontWeight:700,fontSize:19,marginBottom:2}}>{user.name}</div>
            <div style={{color:"rgba(255,255,255,0.45)",fontSize:13}}>{user.phone}</div>
            <div style={{display:"inline-block",background:"rgba(245,158,11,0.18)",color:Saffron,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:10,marginTop:5,border:"1px solid rgba(245,158,11,0.3)"}}>{user.role}</div>
          </div>
          <button onClick={()=>setEditMode(!editMode)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Edit</button>
        </div>
        <div style={{display:"flex",marginTop:20,background:"rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"}}>
          {[["❤️",saved.length,"Saved"],["🏠","0","Listings"],["📞","0","Contacts"]].map(([icon,val,label],i)=>(
            <div key={label} style={{flex:1,textAlign:"center",padding:"12px 0",borderRight:i<2?"1px solid rgba(255,255,255,0.08)":"none"}}>
              <div style={{fontSize:16}}>{icon}</div>
              <div style={{color:"#fff",fontWeight:900,fontSize:18,fontFamily:"'Playfair Display',serif"}}>{val}</div>
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 16px 100px"}}>
        {editMode&&(
          <div style={{background:"#fff8f0",border:`1px solid ${SaffronD}25`,borderRadius:14,padding:16,marginBottom:14,animation:"fadeUp .2s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <div style={{color:SaffronD,fontWeight:800,fontSize:13}}>EDIT PROFILE</div>
              <button onClick={()=>setEditMode(false)} style={{background:"none",border:"none",color:"#aaa",fontSize:20,cursor:"pointer"}}>×</button>
            </div>
            <input value={editName} onChange={e=>setEditName(e.target.value)} placeholder="Full name"
              style={{width:"100%",background:"#fff",border:"1.5px solid #e0d9d0",borderRadius:12,padding:"12px 14px",fontSize:14,outline:"none",marginBottom:10}}/>
            <button onClick={()=>{onEditProfile({...user,name:editName});setEditMode(false);}} className="btn-s" style={{width:"100%",padding:"12px",fontSize:14,borderRadius:12}}>Save Changes</button>
          </div>
        )}
        <Sec icon="❤️" label="Saved Properties" id="saved" badge={saved.length}>
          {saved.length===0?<div style={{color:"#bbb",fontSize:13,textAlign:"center",padding:"10px 0"}}>Swipe right in the feed to save properties</div>
          :saved.map(p=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #f5f0e8"}}>
              <img src={p.images[0]} alt="" style={{width:46,height:46,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"#1a1a1a",fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.title}</div>
                <div style={{color:SaffronD,fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14}}>{p.price}</div>
              </div>
              <a href={`https://wa.me/${p.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{background:"rgba(37,211,102,0.15)",color:"#16a34a",textDecoration:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:700,border:"1px solid rgba(37,211,102,0.25)",flexShrink:0}}>💬</a>
            </div>
          ))}
        </Sec>
        <Sec icon="🔔" label="Notification Settings" id="notif">
          <Toggle label="New Listings" sub="When new properties match your criteria" k="newListings"/>
          <Toggle label="Price Drops" sub="When saved properties drop in price" k="priceDrops"/>
          <Toggle label="Promotions" sub="Builder offers and updates" k="promo"/>
        </Sec>
        <Sec icon="🔑" label="Recover Account" id="recover">
          <div style={{color:"#888",fontSize:13,lineHeight:1.6,marginBottom:12}}>Verify your registered mobile to recover your account.</div>
          <button style={{background:"#fff8f0",border:`1px solid ${SaffronD}30`,color:SaffronD,borderRadius:12,padding:"11px 20px",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"}}>🔑 Start Account Recovery</button>
        </Sec>
        <button onClick={onLogout} style={{width:"100%",background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.2)",color:"#ef4444",borderRadius:14,padding:"14px",fontWeight:800,fontSize:15,cursor:"pointer",marginTop:4}}>Sign Out</button>
      </div>
    </div>
  );
}

/* ── MAIN APP ── */
export default function App() {
  const [tab,setTab] = useState("feed");
  const [user,setUser] = useState(null);
  const [authProp,setAuthProp] = useState(null);
  const [contactProp,setContactProp] = useState(null);
  const [detailProp,setDetailProp] = useState(null);
  const [savedIds,setSavedIds] = useState(new Set());
  const [toast,setToast] = useState("");

  // Feed state
  const [currentIdx,setCurrentIdx] = useState(0);
  const [transitioning,setTransitioning] = useState(false);
  const [history,setHistory] = useState([]);
  const [filters,setFilters] = useState({type:"All",bhk:"All",budget:"All",locality:"All"});

  const touchStartY = useRef(null);
  const touchStartX = useRef(null);
  const isVert = useRef(false);

  const showToast = msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const handleContact = useCallback(prop=>{
    if(!user) setAuthProp(prop);
    else setContactProp(prop);
  },[user]);

  const handleAuthSuccess = u=>{
    setUser(u);
    const pending=authProp;
    setAuthProp(null);
    showToast(`Welcome, ${u.name}! 🎉`);
    if(pending) setTimeout(()=>setContactProp(pending),250);
  };

  const toggleSave = id=>{
    setSavedIds(s=>{
      const n=new Set(s);
      if(n.has(id)){n.delete(id);showToast("Removed from saved");}
      else{n.add(id);showToast("❤️ Saved!");}
      return n;
    });
  };

  // Filtered feed
  const feedList = PROPERTIES.filter(p=>{
    const mt=filters.type==="All"||p.type===filters.type;
    const mb=filters.bhk==="All"||(filters.bhk==="4+"?p.bhk>=4:String(p.bhk)===filters.bhk);
    const mp=filters.budget==="All"||(filters.budget==="Under ₹50L"&&p.rawPrice<5000000)||(filters.budget==="₹50L–₹1Cr"&&p.rawPrice>=5000000&&p.rawPrice<10000000)||(filters.budget==="₹1Cr–₹2Cr"&&p.rawPrice>=10000000&&p.rawPrice<20000000)||(filters.budget==="₹2Cr+"&&p.rawPrice>=20000000);
    const ml=filters.locality==="All"||p.locality===filters.locality;
    return mt&&mb&&mp&&ml;
  });

  useEffect(()=>{setCurrentIdx(0);setHistory([]);},[filters]);

  const goNext = useCallback(()=>{
    if(transitioning||currentIdx>=feedList.length-1) return;
    setHistory(h=>[...h,currentIdx]);
    setTransitioning(true);
    setCurrentIdx(i=>i+1);
    setTimeout(()=>setTransitioning(false),380);
  },[transitioning,currentIdx,feedList.length]);

  const goBack = useCallback(()=>{
    if(transitioning) return;
    if(history.length>0){
      const prev=history[history.length-1];
      setHistory(h=>h.slice(0,-1));
      setTransitioning(true);
      setCurrentIdx(prev);
      setTimeout(()=>setTransitioning(false),380);
    }
  },[transitioning,history]);

  useEffect(()=>{
    const h=e=>{
      if(tab!=="feed") return;
      if(e.key==="ArrowDown"||e.key==="s") goNext();
      if(e.key==="ArrowUp"||e.key==="w") goBack();
    };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[tab,goNext,goBack]);

  const onTouchStart=e=>{touchStartY.current=e.touches[0].clientY;touchStartX.current=e.touches[0].clientX;isVert.current=false;};
  const onTouchMove=e=>{
    if(!touchStartY.current) return;
    const dy=touchStartY.current-e.touches[0].clientY;
    const dx=Math.abs(e.touches[0].clientX-touchStartX.current);
    if(dx>25) return;
    if(Math.abs(dy)>12) isVert.current=true;
  };
  const onTouchEnd=e=>{
    if(!touchStartY.current||!isVert.current){touchStartY.current=null;return;}
    const dy=touchStartY.current-e.changedTouches[0].clientY;
    if(Math.abs(dy)>45){if(dy>0) goNext(); else goBack();}
    touchStartY.current=null;isVert.current=false;
  };

  const NAV=[
    {key:"feed",icon:"▶",label:"Shorts"},
    {key:"search",icon:"🔍",label:"Search"},
    {key:"post",icon:"＋",label:"Post",special:true},
    {key:"saved",icon:savedIds.size>0?"❤️":"🤍",label:`Saved${savedIds.size>0?" ("+savedIds.size+")":""}`},
    {key:"account",icon:"👤",label:"Account"},
  ];

  if(detailProp) return (
    <>
      <style>{css}</style>
      <DetailPage property={detailProp} onBack={()=>setDetailProp(null)} onContact={handleContact} savedIds={savedIds} onToggleSave={toggleSave}/>
      {authProp&&<AuthModal onClose={()=>setAuthProp(null)} onSuccess={handleAuthSuccess} property={authProp}/>}
      {contactProp&&user&&<ContactSheet property={contactProp} user={user} onClose={()=>setContactProp(null)}/>}
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div style={{height:"100dvh",background:"#000",display:"flex",flexDirection:"column",overflow:"hidden",maxWidth:430,margin:"0 auto",fontFamily:"'DM Sans',sans-serif",position:"relative"}}>

        {/* SHORTS FEED */}
        {tab==="feed"&&(
          <div style={{flex:1,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
            <FeedFilterBar filters={filters} setFilters={setFilters} count={feedList.length} total={PROPERTIES.length}/>
            <div style={{flex:1,position:"relative"}}
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
              onWheel={e=>{if(e.deltaY>25) goNext(); else if(e.deltaY<-25) goBack();}}>

              {feedList.length===0?(
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",textAlign:"center",padding:30}}>
                  <div style={{fontSize:52,marginBottom:16}}>🔍</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#fff",marginBottom:8}}>No properties match</div>
                  <div style={{fontSize:14,marginBottom:20}}>Try different filters</div>
                  <button onClick={()=>setFilters({type:"All",bhk:"All",budget:"All",locality:"All"})} className="btn-s" style={{padding:"12px 24px",fontSize:14,borderRadius:12}}>Clear Filters</button>
                </div>
              ):feedList.map((prop,i)=>{
                const offset=i-currentIdx;
                if(Math.abs(offset)>1) return null;
                return (
                  <div key={prop.id} style={{position:"absolute",inset:0,transform:`translateY(${offset*100}%)`,transition:transitioning?"transform .38s cubic-bezier(.25,.46,.45,.94)":"none",zIndex:i===currentIdx?2:1}}>
                    <Reel property={prop} isActive={i===currentIdx&&tab==="feed"} onContact={handleContact} savedIds={savedIds} onToggleSave={toggleSave} onSwipe={dir=>{if(dir==="right"||dir==="left") goNext();}}/>
                  </div>
                );
              })}

              {/* Position dots */}
              <div style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:5,zIndex:20,pointerEvents:"none"}}>
                {feedList.map((_,i)=>(
                  <div key={i} style={{width:3,height:i===currentIdx?22:6,borderRadius:2,background:i===currentIdx?Saffron:"rgba(255,255,255,0.2)",transition:"all .3s",boxShadow:i===currentIdx?`0 0 8px ${Saffron}99`:undefined}}/>
                ))}
              </div>

              {/* Back button */}
              {history.length>0&&(
                <button onClick={goBack} style={{position:"absolute",bottom:92,left:14,zIndex:20,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:22,padding:"7px 14px",fontSize:12,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                  ↩ Back
                </button>
              )}

              {/* Scroll arrows */}
              {history.length>0&&(
                <div onClick={goBack} style={{position:"absolute",top:80,left:"50%",transform:"translateX(-50%)",zIndex:20,cursor:"pointer",color:"rgba(255,255,255,0.25)",fontSize:18,animation:"bounceU 1.5s infinite"}}>↑</div>
              )}
              {currentIdx<feedList.length-1&&(
                <div onClick={goNext} style={{position:"absolute",bottom:88,left:"50%",transform:"translateX(-50%)",zIndex:20,cursor:"pointer",color:"rgba(255,255,255,0.25)",fontSize:18,animation:"bounceD 1.5s infinite"}}>↓</div>
              )}

              {/* Counter */}
              {feedList.length>0&&(
                <div style={{position:"absolute",bottom:92,right:14,zIndex:20,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",borderRadius:20,padding:"4px 10px",border:"1px solid rgba(255,255,255,0.12)"}}>
                  <span style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:700}}>{currentIdx+1}/{feedList.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==="search"&&<SearchTab onContact={handleContact} savedIds={savedIds} onToggleSave={toggleSave} onViewDetail={setDetailProp}/>}
        {tab==="post"&&<PostTab user={user} onAuthRequired={()=>setAuthProp(PROPERTIES[0])}/>}
        {tab==="saved"&&<SavedTab savedIds={savedIds} onContact={handleContact} onToggleSave={toggleSave} onViewDetail={setDetailProp}/>}
        {tab==="account"&&<AccountTab user={user} savedIds={savedIds} onLogout={()=>{setUser(null);showToast("Signed out");}} onEditProfile={setUser} onAuthRequired={()=>setAuthProp(PROPERTIES[0])}/>}

        {toast&&<div style={{position:"absolute",bottom:86,left:"50%",background:"rgba(20,20,20,0.95)",color:"#fff",borderRadius:24,padding:"10px 22px",fontWeight:700,fontSize:14,zIndex:500,pointerEvents:"none",whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",animation:"toastIn .3s ease"}}>{toast}</div>}

        {/* BOTTOM NAV */}
        <div style={{background:"rgba(4,4,14,0.98)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-around",padding:"10px 0 calc(18px + env(safe-area-inset-bottom))",flexShrink:0,zIndex:100}}>
          {NAV.map(({key,icon,label,special})=>(
            <button key={key} onClick={()=>setTab(key)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,flex:1}}>
              {special?(
                <div style={{width:44,height:44,background:`linear-gradient(135deg,${Saffron},${SaffronD})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginTop:-14,boxShadow:`0 0 20px rgba(245,158,11,0.5)`,color:"#1a1a2e",fontWeight:900}}>{icon}</div>
              ):key==="account"&&user?(
                <div style={{width:tab===key?28:24,height:tab===key?28:24,borderRadius:"50%",background:`linear-gradient(135deg,${Saffron},${SaffronD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:tab===key?13:11,fontWeight:900,color:"#1a1a2e",border:tab===key?`2px solid ${Saffron}`:"none",boxShadow:tab===key?`0 0 12px rgba(245,158,11,0.5)`:"none",transition:"all .15s"}}>
                  {user.name[0].toUpperCase()}
                </div>
              ):(
                <span style={{fontSize:tab===key?23:19,color:tab===key?Saffron:"rgba(255,255,255,0.28)",transition:"all .15s",filter:tab===key?`drop-shadow(0 0 8px ${Saffron}80)`:"none"}}>{icon}</span>
              )}
              <span style={{fontSize:10,fontWeight:700,color:tab===key?Saffron:"rgba(255,255,255,0.28)",letterSpacing:.3}}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {authProp&&<AuthModal onClose={()=>setAuthProp(null)} onSuccess={handleAuthSuccess} property={authProp}/>}
      {contactProp&&user&&<ContactSheet property={contactProp} user={user} onClose={()=>setContactProp(null)}/>}
    </>
  );
}
