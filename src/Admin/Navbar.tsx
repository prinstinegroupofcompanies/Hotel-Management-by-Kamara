import { type ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="Navbar-element flex min-h-screen w-full">
      {menuOpen && (
        <button
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "w-72 lg:w-20" : "w-72"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-lg font-bold sm:text-xl">
              {" "}
              Prinstine Group of Companies{" "}
            </h1>
          )}
          <button
            aria-label="Collapse navigation"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden text-xl lg:block"
          >
            ☰
          </button>
          <button
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="text-xl lg:hidden"
          >
            ✕
          </button>
        </div>
        <nav
          className="mt-5 flex-1 overflow-y-auto pb-6"
          onClick={() => setMenuOpen(false)}
        >
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
                to="/history"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800"
              >
                <span>⚙️</span> {!collapsed && <span>History</span>}
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
      <main className="min-w-0 flex-1 bg-gray-100 p-3 sm:p-5 lg:p-6">
        <div className="mb-5 flex items-center gap-3 lg:hidden">
          <button
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg bg-slate-900 px-3 py-2 text-lg text-white"
          >
            ☰
          </button>
          <span className="truncate font-semibold text-slate-800">
            Prinstine Hotel Management
          </span>
        </div>
        {children}
      </main>
    </div>
  );
};
export default Navbar;
