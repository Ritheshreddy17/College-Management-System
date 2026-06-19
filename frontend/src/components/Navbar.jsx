import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center rounded-xl mb-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          College Management System
        </h1>

        <p className="text-sm text-gray-500">
          Admin Dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="relative">
          <FaBell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle
            size={35}
            className="text-blue-600"
          />

          <div>
            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;