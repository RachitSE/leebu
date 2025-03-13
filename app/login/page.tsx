"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dbStatus, setDbStatus] = useState<string | null>(null);

  const correctPassword = "drake";

  // Check DB connection on page load
  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const res = await fetch("/api/db-check");
        const data = await res.json();
        if (res.ok) {
          setDbStatus(data.message);
        } else {
          setDbStatus("❌ Database connection failed");
        }
      } catch (err) {
        setDbStatus("❌ Database connection failed");
      }
    };

    checkDbConnection();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      Cookies.set("auth", "loggedIn", { expires: 1 }); // Set cookie for 1 day
      router.push("/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* Show DB connection status */}
        {dbStatus && (
          <div
            className={`p-3 mb-4 text-center ${
              dbStatus.includes("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {dbStatus}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
