import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Colleges from "../pages/Colleges";
import Students from "../pages/Students";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Faculty from "../pages/Faculty";
import AIAssistant from "../pages/AIAssistant";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
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
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/colleges"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <Colleges />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <Departments />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <Faculty />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />
<Route
  path="/assistant"
  element={
    <ProtectedRoute>
      <AIAssistant />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;