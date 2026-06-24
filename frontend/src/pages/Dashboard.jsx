import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboardStats } from "../services/dashboardService";
import DashboardChart from "../components/DashboardChart";
import { useNavigate } from "react-router-dom";

import {
  FaUserGraduate,
  FaUniversity,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";

const statCards = [
  {
    key: "students",
    label: "Students",
    route: "/students",
    icon: FaUserGraduate,
    gradient: "from-blue-500 to-blue-700",
    textColor: "text-blue-600",
    description: "Manage student records and admissions.",
  },
  {
    key: "colleges",
    label: "Colleges",
    route: "/colleges",
    icon: FaUniversity,
    gradient: "from-green-500 to-green-700",
    textColor: "text-green-600",
    description: "Manage college branches and details.",
  },
  {
    key: "departments",
    label: "Departments",
    route: "/departments",
    icon: FaBuilding,
    gradient: "from-purple-500 to-purple-700",
    textColor: "text-purple-600",
    description: "Manage academic departments.",
  },
  {
    key: "courses",
    label: "Courses",
    route: "/courses",
    icon: FaBook,
    gradient: "from-orange-500 to-orange-600",
    textColor: "text-orange-600",
    description: "Manage course offerings and curriculum.",
  },
  {
    key: "faculty",
    label: "Faculty",
    route: "/faculty",
    icon: FaChalkboardTeacher,
    gradient: "from-red-500 to-red-700",
    textColor: "text-red-600",
    description: "Manage teaching staff and assignments.",
  },
];

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    colleges: 0,
    departments: 0,
    courses: 0,
    faculty: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStats();
  }, []);

  return (
    <MainLayout>
      <div className="p-8 space-y-10">

        {/* ── Hero Banner ── */}
        <div
          className="rounded-3xl p-10 text-white shadow-xl"
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)",
          }}
        >
          <h1 className="text-5xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-lg text-blue-100 mb-8">
            Manage Students, Colleges, Departments, Courses and Faculty from a single dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl text-base">
              Total Students: <strong>{stats.students}</strong>
            </div>
            <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl text-base">
              Faculty: <strong>{stats.faculty}</strong>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
          {statCards.map(({ key, label, route, icon: Icon, gradient }) => (
            <div
              key={key}
              onClick={() => navigate(route)}
              className={`bg-linear-to-br ${gradient} text-white rounded-3xl p-7 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base text-white/80 mb-3">{label}</p>
                  <h2 className="text-5xl font-bold">{stats[key]}</h2>
                </div>
                <Icon size={42} className="opacity-90" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick Access ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards
            .filter((c) => ["students", "faculty", "courses"].includes(c.key))
            .map(({ key, label, route, textColor, description }) => (
              <div
                key={key}
                onClick={() => navigate(route)}
                className="bg-white rounded-2xl shadow-md p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <h3 className={`text-xl font-bold ${textColor} mb-3`}>{label}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{description}</p>
              </div>
            ))}
        </div>

        {/* ── Analytics ── */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">System Analytics</h2>
          <DashboardChart stats={stats} />
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;