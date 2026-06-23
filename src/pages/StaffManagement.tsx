import { useState } from "react";
import Navbar from "./Navbar";

interface Staff {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  role: string;
  phone: string;
  email: string;
  status: "Active" | "On Leave" | "Inactive";
  attendance: number;
}

const StaffManagement = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const staffList: Staff[] = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      department: "Reception",
      role: "Front Desk Officer",
      phone: "+250 788 123 456",
      email: "john@hotel.com",
      status: "Active",
      attendance: 98,
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sarah Johnson",
      department: "Housekeeping",
      role: "Supervisor",
      phone: "+250 788 222 333",
      email: "sarah@hotel.com",
      status: "Active",
      attendance: 95,
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Michael Brown",
      department: "Maintenance",
      role: "Technician",
      phone: "+250 788 444 555",
      email: "michael@hotel.com",
      status: "On Leave",
      attendance: 88,
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Emma Davis",
      department: "Finance",
      role: "Accountant",
      phone: "+250 788 777 888",
      email: "emma@hotel.com",
      status: "Active",
      attendance: 99,
    },
  ];

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || staff.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "On Leave":
        return "bg-yellow-100 text-yellow-700";

      case "Inactive":
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
          <h1 className="text-3xl font-bold">Staff Management</h1>

          <p className="text-gray-500">
            Manage employees, departments, attendance, and performance.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">86</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Active Staff</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">74</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">On Leave</h3>
          <p className="text-4xl font-bold text-yellow-600 mt-2">8</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Attendance Rate</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">96%</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Departments</option>
            <option value="Reception">Reception</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Employee Directory</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Employee ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Attendance</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{staff.employeeId}</td>

                  <td className="p-4">{staff.name}</td>

                  <td className="p-4">{staff.department}</td>

                  <td className="p-4">{staff.role}</td>

                  <td className="p-4">
                    <div>
                      <p>{staff.phone}</p>
                      <p className="text-sm text-gray-500">{staff.email}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: `${staff.attendance}%`,
                          }}
                        />
                      </div>
                      <span>{staff.attendance}%</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        staff.status,
                      )}`}
                    >
                      {staff.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>

                      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>

                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Department Overview</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Reception</span>
              <span>12 Staff</span>
            </div>

            <div className="flex justify-between">
              <span>Housekeeping</span>
              <span>28 Staff</span>
            </div>

            <div className="flex justify-between">
              <span>Maintenance</span>
              <span>14 Staff</span>
            </div>

            <div className="flex justify-between">
              <span>Finance</span>
              <span>8 Staff</span>
            </div>

            <div className="flex justify-between">
              <span>Security</span>
              <span>24 Staff</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Attendance Summary</h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span>Present</span>
                <span>74</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full w-[86%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>On Leave</span>
                <span>8</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-yellow-500 h-3 rounded-full w-[10%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Absent</span>
                <span>4</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-red-500 h-3 rounded-full w-[4%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default StaffManagement;
