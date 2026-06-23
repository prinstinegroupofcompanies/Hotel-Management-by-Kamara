import { useState } from "react";
import Navbar from "./Navbar";

interface Room {
  id: number;
  roomNumber: string;
  category: string;
  floor: number;
  capacity: number;
  price: number;
  status: "Available" | "Occupied" | "Reserved" | "Maintenance";
  guest?: string;
}

const Room = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const initialRooms: Room[] = [
    {
      id: 1,
      roomNumber: "101",
      category: "Standard",
      floor: 1,
      capacity: 2,
      price: 50,
      status: "Available",
    },
    {
      id: 2,
      roomNumber: "102",
      category: "Deluxe",
      floor: 1,
      capacity: 3,
      price: 80,
      status: "Occupied",
      guest: "Jane Doe",
    },
  ];

  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Delete Function

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?",
    );

    if (confirmDelete) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  // View Function

  const handleView = (room: Room) => {
    setSelectedRoom(room);
    setShowViewModal(true);
  };

  // View Function

  /* Edit Function */
  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  /* Edit Function */

  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoom) {
      return;
    }

    setRooms(
      rooms.map((room) => (room.id === selectedRoom.id ? selectedRoom : room)),
    );

    setShowEditModal(false);
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.includes(search) ||
      room.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || room.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-red-100 text-red-700";
      case "Reserved":
        return "bg-yellow-100 text-yellow-700";
      case "Maintenance":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>

          <p className="text-gray-500">
            Manage hotel rooms, occupancy, and room status.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
          + Add Room
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Rooms</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Available</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">24</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Occupied</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">82</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Maintenance</h3>
          <p className="text-3xl font-bold text-gray-700 mt-2">14</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search room number or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Room Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Room Inventory</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Room No.</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Floor</th>
                <th className="text-left p-4">Capacity</th>
                <th className="text-left p-4">Price/Night</th>
                <th className="text-left p-4">Guest</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold">{room.roomNumber}</td>

                  <td className="p-4">{room.category}</td>

                  <td className="p-4">Floor {room.floor}</td>

                  <td className="p-4">{room.capacity} Guests</td>

                  <td className="p-4 font-semibold text-green-600">
                    ${room.price}
                  </td>

                  <td className="p-4">{room.guest || "-"}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        room.status,
                      )}`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(room)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(room)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(room.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* View Modal popup */}

              {showViewModal && selectedRoom && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[500px]">
                    <h2 className="text-2xl font-bold mb-4">Room Details</h2>

                    <div className="space-y-3">
                      <p>
                        <strong>Room Number:</strong> {selectedRoom.roomNumber}
                      </p>

                      <p>
                        <strong>Category:</strong> {selectedRoom.category}
                      </p>

                      <p>
                        <strong>Price:</strong> ${selectedRoom.price}
                      </p>

                      <p>
                        <strong>Status:</strong> {selectedRoom.status}
                      </p>
                    </div>

                    <div className="mt-6 text-right">
                      <button
                        onClick={() => setShowViewModal(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Modal popup */}

              {showEditModal && selectedRoom && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[600px]">
                    <h2 className="text-2xl font-bold mb-4">Edit Room</h2>

                    <form onSubmit={handleUpdateRoom} className="space-y-4">
                      <input
                        type="text"
                        value={selectedRoom.roomNumber}
                        onChange={(e) =>
                          setSelectedRoom({
                            ...selectedRoom,
                            roomNumber: e.target.value,
                          })
                        }
                        className="w-full border p-3 rounded"
                      />

                      <select
                        value={selectedRoom.category}
                        onChange={(e) =>
                          setSelectedRoom({
                            ...selectedRoom,
                            category: e.target.value,
                          })
                        }
                        className="w-full border p-3 rounded"
                      >
                        <option>Standard</option>
                        <option>Deluxe</option>
                        <option>Executive Suite</option>
                        <option>Presidential Suite</option>
                      </select>

                      <input
                        type="number"
                        value={selectedRoom.price}
                        onChange={(e) =>
                          setSelectedRoom({
                            ...selectedRoom,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full border p-3 rounded"
                      />

                      <select
                        value={selectedRoom.status}
                        onChange={(e) =>
                          setSelectedRoom({
                            ...selectedRoom,
                            status: e.target.value as Room["status"],
                          })
                        }
                        className="w-full border p-3 rounded"
                      >
                        <option>Available</option>
                        <option>Occupied</option>
                        <option>Maintenance</option>
                      </select>

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowEditModal(false)}
                          className="px-5 py-2 bg-gray-500 text-white rounded"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="px-5 py-2 bg-green-600 text-white rounded"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-gray-500">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Status Summary */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Room Status Overview</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Available Rooms</span>
              <span className="font-bold text-green-600">24</span>
            </div>

            <div className="flex justify-between">
              <span>Occupied Rooms</span>
              <span className="font-bold text-red-600">82</span>
            </div>

            <div className="flex justify-between">
              <span>Reserved Rooms</span>
              <span className="font-bold text-yellow-600">10</span>
            </div>

            <div className="flex justify-between">
              <span>Maintenance Rooms</span>
              <span className="font-bold text-gray-700">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Occupancy Rate</h2>

          <div className="w-full bg-gray-200 rounded-full h-5">
            <div className="bg-green-500 h-5 rounded-full w-[82%]"></div>
          </div>

          <p className="mt-3 text-gray-600">
            Current Occupancy: <strong>82%</strong>
          </p>
        </div>
      </div>
    </Navbar>
  );
};

export default Room;
