"use client";

import { useEffect, useState } from "react";

type Attendance = {
  _id: string;
  date: string;
  status: string;
};

export default function StudentAttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAttendance(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Attendance</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id}>
              <td className="border p-2">{a.date}</td>
              <td
                className={`border p-2 ${
                  a.status === "Present"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
