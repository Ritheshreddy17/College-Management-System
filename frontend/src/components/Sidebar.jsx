import {
  FaTachometerAlt,
  FaUniversity,
  FaUserGraduate,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Colleges",
      path: "/colleges",
      icon: <FaUniversity />,
    },
    {
      name: "Students",
      path: "/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "Departments",
      path: "/departments",
      icon: <FaBuilding />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <FaBook />,
    },
    {
      name: "Faculty",
      path: "/faculty",
      icon: <FaChalkboardTeacher />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          🎓 CMS
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          College Management System
        </p>
      </div>

      <div className="flex-1 p-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 mb-2 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}

            <span>
              {menu.name}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
        >
          <FaSignOutAlt />

          <span>
            Logout
          </span>
        </button>

      </div>

    </div>
  );
}

export default Sidebar;