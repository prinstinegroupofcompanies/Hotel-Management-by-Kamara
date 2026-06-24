import { useState } from "react";
import Navbar from "./Navbar";

interface GuestStay {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  status: "Pending Check-In" | "Checked In" | "Pending Check-Out";
}

const CheckInCheckout = () => {
  const [search, setSearch] = useState("");

  const stays: GuestStay[] = [
    {
      id: "BK1001",
      guestName: "John Doe",
      email: "john.doe@example.com",
      roomNumber: "101",
      roomType: "Deluxe Room",
      checkInDate: "2026-06-14",
      checkOutDate: "2026-06-18",
      status: "Pending Check-In",
    },
    {
      id: "BK1002",
      guestName: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      roomNumber: "205",
      roomType: "Executive Suite",
      checkInDate: "2026-06-13",
      checkOutDate: "2026-06-15",
      status: "Checked In",
    },
    {
      id: "BK1003",
      guestName: "Michael Brown",
      email: "michael.brown@example.com",
      roomNumber: "310",
      roomType: "Standard Room",
      checkInDate: "2026-06-10",
      checkOutDate: "2026-06-14",
      status: "Pending Check-Out",
    },
  ];

  const filteredStays = stays.filter(
    (stay) =>
      stay.guestName.toLowerCase().includes(search.toLowerCase()) ||
      stay.roomNumber.includes(search),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Check-In":
        return "bg-yellow-100 text-yellow-700";

      case "Checked In":
        return "bg-green-100 text-green-700";

      case "Pending Check-Out":
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
          <h1 className="text-3xl font-bold">Check-In / Check-Out</h1>

          <p className="text-gray-500">Manage guest arrivals and departures.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Today's Arrivals</h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Today's Departures</h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">18</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Checked-In Guests</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">96</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending Check-Out</h3>

          <p className="text-3xl font-bold text-red-600 mt-2">12</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <input
          type="text"
          placeholder="Search guest or room number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Guest Stay Records</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Booking ID</th>

                <th className="p-4 text-left">Guest</th>

                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Check-In</th>

                <th className="p-4 text-left">Check-Out</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStays.map((stay) => (
                <tr key={stay.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{stay.id}</td>

                  <td className="p-4">
                    <p>{stay.guestName}</p>
                    <p className="text-sm text-gray-500 w-[100px] truncate">
                      {stay.email}
                    </p>
                  </td>

                  <td className="p-4">
                    <div>
                      <p>{stay.roomNumber}</p>

                      <p className="text-sm text-gray-500">{stay.roomType}</p>
                    </div>
                  </td>

                  <td className="p-4">{stay.checkInDate}</td>

                  <td className="p-4">{stay.checkOutDate}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        stay.status,
                      )}`}
                    >
                      {stay.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {stay.status === "Pending Check-In" && (
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                          Check In
                        </button>
                      )}

                      {stay.status === "Checked In" && (
                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          Check Out
                        </button>
                      )}

                      {stay.status === "Pending Check-Out" && (
                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          Complete Check-Out
                        </button>
                      )}

                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>

                      <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
                        Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStays.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Operations */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-xl mb-3">Pending Arrivals</h2>

          <p className="text-5xl font-bold text-yellow-500">24</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-xl mb-3">Active Guests</h2>

          <p className="text-5xl font-bold text-green-600">96</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-xl mb-3">Pending Departures</h2>

          <p className="text-5xl font-bold text-red-600">12</p>
        </div>
      </div>
    </Navbar>
  );
};

export default CheckInCheckout;
