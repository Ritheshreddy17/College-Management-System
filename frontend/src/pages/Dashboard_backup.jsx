import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboardStats } from "../services/dashboardService";
import DashboardChart from "../components/DashboardChart";

import {
  FaUserGraduate,
  FaUniversity,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    colleges: 0,
    departments: 0,
    courses: 0,
    faculty: 0,
  });

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          College Management Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Students</p>
              <h2 className="text-5xl font-bold mt-3">
                {stats.students}
              </h2>
            </div>
            <FaUserGraduate size={40} />
          </div>
        </div>

        <div className="bg-linear-to-r from-green-500 to-green-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Colleges</p>
              <h2 className="text-5xl font-bold mt-3">
                {stats.colleges}
              </h2>
            </div>
            <FaUniversity size={40} />
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-500 to-purple-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Departments</p>
              <h2 className="text-5xl font-bold mt-3">
                {stats.departments}
              </h2>
            </div>
            <FaBuilding size={40} />
          </div>
        </div>

        <div className="bg-linear-to-r from-orange-500 to-orange-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Courses</p>
              <h2 className="text-5xl font-bold mt-3">
                {stats.courses}
              </h2>
            </div>
            <FaBook size={40} />
          </div>
        </div>

        <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Faculty</p>
              <h2 className="text-5xl font-bold mt-3">
                {stats.faculty}
              </h2>
            </div>
            <FaChalkboardTeacher size={40} />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Live System Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-5">
            <h3 className="text-blue-600 font-semibold">
              Students
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.students}
            </p>

            <p className="text-gray-500">
              Registered Students
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="text-green-600 font-semibold">
              Colleges
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.colleges}
            </p>

            <p className="text-gray-500">
              Active Colleges
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="text-purple-600 font-semibold">
              Departments
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.departments}
            </p>

            <p className="text-gray-500">
              Available Departments
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="text-orange-600 font-semibold">
              Courses
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.courses}
            </p>

            <p className="text-gray-500">
              Offered Courses
            </p>
          </div>

          <div className="border rounded-2xl p-5 md:col-span-2">
            <h3 className="text-red-600 font-semibold">
              Faculty
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.faculty}
            </p>

            <p className="text-gray-500">
              Teaching Staff Members
            </p>
          </div>
        </div>
      </div>

      <DashboardChart stats={stats} />
    </MainLayout>
  );
}

export default Dashboard;