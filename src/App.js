import { useState, useEffect, useRef } from "react";

const WORKER_URL = "https://lunchswipe-backend.jakob-thomsgard.workers.dev";

// ── Restaurant data with real hours ──────────────────────────
const RESTAURANTS = [
  {
    id: 1,
    name: "Spoonery",
    cuisine: "Swedish",
    distance: 5,
    address: "Västergatan 11",
    rating: 4.8,
    emoji: "🍖",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Spoonery+Malmö",
    hours: {
      1: [1130, 2100],
      2: [1130, 2100],
      3: [1130, 2100],
      4: [1130, 2100],
      5: [1130, 2100],
      6: [1130, 2100],
      0: [1130, 2100],
    },
  },
  {
    id: 2,
    name: "Two Forks Mat & Vin",
    cuisine: "International",
    distance: 7,
    address: "Gibraltargatan 3",
    rating: 4.9,
    emoji: "🍽️",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Two+Forks+Malmö",
    hours: {
      1: [1130, 1400],
      2: [1130, 1400],
      3: [1130, 2200],
      4: [1130, 2200],
      5: [1130, 2200],
      6: [1200, 2200],
      0: null,
    },
  },
  {
    id: 3,
    name: "Masala & More",
    cuisine: "Indian",
    distance: 3,
    address: "Baltzarsgatan 12",
    rating: 4.8,
    emoji: "🍛",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Masala+More+Malmö",
    hours: {
      1: [1100, 2130],
      2: [1100, 2130],
      3: [1100, 2130],
      4: [1100, 2130],
      5: [1100, 2300],
      6: [1200, 2300],
      0: [1230, 2030],
    },
  },
  {
    id: 4,
    name: "Quan",
    cuisine: "Asian Fusion",
    distance: 5,
    address: "Mäster Johansgatan 15",
    rating: 4.6,
    emoji: "🥢",
    veggie: false,
    mapsUrl: "https://maps.google.com/?q=Quan+Malmö",
    hours: {
      1: [1130, 2300],
      2: [1130, 2300],
      3: [1130, 2300],
      4: [1130, 2300],
      5: [1130, 2400],
      6: null,
      0: null,
    },
  },
  {
    id: 5,
    name: "Bullen – Två Krögare",
    cuisine: "Swedish",
    distance: 8,
    address: "Storgatan 35",
    rating: 4.5,
    emoji: "🥩",
    veggie: false,
    mapsUrl: "https://maps.google.com/?q=Bullen+Malmö",
    hours: {
      1: [1130, 100],
      2: [1130, 100],
      3: [1130, 100],
      4: [1130, 100],
      5: [1130, 100],
      6: [1200, 100],
      0: [1200, 2200],
    },
  },
  {
    id: 6,
    name: "Siesta",
    cuisine: "Swedish",
    distance: 4,
    address: "Hjorttackegatan 1",
    rating: 4.5,
    emoji: "🍷",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Siesta+Malmö",
    hours: {
      1: null,
      2: null,
      3: [1130, 2300],
      4: [1130, 2300],
      5: [1130, 2400],
      6: [1300, 2400],
      0: null,
    },
  },
  {
    id: 7,
    name: "Bistro Royal",
    cuisine: "Swedish",
    distance: 6,
    address: "Centralplan 6",
    rating: 4.1,
    emoji: "🥐",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Bistro+Royal+Malmö",
    hours: {
      1: [1100, 2100],
      2: [1100, 2200],
      3: [1100, 2200],
      4: [1100, 2200],
      5: [1100, 2230],
      6: null,
      0: null,
    },
  },
  {
    id: 8,
    name: "Ruths",
    cuisine: "International",
    distance: 5,
    address: "Mäster Johansgatan 11",
    rating: 4.3,
    emoji: "🍞",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Ruths+Malmö",
    hours: {
      1: [700, 2300],
      2: [700, 2300],
      3: [700, 2300],
      4: [700, 2300],
      5: [700, 2400],
      6: [700, 2400],
      0: [700, 1600],
    },
  },
  {
    id: 9,
    name: "Yemen Restaurang",
    cuisine: "Middle Eastern",
    distance: 9,
    address: "Drottninggatan 36",
    rating: 4.6,
    emoji: "🫕",
    veggie: false,
    mapsUrl: "https://maps.google.com/?q=Yemen+Restaurang+Malmö",
    hours: {
      1: [1100, 2200],
      2: [1100, 2200],
      3: [1100, 2200],
      4: [1100, 2200],
      5: [1100, 2200],
      6: [1100, 2200],
      0: [1100, 2200],
    },
  },
  {
    id: 10,
    name: "Clemens Kött & Husman",
    cuisine: "Swedish",
    distance: 7,
    address: "Gibraltargatan 6",
    rating: 4.6,
    emoji: "🥩",
    veggie: false,
    mapsUrl: "https://maps.google.com/?q=Clemens+Malmö",
    hours: {
      1: [1100, 2000],
      2: [1100, 2000],
      3: [1100, 2000],
      4: [1100, 2000],
      5: [1100, 2100],
      6: [1100, 2100],
      0: [1100, 1700],
    },
  },
  {
    id: 11,
    name: "Marie Antoinette",
    cuisine: "French",
    distance: 8,
    address: "Drottningtorget 6",
    rating: 4.4,
    emoji: "🥂",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=Marie+Antoinette+Malmö",
    hours: {
      1: null,
      2: null,
      3: [1130, 1400],
      4: [1130, 1400],
      5: [1130, 1400],
      6: null,
      0: null,
    },
  },
  {
    id: 12,
    name: "SMAK",
    cuisine: "Swedish",
    distance: 12,
    address: "S:t Johannesgatan 7",
    rating: 4.4,
    emoji: "🐟",
    veggie: true,
    mapsUrl: "https://maps.google.com/?q=SMAK+Malmö",
    hours: {
      1: [1100, 1600],
      2: [1100, 1700],
      3: [1100, 1900],
      4: [1100, 1700],
      5: [1100, 1700],
      6: [1100, 1700],
      0: [1100, 1700],
    },
  },
];

const CUISINES = [...new Set(RESTAURANTS.map((r) => r.cuisine))];
const DISTANCE_OPTIONS = [
  { label: "≤5 min", value: 5 },
  { label: "≤10 min", value: 10 },
  { label: "Any", value: 999 },
];

// ── Time helpers ─────────────────────────────────────────────
function toHHMM(d) {
  return d.getHours() * 100 + d.getMinutes();
}

function isOpenAt(restaurant, date) {
  const day = date.getDay();
  const slot = restaurant.hours[day];
  if (!slot) return false;
  const t = toHHMM(date);
  const [open, close] = slot;
  if (close <= open) return t >= open || t < close; // crosses midnight
  return t >= open && t < close;
}

function formatHours(slot) {
  if (!slot) return "Closed";
  const fmt = (n) =>
    `${String(Math.floor(n / 100)).padStart(2, "0")}:${String(n % 100).padStart(
      2,
      "0"
    )}`;
  return `${fmt(slot[0])}–${fmt(slot[1])}`;
}

function todaySlot(r) {
  return r.hours[new Date().getDay()];
}

// ── Backend via Anthropic API (shared sessions) ──────────────
const API_BASE = "https://api.anthropic.com/v1/messages";

// We use the Anthropic API as a lightweight KV store by encoding
// session state into a structured prompt/response cycle.
// For real persistence we use window.storage (persistent artifact storage).

async function loadSession(code) {
      try  {
        const response = await fetch(`${WORKER_URL}/api/session/${code}`);
            if (!response.ok) return null;
                return await response.json();
                  }
                } catch {
                        return null;
                          }
                          }
                  

async function saveSession(code, data) {
  try {
    await window.storage.set("session:" + code, JSON.stringify(data), true);
    return true;
  } catch {
    return false;
  }
}

function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// ── Helpers ──────────────────────────────────────────────────
function Stars({ n }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: 12 }}>
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.round(n) ? "★" : "☆"
      ).join("")}{" "}
      {n}
    </span>
  );
}

function OpenBadge({ restaurant, checkTime }) {
  const open = isOpenAt(restaurant, checkTime);
  const slot = restaurant.hours[checkTime.getDay()];
  return (
    <span
      style={{
        background: open ? "#dcfce7" : "#fee2e2",
        color: open ? "#16a34a" : "#dc2626",
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {open ? "🟢 Open" : "🔴 Closed"} · {formatHours(slot)}
    </span>
  );
}

// ── Spin Wheel ───────────────────────────────────────────────
function SpinWheel({ options }) {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const angleRef = useRef(0);
  const colors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff922b",
    "#cc5de8",
    "#20c997",
    "#f06595",
  ];

  function draw(angle) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2,
      cy = canvas.height / 2,
      r = cx - 10;
    const arc = (2 * Math.PI) / options.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    options.forEach((opt, i) => {
      const s = angle + i * arc,
        e = s + arc;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, s, e);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.max(10, 13 - options.length)}px sans-serif`;
      ctx.shadowColor = "#0005";
      ctx.shadowBlur = 4;
      ctx.fillText(
        opt.name.length > 14 ? opt.name.slice(0, 13) + "…" : opt.name,
        r - 8,
        5
      );
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  useEffect(() => {
    draw(0);
  }, []);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    const total = 2 * Math.PI * (8 + Math.random() * 6),
      dur = 4000,
      start = performance.now(),
      sa = angleRef.current;
    function frame(now) {
      const t = Math.min((now - start) / dur, 1),
        ease = 1 - Math.pow(1 - t, 3);
      const cur = sa + total * ease;
      angleRef.current = cur;
      draw(cur);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setSpinning(false);
        const arc = (2 * Math.PI) / options.length;
        const norm = ((cur % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const ptr = (2 * Math.PI - norm + (3 * Math.PI) / 2) % (2 * Math.PI);
        setWinner(options[Math.floor(ptr / arc) % options.length]);
      }
    }
    requestAnimationFrame(frame);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          style={{ borderRadius: "50%", boxShadow: "0 4px 24px #0003" }}
        />
        <div
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 26,
            filter: "drop-shadow(0 2px 2px #0004)",
          }}
        >
          ▼
        </div>
      </div>
      <br />
      {!winner && (
        <button
          onClick={spin}
          disabled={spinning}
          style={{
            marginTop: 16,
            padding: "12px 32px",
            fontSize: 18,
            fontWeight: 700,
            background: spinning ? "#aaa" : "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            cursor: spinning ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px #ff6b6b55",
          }}
        >
          {spinning ? "Spinning…" : "🎰 Spin!"}
        </button>
      )}
      {winner && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 20px #0002",
          }}
        >
          <div style={{ fontSize: 40 }}>{winner.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>
            {winner.name}
          </div>
          <div style={{ color: "#666", marginTop: 4, fontSize: 13 }}>
            {winner.address}
          </div>
          <a
            href={winner.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "8px 20px",
              background: "#4d96ff",
              color: "#fff",
              borderRadius: 50,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            📍 Open in Maps
          </a>
          <br />
          <button
            onClick={() => setWinner(null)}
            style={{
              marginTop: 10,
              background: "none",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Spin again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Swipe Card ───────────────────────────────────────────────
function SwipeCard({ restaurant, onSwipe, checkTime }) {
  const [drag, setDrag] = useState({ x: 0, y: 0, dragging: false });
  const startRef = useRef(null);
  function onPD(e) {
    startRef.current = { x: e.clientX - drag.x, y: e.clientY - drag.y };
    setDrag((d) => ({ ...d, dragging: true }));
  }
  function onPM(e) {
    if (!drag.dragging) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: e.clientY - startRef.current.y,
      dragging: true,
    });
  }
  function onPU() {
    if (!drag.dragging) return;
    if (drag.x > 80) onSwipe("yes");
    else if (drag.x < -80) onSwipe("no");
    setDrag({ x: 0, y: 0, dragging: false });
  }
  const rotation = drag.x / 20;
  const yO = Math.min(1, drag.x / 80),
    nO = Math.min(1, -drag.x / 80);
  const slot = todaySlot(restaurant);
  const open = isOpenAt(restaurant, checkTime);

  return (
    <div
      onPointerDown={onPD}
      onPointerMove={onPM}
      onPointerUp={onPU}
      onPointerLeave={onPU}
      style={{
        touchAction: "none",
        userSelect: "none",
        cursor: drag.dragging ? "grabbing" : "grab",
        transform: `translate(${drag.x}px,${drag.y}px) rotate(${rotation}deg)`,
        transition: drag.dragging ? "none" : "transform 0.3s",
        position: "relative",
        width: 300,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 40px #0002",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "6px 16px",
          background: "#6bcb77",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 20,
          opacity: yO,
          transform: "rotate(-15deg)",
          zIndex: 10,
        }}
      >
        YES 👍
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "6px 16px",
          background: "#ff6b6b",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 20,
          opacity: nO,
          transform: "rotate(15deg)",
          zIndex: 10,
        }}
      >
        NOPE 👎
      </div>
      <div style={{ padding: "28px 28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 6 }}>{restaurant.emoji}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>
          {restaurant.name}
        </div>
        <div style={{ color: "#999", fontSize: 13, marginTop: 3 }}>
          {restaurant.address}
        </div>
        <div style={{ marginTop: 8 }}>
          <Stars n={restaurant.rating} />
        </div>
        <div style={{ marginTop: 10 }}>
          <OpenBadge restaurant={restaurant} checkTime={checkTime} />
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#f3f4f6",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 12,
              color: "#555",
            }}
          >
            🍽️ {restaurant.cuisine}
          </span>
          <span
            style={{
              background: "#f3f4f6",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 12,
              color: "#555",
            }}
          >
            🚶 ~{restaurant.distance} min
          </span>
          {restaurant.veggie && (
            <span
              style={{
                background: "#dcfce7",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 12,
                color: "#16a34a",
              }}
            >
              🥗 Veggie
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Time picker ──────────────────────────────────────────────
function TimePicker({ value, onChange }) {
  const h = value.getHours().toString().padStart(2, "0");
  const m = value.getMinutes().toString().padStart(2, "0");
  return (
    <input
      type="time"
      value={`${h}:${m}`}
      onChange={(e) => {
        const [hh, mm] = e.target.value.split(":").map(Number);
        const d = new Date(value);
        d.setHours(hh, mm, 0, 0);
        onChange(d);
      }}
      style={{
        padding: "8px 14px",
        borderRadius: 12,
        border: "2px solid #ff6b6b",
        fontSize: 15,
        fontWeight: 600,
        color: "#ff6b6b",
        background: "#fff5f5",
        outline: "none",
      }}
    />
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [playerCount, setPlayerCount] = useState(2);
  const [joinCode, setJoinCode] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinError, setJoinError] = useState("");
  const [saving, setSaving] = useState(false);

  // filters
  const [filterCuisines, setFilterCuisines] = useState([]);
  const [filterDistance, setFilterDistance] = useState(999);
  const [filterVeggie, setFilterVeggie] = useState(false);
  const [filterOpenMode, setFilterOpenMode] = useState("any"); // "any" | "now" | "time"
  const [filterTime, setFilterTime] = useState(() => new Date());

  // session
  const [myName, setMyName] = useState("");
  const [myCode, setMyCode] = useState("");
  const [deck, setDeck] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [votes, setVotes] = useState({});
  const [matches, setMatches] = useState([]);
  const [showWheel, setShowWheel] = useState(false);
  const [waitStatus, setWaitStatus] = useState("");
  const pollRef = useRef(null);

  // The effective time to check for "open" in swipe view
  const checkTime =
    filterOpenMode === "now"
      ? new Date()
      : filterOpenMode === "time"
      ? filterTime
      : new Date();

  function getFilteredRestaurants(overrideTime) {
    const t =
      overrideTime || (filterOpenMode === "time" ? filterTime : new Date());
    return RESTAURANTS.filter((r) => {
      if (filterCuisines.length && !filterCuisines.includes(r.cuisine))
        return false;
      if (r.distance > filterDistance) return false;
      if (filterVeggie && !r.veggie) return false;
      if (filterOpenMode !== "any" && !isOpenAt(r, t)) return false;
      return true;
    });
  }

  const filtered = getFilteredRestaurants();

  async function createSession() {
    setSaving(true);
    const code = generateCode();
    const deckIds = filtered.map((r) => r.id);
    const session = {
      code,
      playerCount,
      players: { [playerName]: {} },
      deck: deckIds,
      checkTime: checkTime.toISOString(),
    };
    await saveSession(code, session);
    setSaving(false);
    setMyName(playerName);
    setMyCode(code);
    setDeck(RESTAURANTS.filter((r) => deckIds.includes(r.id)));
    setCardIdx(0);
    setVotes({});
    setScreen("swipe");
  }

  async function joinSession() {
    const code = joinCode.toUpperCase();
    const session = await loadSession(code);
    if (!session) {
      setJoinError("Session not found. Check the code!");
      return;
    }
    if (Object.keys(session.players).length >= session.playerCount) {
      setJoinError("Session is full!");
      return;
    }
    if (session.players[joinName]) {
      setJoinError("Name already taken!");
      return;
    }
    session.players[joinName] = {};
    await saveSession(code, session);
    setMyName(joinName);
    setMyCode(code);
    const deckRestaurants = RESTAURANTS.filter((r) =>
      session.deck.includes(r.id)
    );
    setDeck(deckRestaurants);
    setCardIdx(0);
    setVotes({});
    setScreen("swipe");
  }

  async function swipe(direction) {
    const restaurant = deck[cardIdx];
    const newVotes = { ...votes, [restaurant.id]: direction === "yes" };
    setVotes(newVotes);
    const next = cardIdx + 1;
    if (next >= deck.length) {
      const session = await loadSession(myCode);
      if (session) {
        session.players[myName] = newVotes;
        await saveSession(myCode, session);
      }
      setScreen("waiting");
      startPolling(newVotes);
    } else {
      setCardIdx(next);
    }
  }

  function startPolling(myVotes) {
    pollRef.current = setInterval(async () => {
      const session = await loadSession(myCode);
      if (!session) return;
      const players = Object.keys(session.players);
      const done = players.filter(
        (p) => Object.keys(session.players[p]).length > 0
      );
      setWaitStatus(`${done.length}/${session.playerCount} done`);
      if (done.length >= session.playerCount) {
        clearInterval(pollRef.current);
        const matched = RESTAURANTS.filter(
          (r) =>
            session.deck.includes(r.id) &&
            Object.values(session.players).every((p) => p[r.id] === true)
        );
        setMatches(matched);
        setScreen("result");
      }
    }, 2000);
  }

  useEffect(() => () => clearInterval(pollRef.current), []);

  const toggleCuisine = (c) =>
    setFilterCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  function resetAll() {
    setScreen("home");
    setMatches([]);
    setShowWheel(false);
    setPlayerName("");
    setJoinName("");
    setJoinCode("");
    setJoinError("");
    setFilterCuisines([]);
    setFilterDistance(999);
    setFilterVeggie(false);
    setFilterOpenMode("any");
    setFilterTime(new Date());
  }

  const bg = "linear-gradient(135deg,#fff5f5 0%,#fff0e0 50%,#f0f8ff 100%)";
  const card = {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 2px 16px #0001",
    padding: 24,
  };
  const btn = (active, color = "#ff6b6b") => ({
    flex: 1,
    padding: "10px 0",
    borderRadius: 12,
    border: "2px solid",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    borderColor: active ? color : "#eee",
    background: active ? "#fff5f5" : "#fff",
    color: active ? color : "#aaa",
  });

  // ── HOME ─────────────────────────────────────────────────
  if (screen === "home")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 4 }}>🍽️</div>
        <h1 style={{ fontSize: 34, fontWeight: 900, margin: 0, color: "#111" }}>
          LunchSwipe
        </h1>
        <p
          style={{
            color: "#aaa",
            marginTop: 6,
            marginBottom: 40,
            fontSize: 14,
          }}
        >
          Malmö's tastiest decision engine
        </p>
        <button
          onClick={() => setScreen("create")}
          style={{
            width: 260,
            padding: "16px 0",
            fontSize: 17,
            fontWeight: 700,
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            cursor: "pointer",
            marginBottom: 14,
            boxShadow: "0 4px 16px #ff6b6b44",
          }}
        >
          🎯 Create Session
        </button>
        <button
          onClick={() => setScreen("join")}
          style={{
            width: 260,
            padding: "16px 0",
            fontSize: 17,
            fontWeight: 700,
            background: "#fff",
            color: "#ff6b6b",
            border: "2px solid #ff6b6b",
            borderRadius: 50,
            cursor: "pointer",
          }}
        >
          🔗 Join Session
        </button>
      </div>
    );

  // ── CREATE ───────────────────────────────────────────────
  if (screen === "create")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 32,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <button
          onClick={() => setScreen("home")}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ←
        </button>
        <h2 style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 800 }}>
          Create a Session
        </h2>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <label style={{ fontWeight: 600, fontSize: 14, color: "#555" }}>
            Your name
          </label>
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="e.g. Jakob"
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 20,
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #eee",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <label style={{ fontWeight: 600, fontSize: 14, color: "#555" }}>
            Number of players
          </label>
          <div
            style={{ display: "flex", gap: 10, marginTop: 8, marginBottom: 24 }}
          >
            {[2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setPlayerCount(n)}
                style={btn(playerCount === n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (playerName.trim()) setScreen("filter");
            }}
            disabled={!playerName.trim()}
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: 16,
              fontWeight: 700,
              background: playerName.trim() ? "#ff6b6b" : "#eee",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              cursor: playerName.trim() ? "pointer" : "not-allowed",
            }}
          >
            Next: Set Filters →
          </button>
        </div>
      </div>
    );

  // ── FILTER ───────────────────────────────────────────────
  if (screen === "filter")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 32,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <button
          onClick={() => setScreen("create")}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ←
        </button>
        <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800 }}>
          Filters
        </h2>
        <p
          style={{
            color: filtered.length > 0 ? "#888" : "#dc2626",
            marginTop: 0,
            marginBottom: 20,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} match
          {filtered.length === 1 ? "es" : ""} your filters
        </p>
        <div
          style={{
            width: "100%",
            maxWidth: 340,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Open when */}
          <div style={card}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#555",
                marginBottom: 10,
              }}
            >
              🕐 Open when?
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: filterOpenMode === "time" ? 14 : 0,
              }}
            >
              {[
                ["any", "Any time"],
                ["now", "Open now"],
                ["time", "Set time"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setFilterOpenMode(v)}
                  style={btn(filterOpenMode === v)}
                >
                  {l}
                </button>
              ))}
            </div>
            {filterOpenMode === "time" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 13, color: "#888" }}>
                  Show open at:
                </span>
                <TimePicker value={filterTime} onChange={setFilterTime} />
              </div>
            )}
          </div>

          {/* Cuisine */}
          <div style={card}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#555",
                marginBottom: 10,
              }}
            >
              🍜 Cuisine
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CUISINES.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCuisine(c)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: "2px solid",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    borderColor: filterCuisines.includes(c)
                      ? "#ff6b6b"
                      : "#ddd",
                    background: filterCuisines.includes(c) ? "#fff5f5" : "#fff",
                    color: filterCuisines.includes(c) ? "#ff6b6b" : "#777",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div style={card}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#555",
                marginBottom: 10,
              }}
            >
              🚶 Max walk
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {DISTANCE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setFilterDistance(o.value)}
                  style={btn(filterDistance === o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Veggie */}
          <label
            style={{
              ...card,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              padding: "16px 24px",
            }}
          >
            <input
              type="checkbox"
              checked={filterVeggie}
              onChange={(e) => setFilterVeggie(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontWeight: 700, fontSize: 14, color: "#555" }}>
              🥗 Must have veggie options
            </span>
          </label>

          <button
            onClick={createSession}
            disabled={filtered.length === 0 || saving}
            style={{
              padding: "14px 0",
              fontSize: 16,
              fontWeight: 700,
              background: filtered.length && !saving ? "#ff6b6b" : "#eee",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              cursor: filtered.length && !saving ? "pointer" : "not-allowed",
            }}
          >
            {saving
              ? "Creating…"
              : `🚀 Start Swiping! (${filtered.length} spots)`}
          </button>
        </div>
      </div>
    );

  // ── JOIN ─────────────────────────────────────────────────
  if (screen === "join")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 32,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <button
          onClick={() => setScreen("home")}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ←
        </button>
        <h2 style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 800 }}>
          Join a Session
        </h2>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <label style={{ fontWeight: 600, fontSize: 14, color: "#555" }}>
            Session code
          </label>
          <input
            value={joinCode}
            onChange={(e) => {
              setJoinCode(e.target.value.toUpperCase());
              setJoinError("");
            }}
            placeholder="e.g. AB3XY"
            maxLength={5}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 20,
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #eee",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 8,
              outline: "none",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          />
          <label style={{ fontWeight: 600, fontSize: 14, color: "#555" }}>
            Your name
          </label>
          <input
            value={joinName}
            onChange={(e) => {
              setJoinName(e.target.value);
              setJoinError("");
            }}
            placeholder="e.g. Anna"
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 8,
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #eee",
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {joinError && (
            <p style={{ color: "#ff6b6b", fontSize: 13, margin: "4px 0 12px" }}>
              {joinError}
            </p>
          )}
          <button
            onClick={joinSession}
            disabled={!joinCode.trim() || !joinName.trim()}
            style={{
              width: "100%",
              marginTop: 14,
              padding: "14px 0",
              fontSize: 16,
              fontWeight: 700,
              background:
                joinCode.trim() && joinName.trim() ? "#ff6b6b" : "#eee",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              cursor:
                joinCode.trim() && joinName.trim() ? "pointer" : "not-allowed",
            }}
          >
            Join 🎉
          </button>
        </div>
      </div>
    );

  // ── SWIPE ─────────────────────────────────────────────────
  if (screen === "swipe")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 16px",
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: 340, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>
                Hey, {myName}!
              </span>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
                Code: <b style={{ color: "#ff6b6b" }}>{myCode}</b>
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#888" }}>
              {Math.min(cardIdx, deck.length)}/{deck.length}
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "#eee",
              borderRadius: 99,
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(cardIdx / deck.length, 1) * 100}%`,
                background: "#ff6b6b",
                borderRadius: 99,
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>

        {cardIdx < deck.length ? (
          <>
            <p
              style={{
                color: "#aaa",
                fontSize: 12,
                marginBottom: 14,
                marginTop: 0,
              }}
            >
              Swipe or tap buttons ·{" "}
              <b style={{ color: "#ff6b6b" }}>Open now</b> = ready for lunch!
            </p>
            <SwipeCard
              restaurant={deck[cardIdx]}
              onSwipe={swipe}
              checkTime={checkTime}
            />
            <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
              <button
                onClick={() => swipe("no")}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #ff6b6b",
                  fontSize: 22,
                  cursor: "pointer",
                  boxShadow: "0 2px 10px #0001",
                }}
              >
                👎
              </button>
              <button
                onClick={() => swipe("yes")}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #6bcb77",
                  fontSize: 22,
                  cursor: "pointer",
                  boxShadow: "0 2px 10px #0001",
                }}
              >
                👍
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <div style={{ fontSize: 56 }}>✅</div>
            <h2>All done!</h2>
            <p style={{ color: "#888" }}>Waiting for others…</p>
          </div>
        )}
      </div>
    );

  // ── WAITING ───────────────────────────────────────────────
  if (screen === "waiting")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "system-ui,sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 56 }}>⏳</div>
        <h2 style={{ fontWeight: 800 }}>Waiting for others…</h2>
        <div
          style={{
            padding: "16px 32px",
            background: "#fff",
            borderRadius: 16,
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 8,
            color: "#ff6b6b",
            boxShadow: "0 4px 20px #0001",
            margin: "20px 0",
          }}
        >
          {myCode}
        </div>
        {waitStatus && (
          <p style={{ color: "#aaa", fontSize: 14 }}>
            {waitStatus} players done
          </p>
        )}
        <p style={{ color: "#aaa", fontSize: 13, maxWidth: 280 }}>
          Results appear automatically when everyone finishes.
        </p>
        <div style={{ fontSize: 32, marginTop: 16 }}>
          {["🍔", "🍣", "🥙", "🍝"].map((e, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                animation: `bounce ${
                  0.6 + i * 0.15
                }s ease-in-out infinite alternate`,
                margin: "0 4px",
              }}
            >
              {e}
            </span>
          ))}
        </div>
        <style>{`@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-10px)}}`}</style>
      </div>
    );

  // ── RESULT ────────────────────────────────────────────────
  if (screen === "result") {
    if (showWheel)
      return (
        <div
          style={{
            minHeight: "100vh",
            background: bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 32,
            fontFamily: "system-ui,sans-serif",
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 20 }}>
            🎰 Spin to Decide!
          </h2>
          <SpinWheel options={matches} />
          <button
            onClick={() => setShowWheel(false)}
            style={{
              marginTop: 20,
              background: "none",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            ← Back to matches
          </button>
        </div>
      );

    return (
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 32,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 6 }}>
          {matches.length > 0 ? "🎉" : "😅"}
        </div>
        <h2 style={{ fontWeight: 800, fontSize: 24, margin: "0 0 4px" }}>
          {matches.length > 0 ? "It's a Match!" : "No Matches"}
        </h2>
        <p
          style={{
            color: "#888",
            fontSize: 13,
            marginTop: 0,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {matches.length > 0
            ? `${matches.length} place${
                matches.length > 1 ? "s" : ""
              } everyone liked`
            : "Nobody agreed — try again with looser filters!"}
        </p>

        {matches.length === 1 && (
          <div
            style={{
              width: "100%",
              maxWidth: 320,
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 4px 24px #0002",
              padding: 24,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 52 }}>{matches[0].emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>
              {matches[0].name}
            </div>
            <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
              {matches[0].address}
            </div>
            <div style={{ marginTop: 8 }}>
              <Stars n={matches[0].rating} />
            </div>
            <div style={{ marginTop: 8 }}>
              <OpenBadge restaurant={matches[0]} checkTime={new Date()} />
            </div>
            <a
              href={matches[0].mapsUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: 14,
                padding: "10px 24px",
                background: "#4d96ff",
                color: "#fff",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              📍 Open in Maps
            </a>
          </div>
        )}

        {matches.length > 1 && (
          <>
            <button
              onClick={() => setShowWheel(true)}
              style={{
                padding: "14px 32px",
                fontSize: 17,
                fontWeight: 700,
                background: "#ff6b6b",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                cursor: "pointer",
                marginBottom: 20,
                boxShadow: "0 4px 16px #ff6b6b44",
              }}
            >
              🎰 Spin the Wheel!
            </button>
            <div
              style={{
                width: "100%",
                maxWidth: 340,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {matches.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    boxShadow: "0 2px 12px #0001",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{r.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      {r.name}
                    </div>
                    <div style={{ marginTop: 3 }}>
                      <OpenBadge restaurant={r} checkTime={new Date()} />
                    </div>
                  </div>
                  <a
                    href={r.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#4d96ff",
                      fontSize: 18,
                      textDecoration: "none",
                    }}
                  >
                    📍
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          onClick={resetAll}
          style={{
            marginTop: 28,
            background: "none",
            border: "2px solid #eee",
            borderRadius: 50,
            padding: "10px 24px",
            cursor: "pointer",
            color: "#888",
            fontSize: 14,
          }}
        >
          🔄 New Session
        </button>
      </div>
    );
  }

  return null;
}
