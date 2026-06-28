import { useHotel } from "../context/HotelContext";
import { useState } from "react";
import Navbar from "./Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { type Reservation } from "../data/reservations";

type ReservationForm = Omit<Reservation, "id">;

const Reservations = () => {
  const { reservations, setReservations, rooms } = useHotel();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [newReservation, setNewReservation] = useState<ReservationForm>({
    guestName: "",
    email: "",
    roomNumber: "",
    paymentStatus: "Pending",
    roomType: "",
    guests: 1,
    checkInDate: "",
    checkOutDate: "",
    bookingStatus: "Pending",
    amount: 0,
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRooms, setFilterRooms] = useState("All");
  const roomCategories = Array.from(
    new Set(rooms.map((room) => room.category)),
  );

  const handleCreateReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reservationData = {
      id: Date.now().toString(),
      ...newReservation,
    };

    setReservations((prev) => [...prev, reservationData]);

    setShowCreateModal(false);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.guestName.toLowerCase().includes(search.toLowerCase()) ||
      reservation.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || reservation.bookingStatus === filterStatus;

    const matchesRooms =
      filterRooms === "All" || reservation.roomType === filterRooms;

    return matchesSearch && matchesStatus && matchesRooms;
  });

  // Statistics Formula
  const today = new Date().toISOString().split("T")[0];

  const totalReservations = reservations.length;

  const confirmedReservations = reservations.filter(
    (reservation) => reservation.bookingStatus === "Confirmed",
  ).length;

  const pendingReservations = reservations.filter(
    (reservation) => reservation.bookingStatus === "Pending",
  ).length;

  const todayCheckIns = reservations.filter(
    (reservation) => reservation.checkInDate === today,
  ).length;

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
      case "Balance":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  {
    /* Export Reservations code */
  }

  const exportReservations = () => {
    const exportData = reservations.map((reservation) => ({
      ReservationID: reservation.id,
      GuestName: reservation.guestName,
      Email: reservation.email,
      RoomNumber: reservation.roomNumber,
      RoomType: reservation.roomType,
      Guests: reservation.guests,
      CheckIn: reservation.checkInDate,
      CheckOut: reservation.checkOutDate,
      BookingStatus: reservation.bookingStatus,
      PaymentStatus: reservation.paymentStatus,
      Amount: reservation.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, `Reservations_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Navbar>
      <div className=" ">
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

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            + New Reservation
          </button>
        </div>

        {/* Reservation popup form */}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[750px] max-h-[90vh] overflow-y-auto">
              {/* Header */}

              <div className="flex justify-between items-center border-b p-5">
                <h2 className="text-2xl font-bold">New Reservation</h2>

                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>

              <form className="p-6" onSubmit={handleCreateReservation}>
                <div className="grid grid-cols-2 gap-5">
                  {/* Name */}

                  <div>
                    <label className="block mb-2 font-semibold">Name</label>

                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg p-3"
                      placeholder="Full Name"
                      value={newReservation.guestName}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          guestName: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label className="block mb-2 font-semibold">Email</label>

                    <input
                      type="email"
                      required
                      className="w-full border rounded-lg p-3"
                      placeholder="Email Address"
                      value={newReservation.email}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Room Number */}

                  <div>
                    <label className="block mb-2 font-semibold">
                      Room Number
                    </label>

                    <select
                      required
                      className="w-full border rounded-lg p-3"
                      value={newReservation.roomNumber}
                      onChange={(e) => {
                        const selectedRoom = rooms.find(
                          (room) => room.roomNumber === e.target.value,
                        );

                        setNewReservation({
                          ...newReservation,
                          roomNumber: e.target.value,
                          roomType: selectedRoom?.category ?? "",
                        });
                      }}
                    >
                      <option value="">Select Room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.roomNumber}>
                          {room.roomNumber}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Type */}

                  <div>
                    <label className="block mb-2 font-semibold">
                      Room Type
                    </label>

                    <select
                      required
                      className="w-full border rounded-lg p-3"
                      value={newReservation.roomType}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          roomType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Room Type</option>
                      {roomCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Guests */}

                  <div>
                    <label className="block mb-2 font-semibold">
                      Number of Guests
                    </label>

                    <input
                      type="number"
                      min={1}
                      required
                      className="w-full border rounded-lg p-3"
                      value={newReservation.guests}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          guests: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Guest Amount */}

                  <div>
                    <label className="block mb-2 font-semibold">Amount</label>

                    <input
                      type="number"
                      required
                      className="w-full border rounded-lg p-3"
                      placeholder="Payment Amount"
                      value={newReservation.amount}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Check In */}

                  <div>
                    <label className="block mb-2 font-semibold">
                      Check-In Date
                    </label>

                    <input
                      type="date"
                      required
                      className="w-full border rounded-lg p-3"
                      value={newReservation.checkInDate}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          checkInDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Check Out */}

                  <div>
                    <label className="block mb-2 font-semibold">
                      Check-Out Date
                    </label>

                    <input
                      type="date"
                      required
                      className="w-full border rounded-lg p-3"
                      value={newReservation.checkOutDate}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          checkOutDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Booking Status */}

                  <div className="col-span-2">
                    <label className="block mb-2 font-semibold">
                      Booking Status
                    </label>

                    <select
                      className="w-full border rounded-lg p-3"
                      value={newReservation.bookingStatus}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          bookingStatus: e.target
                            .value as Reservation["bookingStatus"],
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Checked In</option>
                      <option>Checked Out</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  {/* Payment Status */}

                  <div className="col-span-2">
                    <label className="block mb-2 font-semibold">
                      Payment Status
                    </label>

                    <select
                      className="w-full border rounded-lg p-3"
                      value={newReservation.paymentStatus}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          paymentStatus: e.target
                            .value as Reservation["paymentStatus"],
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Partial</option>
                      <option>Balance</option>
                    </select>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-3 rounded-lg bg-gray-500 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
                  >
                    Save Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-bold">{totalReservations}</h2>

            <p className="text-gray-500">Total Reservations</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-bold text-green-600">
              {confirmedReservations}
            </h2>

            <p className="text-gray-500">Confirmed</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-bold text-yellow-500">
              {pendingReservations}
            </h2>

            <p className="text-gray-500">Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-bold text-blue-600">
              {todayCheckIns}
            </h2>

            <p className="text-gray-500">Today's Check-In</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow p-10  mb-6">
          <div className=" flex md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Search reservation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg  w-[50%]"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Checked In">Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filterRooms}
              onChange={(e) => setFilterRooms(e.target.value)}
              className="border border-gray-300 rounded-lg  w-[50%]"
            >
              <option value="All">All Rooms</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential</option>
            </select>
            <button
              onClick={exportReservations}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-3 rounded-lg w-[50%]  "
            >
              Export Reservations
            </button>
          </div>
        </div>

        {/* View Reservation Modal */}

        {showViewModal && selectedReservation && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[50%]">
              <h2 className="text-2xl font-bold mb-5">Reservation Details</h2>

              <p>
                <strong>Guest:</strong> {selectedReservation.guestName}
              </p>

              <p>
                <strong>Room:</strong> {selectedReservation.roomType}
              </p>

              <p>
                <strong>Check In:</strong> {selectedReservation.checkInDate}
              </p>

              <p>
                <strong>Check Out:</strong> {selectedReservation.checkOutDate}
              </p>

              <p>
                <strong>Guests:</strong> {selectedReservation.guests}
              </p>

              <p>
                <strong>Status:</strong> {selectedReservation.bookingStatus}
              </p>
              <p>
                <strong>Email:</strong> {selectedReservation.email}
              </p>

              <button
                onClick={() => setShowViewModal(false)}
                className="mt-5 bg-blue-700 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Edit Reservation Modal */}

        {showEditModal && selectedReservation && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[650px]">
              <h2 className="text-2xl font-bold mb-5">Edit Reservation</h2>

              <input
                className="w-full border p-3 rounded mb-3"
                value={selectedReservation.guestName}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,

                    guestName: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-3 rounded mb-3"
                value={selectedReservation.roomType}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,
                    roomType: e.target.value,
                  })
                }
              />

              <input
                type="date"
                className="w-full border p-3 rounded mb-3"
                value={selectedReservation.checkInDate}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,
                    checkInDate: e.target.value,
                  })
                }
              />

              <input
                type="date"
                className="w-full border p-3 rounded mb-3"
                value={selectedReservation.checkOutDate}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,
                    checkOutDate: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-3 rounded mb-4"
                value={selectedReservation.bookingStatus}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,
                    bookingStatus: e.target
                      .value as Reservation["bookingStatus"],
                  })
                }
              >
                <option>Pending</option>

                <option>Confirmed</option>

                <option>Checked In</option>

                <option>Cancelled</option>
              </select>

              <button
                className="bg-blue-500 text-white px-5 py-2 rounded"
                onClick={() => {
                  setReservations(
                    reservations.map((reservation) =>
                      reservation.id === selectedReservation.id
                        ? selectedReservation
                        : reservation,
                    ),
                  );

                  setShowEditModal(false);
                }}
              >
                Update Reservation
              </button>
            </div>
          </div>
        )}

        {/* Reservation Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden  ">
          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold">Reservation List</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2">Booking ID</th>
                  <th className="text-left p-2">Guest</th>
                  <th className="text-left p-2">Room</th>
                  <th className="text-left p-3 w-[10px] truncate">
                    Stay Period
                  </th>
                  <th className="text-left p-2">Guests</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Payment</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-2 font-medium">{reservation.id}</td>

                    <td className="p-2">
                      <div>
                        <p className="font-semibold">{reservation.guestName}</p>
                        <p className="text-sm text-gray-500 w-[100px] truncate">
                          {reservation.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-2">
                      <div>
                        <p>{reservation.roomNumber}</p>
                        <p className="text-sm text-gray-500">
                          {reservation.roomType}
                        </p>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-sm w-[50px] truncate">
                        <p>{reservation.checkInDate}</p>
                        <p className="text-gray-500 w-[50px] truncate">
                          to {reservation.checkOutDate}
                        </p>
                      </div>
                    </td>

                    <td className="p-2">{reservation.guests}</td>

                    <td className="p-2 font-semibold">${reservation.amount}</td>

                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusColor(
                          reservation.paymentStatus,
                        )}`}
                      >
                        {reservation.paymentStatus}
                      </span>
                    </td>

                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getBookingStatusColor(
                          reservation.bookingStatus,
                        )}`}
                      >
                        {reservation.bookingStatus}
                      </span>
                    </td>

                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setShowViewModal(true);
                          }}
                        >
                          View
                        </button>

                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setSelectedReservation({ ...reservation });
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            if (window.confirm("Delete Reservation?")) {
                              setReservations((prev) =>
                                prev.filter(
                                  (item) => item.id !== reservation.id,
                                ),
                              );
                            }
                          }}
                        >
                          Delete
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
      </div>
    </Navbar>
  );
};

export default Reservations;
