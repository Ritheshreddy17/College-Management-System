import {
  FaTachometerAlt,
  FaUniversity,
  FaUserGraduate,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  };

  let menus = [];

  if (role === "admin") {
    menus = [
      { name: "Dashboard",   path: "/",            icon: <FaTachometerAlt size={20} /> },
      { name: "Colleges",    path: "/colleges",    icon: <FaUniversity size={20} /> },
      { name: "Students",    path: "/students",    icon: <FaUserGraduate size={20} /> },
      { name: "Departments", path: "/departments", icon: <FaBuilding size={20} /> },
      { name: "Courses",     path: "/courses",     icon: <FaBook size={20} /> },
      { name: "Faculty",     path: "/faculty",     icon: <FaChalkboardTeacher size={20} /> },
      {
  name: "AI Assistant",
  path: "/assistant",
  icon: <FaRobot />,
},
    ];
  }

  if (role === "faculty") {
    menus = [
      { name: "Dashboard", path: "/",         icon: <FaTachometerAlt size={20} /> },
      { name: "Students",  path: "/students", icon: <FaUserGraduate size={20} /> },
      { name: "Courses",   path: "/courses",  icon: <FaBook size={20} /> },
    ];
  }

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* ── Brand ── */}
      <div className="px-6 py-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">🎓 EduAdmin Pro</h1>
        <p className="text-sm text-slate-400 mt-1">Smart College ERP</p>

        <div className="bg-slate-800 rounded-xl px-4 py-4 mt-5">
          <p className="text-base font-semibold text-white">
            {role?.toUpperCase()}
          </p>
          <p className="text-sm text-slate-400 mt-0.5">Logged In</p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex-1 px-4 py-5 space-y-1">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            end={menu.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="shrink-0">{menu.icon}</span>
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </div>

      {/* ── Logout ── */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-base font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-150"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;