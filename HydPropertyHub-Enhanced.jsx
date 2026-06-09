import { useState, useRef, useEffect, useCallback } from "react";

const GFONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
const Saffron = "#f59e0b";
const SaffronD = "#e85d04";
const Teal = "#0d9488";

// Sample property data
const PROPERTIES = [
  { id:1, title:"Glass Tower Penthouse", locality:"HITEC City", price:"₹2.2 Cr", rawPrice:22000000, bhk:4, sqft:3800, bath:4, type:"Penthouse", status:"Ready to Move", builder:"Prestige Group", rera:"P02400001234", phone:"+91 98765 43210", tag:"LUXURY", tagColor:"#a855f7", tagBg:"rgba(168,85,247,0.18)", amenities:["Private Pool","Sky Lounge","EV Charging","Concierge","Smart Home"], highlights:["Panoramic 360° city view","40th floor sky villa","Italian marble throughout","Private terrace 800 sqft"], facing:"East", furnishing:"Semi-Furnished", parking:2, postedBy:"Builder", postedDaysAgo:2, verified:true, featured:true, commission:true, pricePerSqft:5789, possession:"Immediate", likes:847, views:12400, video:"https://www.w3schools.com/html/mov_bbb.mp4", images:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85","https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"] },
  { id:2, title:"Serene 3BHK Villa", locality:"Gachibowli", price:"₹85 L", rawPrice:8500000, bhk:3, sqft:2100, bath:3, type:"Villa", status:"Ready to Move", builder:"Aparna Constructions", rera:"P02400003456", phone:"+91 87654 32109", tag:"HOT DEAL", tagColor:"#ef4444", tagBg:"rgba(239,68,68,0.18)", amenities:["Pool","Gym","Club House","24/7 Security","Garden"], highlights:["Corner villa with garden","Durgam Cheruvu views","Gated community 200+","School & hospital nearby"], facing:"North-East", furnishing:"Unfurnished", parking:2, postedBy:"Owner", postedDaysAgo:1, verified:true, featured:true, commission:true, pricePerSqft:4047, possession:"Immediate", likes:423, views:7800, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", images:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85","https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=900&q=85"] },
  { id:3, title:"Smart 2BHK Flat", locality:"Miyapur", price:"₹48 L", rawPrice:4800000, bhk:2, sqft:1150, bath:2, type:"Apartment", status:"Under Construction", builder:"Vasavi Developers", rera:"P02400002345", phone:"+91 76543 21098", tag:"NEW LAUNCH", tagColor:"#10b981", tagBg:"rgba(16,185,129,0.18)", amenities:["Metro Access","Gym","Kids Zone","Power Backup","Solar Panels"], highlights:["5 min to Miyapur Metro","Possession Dec 2025","RERA approved","Zero brokerage"], facing:"West", furnishing:"Unfurnished", parking:1, postedBy:"Builder", postedDaysAgo:3, verified:true, featured:false, commission:true, pricePerSqft:4173, possession:"Dec 2025", likes:234, views:5300, video:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", images:["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85","https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=85"] },
];

export default function HydPropertyHub() {
  // ========== STATE ==========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000000,
    location: "",
    bhk: "",
    type: "",
    status: ""
  });

  const [touchStart, setTouchStart] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const containerRef = useRef(null);

  // ========== FILTER PROPERTIES ==========
  const filteredProperties = PROPERTIES.filter(p => {
    if (p.rawPrice < filters.minPrice || p.rawPrice > filters.maxPrice) return false;
    if (filters.location && !p.locality.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.bhk && p.bhk !== parseInt(filters.bhk)) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    return true;
  });

  const currentProperty = filteredProperties[currentIndex];

  // ========== SWIPE HANDLERS ==========
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const offset = e.touches[0].clientX - touchStart;
    setSwipeOffset(offset);
    setSwipeDirection(offset > 0 ? 'right' : 'left');
  };

  const handleTouchEnd = () => {
    if (!touchStart) return;

    if (Math.abs(swipeOffset) > 100) {
      if (swipeOffset > 0) {
        // Right swipe - SAVE
        handleSave();
      } else {
        // Left swipe - SKIP
        handleSkip();
      }
    }

    setTouchStart(null);
    setSwipeOffset(0);
    setSwipeDirection(null);
  };

  const handleSave = () => {
    if (currentProperty && !savedProperties.find(p => p.id === currentProperty.id)) {
      setSavedProperties([...savedProperties, currentProperty]);
      showToast(`💝 Saved: ${currentProperty.title}`);
    }
    handleSkip();
  };

  const handleSkip = () => {
    if (currentIndex < filteredProperties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      showToast("🎉 End of properties! Filters applied.");
    }
  };

  const showToast = (msg) => {
    console.log(msg);
  };

  // ========== KEYBOARD SHORTCUTS ==========
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handleSkip();
      if (e.key === "ArrowRight") handleSave();
      if (e.key === "Escape") {
        setShowFilters(false);
        setShowSaved(false);
        setShowAuth(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, filteredProperties.length]);

  // ========== CSS ==========
  const css = `
    @import url('${GFONTS}');
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      margin: 0;
      padding: 0;
    }
    
    body {
      background: #0a0e27;
      font-family: 'DM Sans', sans-serif;
      overscroll-behavior: none;
      color: white;
    }
    
    input, select, textarea, button {
      font-family: 'DM Sans', sans-serif;
    }
    
    input::placeholder, textarea::placeholder {
      color: rgba(255, 255, 255, 0.25);
    }
    
    select option {
      background: #111;
      color: #fff;
    }
    
    ::-webkit-scrollbar {
      display: none;
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes swipeRight {
      to { transform: translateX(500px) rotate(20deg); opacity: 0; }
    }
    
    @keyframes swipeLeft {
      to { transform: translateX(-500px) rotate(-20deg); opacity: 0; }
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: linear-gradient(135deg, #1a1f3a 0%, #0f1428 100%);
      border-bottom: 1px solid rgba(245, 158, 11, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
      animation: slideDown 0.3s ease;
    }
    
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: white;
    }
    
    .logo-accent {
      color: ${Saffron};
    }
    
    .header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .btn-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: ${Saffron};
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .btn-icon:hover {
      background: rgba(245, 158, 11, 0.2);
      transform: scale(1.05);
    }
    
    .btn-icon.active {
      background: ${Saffron};
      color: #1a1a2e;
    }
    
    .swipe-container {
      position: relative;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      perspective: 1000px;
      overflow: hidden;
      min-height: 100vh;
    }
    
    .card {
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, #1a1f3a 0%, #0f1428 100%);
      border-radius: 0;
      overflow: hidden;
      position: relative;
      cursor: grab;
      user-select: none;
      display: flex;
      flex-direction: column;
      touch-action: none;
      animation: slideUp 0.4s ease;
    }
    
    .card:active {
      cursor: grabbing;
    }
    
    .card-image {
      flex: 1;
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
    }
    
    .card-image::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
    }
    
    .card-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 30px 20px 20px;
      color: white;
      z-index: 10;
    }
    
    .card-title {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 8px;
      font-family: 'Playfair Display', serif;
    }
    
    .card-location {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 12px;
    }
    
    .card-price {
      font-size: 32px;
      font-weight: 900;
      color: ${Saffron};
      margin-bottom: 12px;
    }
    
    .card-specs {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    
    .spec-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .card-highlights {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
      margin-bottom: 12px;
    }
    
    .card-actions {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 20px;
      z-index: 20;
    }
    
    .action-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(245, 158, 11, 0.3);
      color: ${Saffron};
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .action-btn:hover {
      background: rgba(245, 158, 11, 0.2);
      transform: scale(1.1);
    }
    
    .action-btn:active {
      transform: scale(0.95);
    }
    
    .swipe-hint {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 40px;
      opacity: 0.6;
      font-size: 12px;
      z-index: 15;
    }
    
    .swipe-hint span {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1a1f3a;
      border-radius: 16px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 1001;
      animation: slideUp 0.3s ease;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }
    
    .modal-title {
      font-size: 24px;
      font-weight: 900;
      margin-bottom: 20px;
      color: white;
    }
    
    .filter-group {
      margin-bottom: 20px;
    }
    
    .filter-label {
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px;
      display: block;
    }
    
    .filter-input, .filter-select {
      width: 100%;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: 8px;
      color: white;
      font-size: 14px;
    }
    
    .filter-input:focus, .filter-select:focus {
      outline: none;
      border-color: ${Saffron};
      background: rgba(245, 158, 11, 0.08);
    }
    
    .filter-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, ${Saffron}, ${SaffronD});
      color: #1a1a2e;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
    }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    
    .saved-list {
      display: grid;
      gap: 16px;
    }
    
    .saved-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .saved-item:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: ${Saffron};
    }
    
    .saved-item-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .saved-item-price {
      font-size: 18px;
      font-weight: 900;
      color: ${Saffron};
      margin-bottom: 8px;
    }
    
    .saved-item-specs {
      display: flex;
      gap: 12px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    .empty-text {
      font-size: 14px;
      margin-bottom: 20px;
    }
  `;

  // ========== RENDER ==========
  return (
    <>
      <style>{css}</style>
      
      {/* HEADER */}
      <div className="header">
        <div className="logo">
          Hyd<span className="logo-accent">Property</span>
        </div>
        <div className="header-actions">
          <button 
            className={`btn-icon ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            title="Filters (F)"
          >
            ⚙️
          </button>
          <button 
            className={`btn-icon ${showSaved ? 'active' : ''}`}
            onClick={() => setShowSaved(!showSaved)}
            title="Saved Properties"
          >
            ❤️ {savedProperties.length > 0 && savedProperties.length}
          </button>
          <button 
            className={`btn-icon ${showAuth ? 'active' : ''}`}
            onClick={() => setShowAuth(!showAuth)}
            title="Account"
          >
            {user ? '👤' : '🔓'}
          </button>
        </div>
      </div>

      {/* MAIN SWIPE AREA */}
      <div 
        className="swipe-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentProperty ? (
          <div 
            className="card"
            style={{
              transform: `translateX(${swipeOffset}px) rotate(${swipeOffset / 100}deg)`,
              opacity: 1 - Math.abs(swipeOffset) / 500,
              transition: touchStart ? 'none' : 'all 0.3s ease'
            }}
          >
            <div 
              className="card-image"
              style={{
                backgroundImage: `url('${currentProperty.images[0]}')`
              }}
            />
            
            <div className="card-info">
              <div className="card-title">{currentProperty.title}</div>
              <div className="card-location">📍 {currentProperty.locality}</div>
              <div className="card-price">{currentProperty.price}</div>
              
              <div className="card-specs">
                {currentProperty.bhk > 0 && <div className="spec-badge">{currentProperty.bhk} BHK</div>}
                <div className="spec-badge">{currentProperty.sqft} sqft</div>
                <div className="spec-badge">{currentProperty.type}</div>
                <div className="spec-badge">{currentProperty.status}</div>
              </div>
              
              <div className="card-highlights">
                {currentProperty.highlights.slice(0, 2).map((h, i) => (
                  <div key={i}>• {h}</div>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="action-btn"
                onClick={() => window.location.href = `tel:${currentProperty.phone}`}
                title="Call Builder"
              >
                📞
              </button>
              <button 
                className="action-btn"
                onClick={() => setShowAuth(true)}
                title="Details"
              >
                ℹ️
              </button>
              <button 
                className="action-btn"
                onClick={handleSave}
                title="Save (Right swipe)"
              >
                ❤️
              </button>
            </div>

            <div className="swipe-hint">
              <span>← Skip</span>
              <span>Save →</span>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'rgba(255,255,255,0.6)' }}>
            No properties found. Try adjusting filters! 🔍
          </div>
        )}
      </div>

      {/* FILTERS MODAL */}
      {showFilters && (
        <>
          <div className="modal-overlay" onClick={() => setShowFilters(false)} />
          <div className="modal">
            <button className="close-btn" onClick={() => setShowFilters(false)}>✕</button>
            <div className="modal-title">🔍 Filters</div>
            
            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <input 
                type="range"
                min="0"
                max="100000000"
                step="500000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                className="filter-input"
              />
              <div style={{marginTop: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)'}}>
                Up to ₹{(filters.maxPrice / 10000000).toFixed(1)} Cr
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input 
                type="text"
                placeholder="Search location..."
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">BHK</label>
              <select 
                value={filters.bhk}
                onChange={(e) => setFilters({...filters, bhk: e.target.value})}
                className="filter-select"
              >
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="filter-select"
              >
                <option value="">Any</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="filter-select"
              >
                <option value="">Any</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Available">Available</option>
              </select>
            </div>

            <div className="filter-buttons">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setFilters({
                    minPrice: 0,
                    maxPrice: 100000000,
                    location: "",
                    bhk: "",
                    type: "",
                    status: ""
                  });
                  setCurrentIndex(0);
                }}
              >
                Reset
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setCurrentIndex(0);
                  setShowFilters(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* SAVED PROPERTIES MODAL */}
      {showSaved && (
        <>
          <div className="modal-overlay" onClick={() => setShowSaved(false)} />
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSaved(false)}>✕</button>
            <div className="modal-title">❤️ Saved Properties ({savedProperties.length})</div>
            
            {savedProperties.length > 0 ? (
              <div className="saved-list">
                {savedProperties.map(property => (
                  <div 
                    key={property.id}
                    className="saved-item"
                    onClick={() => {
                      setCurrentIndex(filteredProperties.findIndex(p => p.id === property.id));
                      setShowSaved(false);
                    }}
                  >
                    <div className="saved-item-title">{property.title}</div>
                    <div className="saved-item-price">{property.price}</div>
                    <div className="saved-item-specs">
                      <span>📍 {property.locality}</span>
                      <span>{property.bhk} BHK</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">😔</div>
                <div className="empty-text">No saved properties yet.<br />Start swiping and save your favorites!</div>
                <button 
                  className="btn-primary"
                  onClick={() => setShowSaved(false)}
                >
                  Back to Browse
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ACCOUNT/AUTH MODAL */}
      {showAuth && (
        <>
          <div className="modal-overlay" onClick={() => setShowAuth(false)} />
          <div className="modal">
            <button className="close-btn" onClick={() => setShowAuth(false)}>✕</button>
            <div className="modal-title">👤 Account</div>
            
            {user ? (
              <div>
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '16px', fontWeight: '600', marginBottom: '4px'}}>Welcome, {user.name}!</div>
                  <div style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)'}}>{user.email}</div>
                  <div style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)'}}>Role: {user.role}</div>
                </div>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setUser(null);
                    setShowAuth(false);
                  }}
                  style={{width: '100%', marginBottom: '10px'}}
                >
                  Logout
                </button>
                <button 
                  className="btn-primary"
                  style={{width: '100%'}}
                  onClick={() => {
                    const phone = currentProperty?.phone;
                    if (phone) {
                      window.location.href = `tel:${phone}`;
                    }
                  }}
                >
                  Contact Builder
                </button>
              </div>
            ) : (
              <div>
                <div className="filter-group">
                  <label className="filter-label">Name</label>
                  <input 
                    type="text"
                    placeholder="Your name"
                    className="filter-input"
                    id="authName"
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Email</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    className="filter-input"
                    id="authEmail"
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Role</label>
                  <select className="filter-select" id="authRole">
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Agent">Agent</option>
                  </select>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    const name = document.getElementById('authName').value;
                    const email = document.getElementById('authEmail').value;
                    const role = document.getElementById('authRole').value;
                    if (name && email) {
                      setUser({name, email, role});
                      setShowAuth(false);
                    }
                  }}
                  style={{width: '100%'}}
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
