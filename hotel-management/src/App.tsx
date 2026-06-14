import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Guest from "./pages/Guest";
import Categories from "./pages/categorias";
import Reservations from "./pages/Reservations";
import CheckInCheckout from "./pages/Check-In-out";
import Housekeeping from "./pages/HousePeeking";
import Payments from "./pages/Payment";
import StaffManagement from "./pages/StaffManagement";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export const App = () => {
  return (
    <>
      <div className="block">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/guests" element={<Guest />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/CheckInCheckout" element={<CheckInCheckout />} />
          <Route path="/Housekeeping" element={<Housekeeping />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/StaffManagement" element={<StaffManagement />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};
export default App;
