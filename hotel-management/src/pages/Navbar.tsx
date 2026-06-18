import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className=" Navbar-element flex min-h-screen ">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 h-screen flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-xl font-bold">
              {" "}
              Prinstine Group of Companies{" "}
            </h1>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-xl">
            ☰
          </button>
        </div>
        <nav className="mt-5 flex-1 overflow-y-auto pb-6">
          <ul className="space-y-2 px-3">
            <li>
              <Link
                to="/Dashboard"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📊</span> {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/rooms"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>🏨</span>
                {!collapsed && <span>Room Management</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Categories"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📅</span> {!collapsed && <span>Room Categories</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/reservations"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📅</span> {!collapsed && <span>Reservations</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/CheckInCheckout"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📅</span>{" "}
                {!collapsed && <span>Check-In / Check-Out</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Housekeeping"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📅</span> {!collapsed && <span>Housekeeping</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/guests"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>👥</span> {!collapsed && <span>Guests</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/payments"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>💳</span> {!collapsed && <span>Payments</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/StaffManagement"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>📈</span> {!collapsed && <span>Staff Management</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Analytics"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>⚙️</span> {!collapsed && <span>Analytics</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Reports"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>⚙️</span> {!collapsed && <span>Reports</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>⚙️</span> {!collapsed && <span>Settings</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};
export default Navbar;
