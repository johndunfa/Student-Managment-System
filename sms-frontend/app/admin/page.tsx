"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
  onClick={() => window.location.href = "/admin/add-student"}
  className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
>
  <h2 className="text-xl font-semibold">Students</h2>
  <p className="text-gray-600">Add new students</p>
</div>
 <div
  onClick={() => window.location.href = "/admin/students"}
  className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
>
  <h2 className="text-xl font-semibold">Students</h2>
  <p className="text-gray-600">View all students</p>
</div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Teachers</h2>
          <p className="text-gray-600">Manage teachers</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Courses</h2>
          <p className="text-gray-600">Manage courses</p>
        </div>
      </div>
      <div className="flex justify-end mb-4">
  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>
    </div>
  );
}
