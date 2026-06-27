import { useState } from "react";
import Navbar from "./Navbar";

interface Guest {
  id: number;
  name: string;
  nationality: string;
  email: string;
  phone: string;
  roomNumber: string;
  totalStays: number;
  vip: boolean;
  status: "Checked In" | "Checked Out";
}

const Guest = () => {
  const [search, setSearch] = useState("");

  const guests: Guest[] = [
    {
      id: 1,
      name: "John Doe",
      nationality: "United States",
      email: "john@example.com",
      phone: "+1 202 555 0147",
      roomNumber: "101",
      totalStays: 12,
      vip: true,
      status: "Checked In",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      nationality: "United Kingdom",
      email: "sarah@example.com",
      phone: "+44 20 7946 0958",
      roomNumber: "205",
      totalStays: 4,
      vip: false,
      status: "Checked Out",
    },
    {
      id: 3,
      name: "Michael Brown",
      nationality: "Canada",
      email: "michael@example.com",
      phone: "+1 416 555 0188",
      roomNumber: "312",
      totalStays: 8,
      vip: true,
      status: "Checked In",
    },
    {
      id: 4,
      name: "Emma Wilson",
      nationality: "Australia",
      email: "emma@example.com",
      phone: "+61 2 5550 1122",
      roomNumber: "410",
      totalStays: 2,
      vip: false,
      status: "Checked In",
    },
  ];

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase()) ||
      guest.nationality.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Guest Management</h1>
          <p className="text-gray-500">
            Manage guest profiles, stay history, and VIP guests.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
          Add New Guest
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Guests</h3>
          <p className="text-3xl font-bold mt-2">1,248</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">VIP Guests</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">124</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Checked In</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">78</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Checked Out</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">56</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <input
          type="text"
          placeholder="Search guests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Guest List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Guest</th>
                <th className="text-left p-4">Nationality</th>
                <th className="text-left p-4">Contact</th>
                <th className="text-left p-4">Room</th>
                <th className="text-left p-4">Stay History</th>
                <th className="text-left p-4">VIP</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{guest.name}</p>
                      <p className="text-sm text-gray-500">{guest.email}</p>
                    </div>
                  </td>

                  <td className="p-4">{guest.nationality}</td>

                  <td className="p-4">{guest.phone}</td>

                  <td className="p-4">{guest.roomNumber}</td>

                  <td className="p-4">{guest.totalStays} Visits</td>

                  <td className="p-4">
                    {guest.vip ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        VIP
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        guest.status === "Checked In"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {guest.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Profile
                      </button>

                      <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
                        History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-gray-500">
                    No guests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
};

export default Guest;
