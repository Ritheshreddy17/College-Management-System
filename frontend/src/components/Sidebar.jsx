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

  const role =
    localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/login");
  };

  let menus = [];

  if (role === "admin") {
    menus = [
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
  }

  if (role === "faculty") {
    menus = [
      {
        name: "Dashboard",
        path: "/",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Students",
        path: "/students",
        icon: <FaUserGraduate />,
      },
      {
        name: "Courses",
        path: "/courses",
        icon: <FaBook />,
      },
    ];
  }

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          🎓 EduAdmin Pro
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Smart College ERP
        </p>
        <div className="bg-slate-800 rounded-xl p-4 mt-4">
  <h3 className="font-semibold">
    {localStorage.getItem("role")?.toUpperCase()}
  </h3>
  <p className="text-xs text-slate-400">
    Logged In
  </p>
</div>
        <div className="mt-3 text-xs bg-blue-600 inline-block px-3 py-1 rounded-full">
          {role?.toUpperCase()}
        </div>
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