import { useMemo } from "react";
import { useHotel } from "../context/HotelContext";
import Navbar from "./Navbar";
import { initialReservations } from "../data/reservations";

const Dashboard = () => {
  const { stays } = useHotel();

  const dashboardStats = useMemo(() => {
    const totalRooms = 120;
    const occupiedRooms = stays.length;
    const availableRooms = totalRooms - occupiedRooms;

    const today = new Date().toISOString().split("T")[0];
    const todayRevenue = stays
      .filter((stay) => stay.checkInDate === today)
      .reduce((sum, stay) => sum + stay.amount, 0);

    const monthlyRevenue = stays.reduce((sum, stay) => sum + stay.amount, 0);

    const pendingPayments = stays.filter(
      (stay) => stay.status === "Pending",
    ).length;

    const checkedInToday = stays.filter(
      (stay) => stay.status === "Checked In",
    ).length;

    const checkedOutToday = stays.filter(
      (stay) => stay.status === "Checked Out",
    ).length;

    const cancelledPayments = initialReservations.filter(
      (reservation) => reservation.paymentStatus === "Balance",
    ).length;

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
      reservations: initialReservations.length + stays.length,
    };
  }, [stays]);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Reservations</h3>

          <p className="text-3xl font-bold text-indigo-600">
            {dashboardStats.reservations}
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
                <tr className="border-b">
                  <td className="py-4">John Doe</td>
                  <td>204</td>
                  <td>14 Jun</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Confirmed
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">Sarah Johnson</td>
                  <td>305</td>
                  <td>14 Jun</td>
                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Michael Brown</td>
                  <td>112</td>
                  <td>15 Jun</td>
                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Checked In
                    </span>
                  </td>
                </tr>
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
                <span>80%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="w-[80%] h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Available</span>
                <span>20%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="w-[20%] h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Maintenance</span>
                <span>5%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="w-[5%] h-3 bg-red-500 rounded-full"></div>
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
            <li>Room 101 - Cleaning Pending</li>
            <li>Room 204 - Inspection Required</li>
            <li>Room 310 - Ready for Guest</li>
            <li>Room 411 - Maintenance Request</li>
          </ul>
        </div>

        {/* Staff Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Activity</h2>

          <ul className="space-y-3">
            <li>Reception: 4 Staff Active</li>
            <li>Housekeeping: 12 Staff Active</li>
            <li>Maintenance: 3 Staff Active</li>
            <li>Security: 5 Staff Active</li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default Dashboard;
