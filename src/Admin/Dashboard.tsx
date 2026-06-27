import { useMemo } from "react";
import { useHotel } from "../context/HotelContext";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { stays, reservations, rooms } = useHotel();

  const dashboardStats = useMemo(() => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(
      (room) => room.status === "Occupied",
    ).length;
    const availableRooms = rooms.filter(
      (room) => room.status === "Available",
    ).length;

    const today = new Date().toISOString().split("T")[0];
    const todayRevenue = stays
      .filter((stay) => stay.checkInDate === today)
      .reduce((sum, stay) => sum + stay.amount, 0);

    const monthlyRevenue = stays.reduce((sum, stay) => sum + stay.amount, 0);

    const pendingPayments = reservations
      .filter((reservation) => reservation.paymentStatus === "Pending")
      .reduce((sum, reservation) => sum + reservation.amount, 0);

    const checkedInToday = stays.filter(
      (stay) => stay.status === "Checked In",
    ).length;

    const checkedOutToday = stays.filter(
      (stay) => stay.status === "Checked Out",
    ).length;

    const cancelledPayments = reservations.filter(
      (reservation) => reservation.paymentStatus === "Balance",
    ).length;

    const recentReservations = [...reservations]
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, 3);

    const housekeepingTasks = stays.slice(0, 4).map((stay) => {
      if (stay.status === "Pending") {
        return {
          roomNumber: stay.roomNumber,
          detail: `Cleaning pending for ${stay.guestName}`,
        };
      }

      if (stay.status === "Checked In") {
        return {
          roomNumber: stay.roomNumber,
          detail: `Service needed for ${stay.guestName}`,
        };
      }

      return {
        roomNumber: stay.roomNumber,
        detail: "Ready for the next guest",
      };
    });

    const staffActivity = [
      {
        label: "Reception",
        value: `${checkedInToday + checkedOutToday + stays.length} active bookings`,
      },
      {
        label: "Housekeeping",
        value: `${stays.filter((stay) => stay.status !== "Checked Out").length} rooms in progress`,
      },
      {
        label: "Maintenance",
        value: `${stays.filter((stay) => stay.paymentStatus === "Pending").length} payment follow-ups`,
      },
      {
        label: "Security",
        value: `${stays.filter((stay) => stay.status === "Checked In").length} checked-in guests`,
      },
    ];

    const occupiedPercentage = totalRooms
      ? Math.round((occupiedRooms / totalRooms) * 100)
      : 0;
    const availablePercentage = totalRooms
      ? Math.round((availableRooms / totalRooms) * 100)
      : 0;
    const maintenancePercentage = totalRooms
      ? Math.round(((occupiedRooms > 0 ? 1 : 0) / totalRooms) * 100)
      : 0;

    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      cancelledPayments,
      todayRevenue,
      monthlyRevenue,
      pendingPayments,
      activeGuests: stays.length,
      checkedInToday,
      checkedOutToday,
      recentReservations,
      housekeepingTasks,
      staffActivity,
      occupiedPercentage,
      availablePercentage,
      maintenancePercentage,
    };
  }, [reservations, rooms, stays]);

  return (
    <Navbar>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hotel Dashboard</h1>

        <p className="text-gray-500">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Rooms</h3>

          <p className="text-4xl font-bold mt-2">{dashboardStats.totalRooms}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Occupied Rooms</h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {dashboardStats.occupiedRooms}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Available Rooms</h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {dashboardStats.availableRooms}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Cancelled Payments</h3>

          <p className="text-4xl font-bold text-orange-500 mt-2">
            ${dashboardStats.cancelledPayments}
          </p>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Today's Revenue</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ${dashboardStats.todayRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Monthly Revenue</h3>

          <p className="text-3xl font-bold mt-2">
            ${dashboardStats.monthlyRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Payments</h3>

          <p className="text-3xl font-bold text-red-500 mt-2">
            ${dashboardStats.pendingPayments.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Operational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Active Guests</h3>

          <p className="text-3xl font-bold">{dashboardStats.activeGuests}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Check-Ins Today</h3>

          <p className="text-3xl font-bold text-blue-600">
            {dashboardStats.checkedInToday}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Check-Outs Today</h3>

          <p className="text-3xl font-bold text-purple-600">
            {dashboardStats.checkedOutToday}
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Reservations */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <div className="flex justify-between mb-5">
            <h2 className="text-xl font-semibold">Recent Reservations</h2>

            <button className="text-blue-600">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Guest</th>
                  <th className="text-left py-3">Room</th>
                  <th className="text-left py-3">Check-In</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {dashboardStats.recentReservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className={index === 2 ? "" : "border-b"}
                  >
                    <td className="py-4">{reservation.guestName}</td>
                    <td>{reservation.roomNumber}</td>
                    <td>{reservation.checkInDate}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          reservation.bookingStatus === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : reservation.bookingStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : reservation.bookingStatus === "Checked In"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {reservation.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Room Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Room Status</h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span>Occupied</span>
                <span>{dashboardStats.occupiedPercentage}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{ width: `${dashboardStats.occupiedPercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Available</span>
                <span>{dashboardStats.availablePercentage}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${dashboardStats.availablePercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Maintenance</span>
                <span>{dashboardStats.maintenancePercentage}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-red-500 rounded-full"
                  style={{ width: `${dashboardStats.maintenancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Housekeeping */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Housekeeping Tasks</h2>

          <ul className="space-y-3">
            {dashboardStats.housekeepingTasks.map((task) => (
              <li key={`${task.roomNumber}-${task.detail}`}>
                Room {task.roomNumber} - {task.detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Staff Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Activity</h2>

          <ul className="space-y-3">
            {dashboardStats.staffActivity.map((item) => (
              <li key={item.label}>
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default Dashboard;
