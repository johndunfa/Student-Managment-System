"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Teacher = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // For now, reuse /students/me logic style
    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.role !== "teacher") {
          router.push("/login");
          return;
        }
        setTeacher(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Access denied");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-7">Teacher Dashboard</h1>

      <div className="bg-white p-4 rounded shadow w-96">
        <p><strong>Name:</strong> {teacher?.name}</p>
        <p><strong>Email:</strong> {teacher?.email}</p>
        <p><strong>Role:</strong> {teacher?.role}</p>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div
        onClick={() => (window.location.href = "/teacher/attendance")}
        className="bg-white p-4 rounded shadow cursor-pointer"
      >
        <h2 className="text-xl font-semibold">Attendance</h2>
        <p className="text-gray-600">Mark student attendance</p>
</div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Attendance</h2>
          <p className="text-gray-600">Mark student attendance</p>
        </div>
             <div
                           onClick={() => (window.location.href = "/teacher/report")}
             className="bg-white p-4 rounded shadow cursor-pointer"
               >
             <h2 className="text-xl font-semibold">Attendance Report</h2>
             <p>View attendance records</p>
             </div>
               <div
  onClick={() => (window.location.href = "/teacher/add-result")}
  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
>
  <div className="flex items-center mb-3">
    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
      <span className="text-green-600 text-xl">📊</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800">Add Results</h3>
  </div>
  <p className="text-gray-600 text-sm">
    Enter student marks, automatically calculate grades
  </p>
</div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Results</h2>
          <p className="text-gray-600">Add student marks</p>
        </div>
      </div>
    </div>
  );
}
