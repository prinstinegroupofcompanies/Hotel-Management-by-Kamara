import { useState } from "react";
import Navbar from "./Navbar";

interface HousekeepingTask {
  id: number;
  roomNumber: string;
  roomType: string;
  assignedTo: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed" | "Inspection Required";
  lastUpdated: string;
}

const Housekeeping = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const tasks: HousekeepingTask[] = [
    {
      id: 1,
      roomNumber: "101",
      roomType: "Standard Room",
      assignedTo: "Mary Johnson",
      priority: "Medium",
      status: "Pending",
      lastUpdated: "08:30 AM",
    },
    {
      id: 2,
      roomNumber: "205",
      roomType: "Deluxe Room",
      assignedTo: "James Wilson",
      priority: "High",
      status: "In Progress",
      lastUpdated: "09:15 AM",
    },
    {
      id: 3,
      roomNumber: "310",
      roomType: "Executive Suite",
      assignedTo: "Linda Brown",
      priority: "High",
      status: "Inspection Required",
      lastUpdated: "10:20 AM",
    },
    {
      id: 4,
      roomNumber: "402",
      roomType: "Presidential Suite",
      assignedTo: "Samuel Davis",
      priority: "Low",
      status: "Completed",
      lastUpdated: "11:00 AM",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.roomNumber.includes(search) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || task.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Inspection Required":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Housekeeping Management</h1>

          <p className="text-gray-500">
            Monitor room cleaning and housekeeping activities.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          + New Task
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-4xl font-bold mt-2">58</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Tasks</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">In Progress</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">18</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Today</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">28</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search room or staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Inspection Required">Inspection Required</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Housekeeping Tasks</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Room Type</th>

                <th className="p-4 text-left">Assigned Staff</th>

                <th className="p-4 text-left">Priority</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Last Update</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{task.roomNumber}</td>

                  <td className="p-4">{task.roomType}</td>

                  <td className="p-4">{task.assignedTo}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-4">{task.lastUpdated}</td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>

                      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>

                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    No housekeeping tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Performance</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Mary Johnson</span>
              <span>12 Tasks</span>
            </div>

            <div className="flex justify-between">
              <span>James Wilson</span>
              <span>15 Tasks</span>
            </div>

            <div className="flex justify-between">
              <span>Linda Brown</span>
              <span>10 Tasks</span>
            </div>

            <div className="flex justify-between">
              <span>Samuel Davis</span>
              <span>21 Tasks</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Room Cleaning Progress</h2>

          <div className="w-full h-5 bg-gray-200 rounded-full">
            <div className="w-[78%] h-5 bg-green-500 rounded-full"></div>
          </div>

          <p className="mt-4 text-gray-600">
            78% of today's cleaning tasks completed.
          </p>
        </div>
      </div>
    </Navbar>
  );
};

export default Housekeeping;
