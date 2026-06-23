import { useState } from "react";
import Navbar from "./Navbar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Navbar>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Settings</h1>

        <p className="text-gray-500 mt-2">
          Manage hotel settings, security, notifications, branding, and
          preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "general"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              General Settings
            </button>

            <button
              onClick={() => setActiveTab("hotel")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "hotel"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Hotel Information
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "security"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Security
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "notifications"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Notifications
            </button>

            <button
              onClick={() => setActiveTab("branding")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "branding"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Branding
            </button>

            <button
              onClick={() => setActiveTab("backup")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === "backup"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Backup & Restore
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">General Settings</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">System Name</label>

                  <input
                    type="text"
                    defaultValue="Hotel Management System"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Time Zone</label>

                  <select className="w-full border rounded-lg px-4 py-3">
                    <option>Africa/Kigali</option>
                    <option>UTC</option>
                    <option>GMT</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Currency</label>

                  <select className="w-full border rounded-lg px-4 py-3">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>RWF (FRw)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Language</label>

                  <select className="w-full border rounded-lg px-4 py-3">
                    <option>English</option>
                    <option>French</option>
                    <option>Kinyarwanda</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* HOTEL INFORMATION */}
          {activeTab === "hotel" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Hotel Information</h2>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Hotel Name"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Hotel Address"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span>Enable Two-Factor Authentication</span>

                  <input type="checkbox" className="w-5 h-5" />
                </div>

                <div className="flex justify-between items-center">
                  <span>Require Strong Passwords</span>

                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex justify-between items-center">
                  <span>Auto Logout After Inactivity</span>

                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Notification Settings
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>Email Notifications</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex justify-between">
                  <span>SMS Notifications</span>
                  <input type="checkbox" className="w-5 h-5" />
                </div>

                <div className="flex justify-between">
                  <span>Booking Alerts</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex justify-between">
                  <span>Payment Alerts</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </>
          )}

          {/* BRANDING */}
          {activeTab === "branding" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Branding Settings</h2>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2">Upload Hotel Logo</label>

                  <input type="file" className="w-full border rounded-lg p-3" />
                </div>

                <div>
                  <label className="block mb-2">Primary Color</label>

                  <input
                    type="color"
                    defaultValue="#2563eb"
                    className="w-20 h-12"
                  />
                </div>
              </div>
            </>
          )}

          {/* BACKUP */}
          {activeTab === "backup" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Backup & Restore</h2>

              <div className="space-y-5">
                <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
                  Create Backup
                </button>

                <button className="bg-orange-600 text-white px-5 py-3 rounded-lg ml-3">
                  Restore Backup
                </button>

                <div className="border rounded-lg p-4">
                  <p>
                    Last Backup:
                    <strong> 14 June 2026 - 10:30 AM</strong>
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="mt-10 border-t pt-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Settings;
