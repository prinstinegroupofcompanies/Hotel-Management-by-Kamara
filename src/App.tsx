import { HotelProvider } from "./context/HotelContext";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import Room from "./Admin/Room";
import Guest from "./Admin/Guest";
import Categories from "./Admin/categorias";
import Reservations from "./Admin/Reservations";
import CheckInCheckout from "./Admin/Check-In-out";
import Housekeeping from "./Admin/HousePeeking";
import Payments from "./Admin/Payment";
import StaffManagement from "./Admin/StaffManagement";
import ProtectedRoute from "./Admin/ProtectedRoute";
import Login from "./Admin/Login";
import Analytics from "./Admin/Analytics";
import Reports from "./Admin/Reports";
import Settings from "./Admin/Settings";

export const App = () => {
  return (
    <>
      <HotelProvider>
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
            <Route path="/" element={<Login />} />

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
      </HotelProvider>
    </>
  );
};
export default App;
