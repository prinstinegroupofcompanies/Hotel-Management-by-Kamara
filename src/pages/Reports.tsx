import { useState } from "react";
import Navbar from "./Navbar";

interface AuditLog {
  id: number;
  user: string;
  action: string;
  module: string;
  date: string;
  status: "Success" | "Warning" | "Failed";
}

const Reports = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const logs: AuditLog[] = [
    {
      id: 1,
      user: "Admin",
      action: "Created Reservation",
      module: "Reservations",
      date: "2026-06-14 09:15 AM",
      status: "Success",
    },
    {
      id: 2,
      user: "Receptionist",
      action: "Checked In Guest",
      module: "Check-In",
      date: "2026-06-14 10:30 AM",
      status: "Success",
    },
    {
      id: 3,
      user: "Accountant",
      action: "Generated Invoice",
      module: "Payments",
      date: "2026-06-14 11:20 AM",
      status: "Success",
    },
    {
      id: 4,
      user: "Staff",
      action: "Failed Login Attempt",
      module: "Security",
      date: "2026-06-14 12:05 PM",
      status: "Failed",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || log.module === filter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-700";

      case "Warning":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Audit Logs</h1>

          <p className="text-gray-500 mt-2">
            Monitor hotel operations, user activities, financial reports, and
            security events.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Export Reports
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Logs</p>

          <h2 className="text-4xl font-bold mt-3">12,584</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Reservations Today</p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">47</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue Reports</p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">$24,800</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Security Alerts</p>

          <h2 className="text-4xl font-bold text-red-600 mt-3">5</h2>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="All">All Modules</option>
            <option value="Reservations">Reservations</option>
            <option value="Payments">Payments</option>
            <option value="Security">Security</option>
            <option value="Check-In">Check-In</option>
          </select>

          <input type="date" className="border rounded-lg px-4 py-3" />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Audit Logs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Module</th>
                <th className="p-4 text-left">Date & Time</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{log.user}</td>

                  <td className="p-4">{log.action}</td>

                  <td className="p-4">{log.module}</td>

                  <td className="p-4">{log.date}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        log.status,
                      )}`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-gray-500">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Financial Reports</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Daily Revenue</span>
              <span>$8,450</span>
            </div>

            <div className="flex justify-between">
              <span>Weekly Revenue</span>
              <span>$52,300</span>
            </div>

            <div className="flex justify-between">
              <span>Monthly Revenue</span>
              <span>$185,400</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Reservation Reports</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Active Bookings</span>
              <span>164</span>
            </div>

            <div className="flex justify-between">
              <span>Check-Ins Today</span>
              <span>38</span>
            </div>

            <div className="flex justify-between">
              <span>Check-Outs Today</span>
              <span>31</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Staff Activity</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Active Staff</span>
              <span>74</span>
            </div>

            <div className="flex justify-between">
              <span>Attendance Rate</span>
              <span>96%</span>
            </div>

            <div className="flex justify-between">
              <span>Tasks Completed</span>
              <span>2,480</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span>Admin generated monthly revenue report.</span>
            <span className="text-gray-500">10 minutes ago</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>New reservation created for Room 302.</span>
            <span className="text-gray-500">25 minutes ago</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>Invoice INV-2058 paid successfully.</span>
            <span className="text-gray-500">1 hour ago</span>
          </div>

          <div className="flex justify-between">
            <span>Failed login attempt detected.</span>
            <span className="text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Reports;
