import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import DashboardPage from "./pages/DashboardPage";
import MembersPage from "./pages/MembersPage";
import MembershipsPage from "./pages/MembershipsPage";
import PaymentsPage from "./pages/PaymentsPage";
import AttendancePage from "./pages/AttendancePage";
import TrainersPage from "./pages/TrainersPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/memberships" element={<MembershipsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/trainers" element={<TrainersPage />} />

        {/* Member Dashboard */}
        <Route
          path="/member-dashboard"
          element={<MemberDashboardPage />}
        />

        {/* Attendance */}
        <Route path="/attendance" element={<AttendancePage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;