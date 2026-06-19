import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Colleges from "../pages/Colleges";
import Students from "../pages/Students";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Faculty from "../pages/Faculty";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/colleges"
          element={
            <ProtectedRoute>
              <Colleges />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <Faculty />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;