"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Student = {
  _id: string;
  name: string;
  email: string;
};

export default function AddResultPage() {
  const router = useRouter();
  
  // State for form
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [course, setCourse] = useState("");
  const [score, setScore] = useState("");
  const [gradePreview, setGradePreview] = useState("");
  const [pointPreview, setPointPreview] = useState("");
  
  // State for feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // Fetch students list
  useEffect(() => {
    const fetchStudents = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/attendance/students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError("Could not load students. Please try again.");
      }
    };

    fetchStudents();
  }, [router]);

  // Calculate grade preview when score changes
  useEffect(() => {
    if (score && !isNaN(Number(score))) {
      const numScore = parseInt(score);
      if (numScore >= 0 && numScore <= 100) {
        calculateGrade(numScore);
      }
    } else {
      setGradePreview("");
      setPointPreview("");
    }
  }, [score]);

  // Grade calculation function (same as backend)
  const calculateGrade = (score: number) => {
    let grade = "";
    let point = 0;

    if (score >= 90 && score <= 100) {
      grade = "A+";
      point = 4.0;
    } else if (score >= 85 && score <= 89) {
      grade = "A";
      point = 4.0;
    } else if (score >= 80 && score <= 84) {
      grade = "A-";
      point = 3.79;
    } else if (score >= 75 && score <= 79) {
      grade = "B+";
      point = 3.5;
    } else if (score >= 70 && score <= 74) {
      grade = "B";
      point = 3.0;
    } else if (score >= 65 && score <= 69) {
      grade = "B-";
      point = 2.79;
    } else if (score >= 60 && score <= 64) {
      grade = "C+";
      point = 2.5;
    } else if (score >= 55 && score <= 59) {
      grade = "C";
      point = 2.0;
    } else if (score >= 50 && score <= 54) {
      grade = "C-";
      point = 1.79;
    } else {
      grade = "F";
      point = 0.0;
    }

    setGradePreview(grade);
    setPointPreview(point.toString());
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Validation
    if (!selectedStudent) {
      setError("Please select a student");
      setLoading(false);
      return;
    }

    if (!course.trim()) {
      setError("Please enter course name");
      setLoading(false);
      return;
    }

    const numScore = parseInt(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      setError("Score must be between 0 and 100");
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/results/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          course: course.trim(),
          score: numScore,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add result");
      }

      // Success
      setMessage("✅ Result added successfully!");
      setSelectedStudent("");
      setCourse("");
      setScore("");
      setGradePreview("");
      setPointPreview("");

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // If not logged in, redirect
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add Student Result</h1>
          <p className="text-gray-600 mt-2">
            Enter marks for a student. Grade and GPA points will be calculated automatically.
          </p>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student *
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              >
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Course Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name *
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g., Database Systems, Web Development"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Score Input with Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score (0-100) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter score (0-100)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter a number between 0 and 100
                  </p>
                </div>

                {/* Grade Preview */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium text-gray-700 mb-2">Grade Preview</h3>
                  {gradePreview ? (
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{gradePreview}</div>
                        <div className="text-sm text-gray-500">Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{pointPreview}</div>
                        <div className="text-sm text-gray-500">Points</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Enter score to see grade preview</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding Result...
                  </span>
                ) : (
                  "Add Result"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-medium text-blue-800 mb-2">📊 Grading System</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>A+</strong> (90‑100) = 4.0 points</p>
            <p><strong>A</strong> (85‑89) = 4.0 points</p>
            <p><strong>A‑</strong> (80‑84) = 3.79 points</p>
            <p><strong>B+</strong> (75‑79) = 3.5 points</p>
            <p><strong>B</strong> (70‑74) = 3.0 points</p>
            <p><strong>B‑</strong> (65‑69) = 2.79 points</p>
            <p><strong>C+</strong> (60‑64) = 2.5 points</p>
            <p><strong>C</strong> (55‑59) = 2.0 points</p>
            <p><strong>C‑</strong> (50‑54) = 1.79 points</p>
            <p><strong>F</strong> (Below 50) = 0.0 points</p>
          </div>
        </div>
      </div>
    </div>
  );
}