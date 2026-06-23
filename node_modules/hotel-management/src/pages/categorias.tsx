import { useState } from "react";
import Navbar from "../pages/Navbar";

interface RoomCategory {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  totalRooms: number;
  status: "Active" | "Inactive";
}

const Categories = () => {
  const [search, setSearch] = useState("");

  const categories: RoomCategory[] = [
    {
      id: 1,
      name: "Standard Room",
      description: "Comfortable room for single or double occupancy",
      pricePerNight: 80,
      capacity: 2,
      amenities: ["WiFi", "TV", "Air Conditioning"],
      totalRooms: 35,
      status: "Active",
    },
    {
      id: 2,
      name: "Deluxe Room",
      description: "Spacious room with premium amenities",
      pricePerNight: 150,
      capacity: 3,
      amenities: ["WiFi", "TV", "Mini Bar", "Air Conditioning"],
      totalRooms: 25,
      status: "Active",
    },
    {
      id: 3,
      name: "Executive Suite",
      description: "Luxury suite for business travelers",
      pricePerNight: 250,
      capacity: 4,
      amenities: ["WiFi", "TV", "Mini Bar", "Workspace", "Balcony"],
      totalRooms: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Presidential Suite",
      description: "Premium luxury accommodation",
      pricePerNight: 500,
      capacity: 6,
      amenities: ["WiFi", "TV", "Mini Bar", "Private Lounge", "Jacuzzi"],
      totalRooms: 5,
      status: "Active",
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Navbar>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Room Categories & Pricing
          </h1>
          <p className="text-gray-500">
            Manage room categories, pricing, and amenities.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
          + Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Room Categories</h3>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Rooms</h3>
          <p className="text-3xl font-bold mt-2">80</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Average Price</h3>
          <p className="text-3xl font-bold mt-2">$245</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Luxury Suites</h3>
          <p className="text-3xl font-bold mt-2">20</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <input
          type="text"
          placeholder="Search room category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Room Categories</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price/Night</th>
                <th className="text-left p-4">Capacity</th>
                <th className="text-left p-4">Rooms</th>
                <th className="text-left p-4">Amenities</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-gray-500">
                        {category.description}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ${category.pricePerNight}
                  </td>

                  <td className="p-4">{category.capacity} Guests</td>

                  <td className="p-4">{category.totalRooms}</td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {category.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        category.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Edit
                      </button>

                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Overview */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing Overview</h2>

          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <span>{category.name}</span>
                <span className="font-bold text-green-600">
                  ${category.pricePerNight}/night
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between mb-1">
                  <span>{category.name}</span>
                  <span>{category.totalRooms} Rooms</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${(category.totalRooms / 80) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Categories;
