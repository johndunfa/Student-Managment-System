"use client";

import { useEffect, useState } from "react";

type Record = {
  _id: string;
  date: string;
  status: string;
  student: {
    name: string;
    email: string;
  };
  markedBy: {
    name: string;
  };
};

export default function AttendanceReportPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [date, setDate] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchReport = () => {
    let url = "http://localhost:5000/api/attendance/report";
    if (date) url += `?date=${date}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRecords(data));
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Report</h1>

      <div className="mb-4">
        <input
          type="date"
          className="border p-2"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={fetchReport}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Marked By</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.student.name}</td>
              <td className="border p-2">{r.student.email}</td>
              <td className="border p-2">{r.date}</td>
              <td
                className={`border p-2 ${
                  r.status === "Present"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {r.status}
              </td>
              <td className="border p-2">{r.markedBy.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
