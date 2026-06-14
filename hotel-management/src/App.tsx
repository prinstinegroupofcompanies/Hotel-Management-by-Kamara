import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Guest from "./pages/Guest";
import Categories from "./pages/categorias";
import Reservations from "./pages/Reservations";
import CheckInCheckout from "./pages/Check-In-out";

export const App = () => {
  return (
    <>
      <div className="block">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/guests" element={<Guest />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/CheckInCheckout" element={<CheckInCheckout />} />
        </Routes>
      </div>
    </>
  );
};
export default App;
