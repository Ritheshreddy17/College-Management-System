import { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch, FaUserCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NOTIFICATIONS = [
  { id: 1, text: "New student enrolled in B.Tech", time: "2 min ago", unread: true },
  { id: 2, text: "Faculty assignment updated", time: "1 hr ago", unread: true },
  { id: 3, text: "New department added", time: "3 hrs ago", unread: false },
];

const SEARCH_LINKS = [
  { label: "Students", path: "/students" },
  { label: "Colleges", path: "/colleges" },
  { label: "Departments", path: "/departments" },
  { label: "Courses", path: "/courses" },
  { label: "Faculty", path: "/faculty" },
];

function Navbar() {
  const navigate = useNavigate();

  // ── User from localStorage ──
  const role = localStorage.getItem("role") || "admin";
  const userName = role.charAt(0).toUpperCase() + role.slice(1);
  const userLabel = role === "admin" ? "Administrator" : "Faculty Member";

  // ── Search ──
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const filtered = query.trim()
    ? SEARCH_LINKS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_LINKS;

  // ── Notifications ──
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  // ── Close dropdowns on outside click ──
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifs(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center relative z-20">

      {/* ── Title ── */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">College Management System</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {role === "admin" ? "Admin Dashboard" : "Faculty Dashboard"}
        </p>
      </div>

      {/* ── Right Controls ── */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative" ref={searchRef}>
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search students, faculty..."
            className="pl-11 pr-5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />

          {/* Suggestions dropdown */}
          {showSuggestions && filtered.length > 0 && (
            <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
              {filtered.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setShowSuggestions(false); setQuery(""); }}
                  className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-3"
                >
                  <FaSearch size={11} className="text-slate-400" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifs((v) => !v); markAllRead(); }}
            className="relative p-1"
          >
            <FaBell size={22} className="text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifs && (
            <div className="absolute top-full mt-3 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                <button
                  onClick={markAllRead}
                  className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                >
                  Mark all read
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="px-5 py-8 text-center text-slate-400 text-sm">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-5 py-4 flex items-start gap-3 border-b border-slate-50 ${
                      n.unread ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-blue-500" : "bg-slate-300"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-snug">{n.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      className="text-slate-300 hover:text-slate-500 shrink-0"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle size={40} className="text-blue-600" />
          <div>
            <p className="text-base font-semibold text-slate-800 leading-tight">{userName}</p>
            <p className="text-sm text-slate-500 leading-tight">{userLabel}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;