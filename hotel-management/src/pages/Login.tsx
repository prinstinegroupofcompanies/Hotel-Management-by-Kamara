import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const DEMO_USERNAME = "Prinstinegroup";
  const DEMO_PASSWORD = "Prinstinegroup123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      localStorage.setItem("hotelAuth", "true");

      navigate("/Dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-blue-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Prinstine Hotel Management System
          </h1>

          <p className="text-xl opacity-90">
            Manage reservations, guests, rooms, payments, housekeeping, and
            staff from one dashboard.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

          <p className="text-center text-gray-500 mb-8">Sign in to continue</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Demo Login</h3>

            <p>
              <strong>Username:</strong> Prinstinegroup
            </p>

            <p>
              <strong>Password:</strong> Prinstinegroup123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
