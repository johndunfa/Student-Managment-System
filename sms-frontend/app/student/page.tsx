"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function StudentDashboard() {
    const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/students/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Access denied");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
          
            

      <div className="bg-white p-4 rounded shadow w-96">
        <p><strong>Name:</strong> {student?.name}</p>
        <p><strong>Email:</strong> {student?.email}</p>
        <p><strong>Role:</strong> {student?.role}</p>
      </div>
        <div
  onClick={() => (window.location.href = "/student/results")}
  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-green-300"
>
  <div className="flex items-center mb-3">
    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
      <span className="text-green-600 text-xl">📊</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800">My Results</h3>
  </div>
  <p className="text-gray-600 text-sm">
    View all your grades, GPA, and academic performance
  </p>
</div>
       <div  onClick={() => (window.location.href = "/student/attendance")}
             className="bg-white p-4 rounded shadow cursor-pointer">
             <h2 className="text-xl font-semibold">My Attendance</h2>
             <p>View attendance records</p>
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
