"use client";

import { useEffect, useState } from "react";

type Student = {
  _id: string;
  name: string;
  email: string;
};

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [date, setDate] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const markAttendance = async (studentId: string, status: string) => {
    await fetch("http://localhost:5000/api/attendance/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId,
        status,
        date,
      }),
    });

    alert("Attendance saved");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>

      <input
        type="date"
        className="border p-2 mb-4"
        onChange={(e) => setDate(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => markAttendance(s._id, "Present")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Present
                </button>
                <button
                  onClick={() => markAttendance(s._id, "Absent")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
