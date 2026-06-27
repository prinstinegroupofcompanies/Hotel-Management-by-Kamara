import Navbar from "./Navbar";

const Analytics = () => {
  return (
    <Navbar>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hotel Analytics Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Monitor hotel performance, revenue, occupancy, and operational
            insights.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Export Report
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Revenue</p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">$185,400</h2>

          <p className="text-green-500 mt-2">+18% This Month</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Occupancy Rate</p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">87%</h2>

          <p className="text-blue-500 mt-2">+5% From Last Month</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Guests</p>

          <h2 className="text-4xl font-bold text-purple-600 mt-3">3,248</h2>

          <p className="text-purple-500 mt-2">+11% Growth</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Active Reservations</p>

          <h2 className="text-4xl font-bold text-orange-600 mt-3">164</h2>

          <p className="text-orange-500 mt-2">Today's Bookings</p>
        </div>
      </div>

      {/* Revenue + Occupancy */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Monthly Revenue</h2>

          <div className="space-y-4">
            {[
              { month: "January", value: "68%" },
              { month: "February", value: "74%" },
              { month: "March", value: "82%" },
              { month: "April", value: "91%" },
              { month: "May", value: "96%" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span>{item.month}</span>
                  <span>{item.value}</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Occupancy Performance</h2>

          <div className="flex justify-center">
            <div className="w-52 h-52 rounded-full border-[20px] border-blue-600 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">87%</h2>
                <p className="text-gray-500">Occupied</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Performance */}
      <div className="bg-white rounded-xl shadow mb-8">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Room Category Performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Total Rooms</th>
                <th className="p-4 text-left">Occupied</th>
                <th className="p-4 text-left">Occupancy Rate</th>
                <th className="p-4 text-left">Revenue</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4">Standard Room</td>
                <td className="p-4">80</td>
                <td className="p-4">70</td>
                <td className="p-4">88%</td>
                <td className="p-4 text-green-600 font-bold">$45,000</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Deluxe Room</td>
                <td className="p-4">40</td>
                <td className="p-4">36</td>
                <td className="p-4">90%</td>
                <td className="p-4 text-green-600 font-bold">$58,000</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Executive Suite</td>
                <td className="p-4">20</td>
                <td className="p-4">16</td>
                <td className="p-4">80%</td>
                <td className="p-4 text-green-600 font-bold">$39,000</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Presidential Suite</td>
                <td className="p-4">5</td>
                <td className="p-4">4</td>
                <td className="p-4">80%</td>
                <td className="p-4 text-green-600 font-bold">$43,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Guest Analytics</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Returning Guests</span>
              <span>41%</span>
            </div>

            <div className="flex justify-between">
              <span>New Guests</span>
              <span>59%</span>
            </div>

            <div className="flex justify-between">
              <span>VIP Guests</span>
              <span>142</span>
            </div>

            <div className="flex justify-between">
              <span>International Guests</span>
              <span>64%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Staff Productivity</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Attendance Rate</span>
              <span>96%</span>
            </div>

            <div className="flex justify-between">
              <span>Tasks Completed</span>
              <span>2,480</span>
            </div>

            <div className="flex justify-between">
              <span>Housekeeping Efficiency</span>
              <span>92%</span>
            </div>

            <div className="flex justify-between">
              <span>Customer Rating</span>
              <span>4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Financial Overview</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Room Revenue</span>
              <span>$128,000</span>
            </div>

            <div className="flex justify-between">
              <span>Restaurant Revenue</span>
              <span>$34,500</span>
            </div>

            <div className="flex justify-between">
              <span>Event Revenue</span>
              <span>$22,900</span>
            </div>

            <div className="flex justify-between font-bold border-t pt-3">
              <span>Total</span>
              <span>$185,400</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
        </div>

        <div className="p-5">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <span>New reservation created for Room 205</span>

              <span className="text-gray-500">10 mins ago</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span>Invoice INV-4589 paid successfully</span>

              <span className="text-gray-500">25 mins ago</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span>Housekeeping completed Room 312</span>

              <span className="text-gray-500">45 mins ago</span>
            </div>

            <div className="flex items-center justify-between">
              <span>VIP Guest checked into Suite 401</span>

              <span className="text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Analytics;
