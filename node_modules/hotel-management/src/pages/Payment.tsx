import { useState } from "react";
import Navbar from "./Navbar";

interface Payment {
  id: string;
  guestName: string;
  roomNumber: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Partial" | "Refunded";
  date: string;
}

const Payments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments: Payment[] = [
    {
      id: "PAY001",
      guestName: "John Doe",
      roomNumber: "101",
      invoiceNumber: "INV1001",
      amount: 450,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      date: "2026-06-14",
    },
    {
      id: "PAY002",
      guestName: "Sarah Johnson",
      roomNumber: "205",
      invoiceNumber: "INV1002",
      amount: 1200,
      paymentMethod: "Bank Transfer",
      paymentStatus: "Pending",
      date: "2026-06-14",
    },
    {
      id: "PAY003",
      guestName: "Michael Brown",
      roomNumber: "310",
      invoiceNumber: "INV1003",
      amount: 300,
      paymentMethod: "Cash",
      paymentStatus: "Partial",
      date: "2026-06-13",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.guestName.toLowerCase().includes(search.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || payment.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-red-100 text-red-700";

      case "Partial":
        return "bg-yellow-100 text-yellow-700";

      case "Refunded":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payments & Invoices</h1>

          <p className="text-gray-500">
            Manage guest payments, invoices, and billing records.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          + Generate Invoice
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Today's Revenue</h3>

          <p className="text-4xl font-bold text-green-600 mt-2">$4,250</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending Payments</h3>

          <p className="text-4xl font-bold text-red-600 mt-2">$1,950</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Paid Invoices</h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">125</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Outstanding Balance</h3>

          <p className="text-4xl font-bold text-orange-600 mt-2">$3,450</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search guest or invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Payment Records</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Invoice</th>

                <th className="p-4 text-left">Guest</th>

                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Payment Method</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{payment.invoiceNumber}</td>

                  <td className="p-4">{payment.guestName}</td>

                  <td className="p-4">{payment.roomNumber}</td>

                  <td className="p-4 font-bold text-green-600">
                    ${payment.amount}
                  </td>

                  <td className="p-4">{payment.paymentMethod}</td>

                  <td className="p-4">{payment.date}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        payment.paymentStatus,
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>

                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Print
                      </button>

                      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Revenue Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Room Revenue</span>
              <span className="font-bold">$54,000</span>
            </div>

            <div className="flex justify-between">
              <span>Restaurant Revenue</span>
              <span className="font-bold">$12,500</span>
            </div>

            <div className="flex justify-between">
              <span>Event Revenue</span>
              <span className="font-bold">$8,900</span>
            </div>

            <div className="flex justify-between border-t pt-4">
              <span className="font-semibold">Total Revenue</span>

              <span className="font-bold text-green-600">$75,400</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Payment Methods</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Credit Card</span>
              <span>48%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div className="bg-blue-600 h-3 w-[48%] rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <span>Cash</span>
              <span>25%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div className="bg-green-600 h-3 w-[25%] rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <span>Bank Transfer</span>
              <span>18%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div className="bg-purple-600 h-3 w-[18%] rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <span>Mobile Money</span>
              <span>9%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div className="bg-orange-500 h-3 w-[9%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Payments;
