import { useState } from "react";
import Navbar from "../pages/Navbar";

interface Reservation {
  id: string;
  guestName: string;
  email: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  bookingStatus: "Confirmed" | "Pending" | "Checked In" | "Cancelled";
}

const Reservations = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const reservations: Reservation[] = [
    {
      id: "BK-1001",
      guestName: "John Doe",
      email: "john@example.com",
      roomNumber: "101",
      roomType: "Deluxe",
      checkIn: "2026-06-15",
      checkOut: "2026-06-18",
      guests: 2,
      amount: 450,
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
    },
    {
      id: "BK-1002",
      guestName: "Sarah Johnson",
      email: "sarah@example.com",
      roomNumber: "205",
      roomType: "Executive Suite",
      checkIn: "2026-06-16",
      checkOut: "2026-06-20",
      guests: 3,
      amount: 1200,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
    },
    {
      id: "BK-1003",
      guestName: "Michael Brown",
      email: "michael@example.com",
      roomNumber: "310",
      roomType: "Standard",
      checkIn: "2026-06-14",
      checkOut: "2026-06-17",
      guests: 1,
      amount: 240,
      paymentStatus: "Partial",
      bookingStatus: "Checked In",
    },
  ];

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.guestName.toLowerCase().includes(search.toLowerCase()) ||
      reservation.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || reservation.bookingStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Checked In":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "Partial":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Navbar>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Reservations & Bookings
          </h1>
          <p className="text-gray-500">
            Manage hotel reservations and bookings.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
          + New Reservation
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Reservations</h3>
          <p className="text-3xl font-bold mt-2">1,248</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Confirmed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">862</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">241</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Today's Check-Ins</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">58</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search reservation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Checked In">Checked In</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Reservation Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Reservation List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Booking ID</th>
                <th className="text-left p-4">Guest</th>
                <th className="text-left p-4">Room</th>
                <th className="text-left p-4">Stay Period</th>
                <th className="text-left p-4">Guests</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Payment</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{reservation.id}</td>

                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{reservation.guestName}</p>
                      <p className="text-sm text-gray-500">
                        {reservation.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <p>{reservation.roomNumber}</p>
                      <p className="text-sm text-gray-500">
                        {reservation.roomType}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-sm">
                      <p>{reservation.checkIn}</p>
                      <p className="text-gray-500">to {reservation.checkOut}</p>
                    </div>
                  </td>

                  <td className="p-4">{reservation.guests}</td>

                  <td className="p-4 font-semibold">${reservation.amount}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusColor(
                        reservation.paymentStatus,
                      )}`}
                    >
                      {reservation.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getBookingStatusColor(
                        reservation.bookingStatus,
                      )}`}
                    >
                      {reservation.bookingStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>

                      <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center p-8 text-gray-500">
                    No reservations found.
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

export default Reservations;
