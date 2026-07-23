"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Result = {
  _id: string;
  course: string;
  score: number;
  grade: string;
  point: number;
  createdAt: string;
};

export default function StudentResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          router.push("/login");
          return;
        }

        // Call backend API
        const response = await fetch("http://localhost:5000/api/results/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle unauthorized
        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        // Handle other errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Check if data is array
        if (Array.isArray(data)) {
          setResults(data);
          
          // Calculate GPA if results exist
          if (data.length > 0) {
            const totalPoints = data.reduce((sum, result) => sum + result.point, 0);
            const averageGPA = totalPoints / data.length;
            setGpa(parseFloat(averageGPA.toFixed(2)));
          }
        } else {
          setError("Invalid response format");
        }

      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router]);

  // Calculate overall GPA
  const calculateGPA = () => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, result) => sum + result.point, 0);
    return parseFloat((total / results.length).toFixed(2));
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Determine grade color
  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "text-green-600 bg-green-50";
    if (grade.includes("B")) return "text-blue-600 bg-blue-50";
    if (grade.includes("C")) return "text-yellow-600 bg-yellow-50";
    if (grade.includes("D")) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Academic Results</h1>
          <p className="text-gray-600 mt-2">View all your course grades and GPA</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please contact your teacher if results should be visible.</p>
          </div>
        )}

        {/* GPA Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Cumulative GPA</h2>
              <p className="text-blue-100">Based on {results.length} course(s)</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-5xl font-bold">{gpa}</div>
              <div className="text-center text-blue-100 mt-2">out of 4.0</div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Course Results</h3>
            <p className="text-sm text-gray-600">
              {results.length === 0 ? "No results found" : `${results.length} course(s) completed`}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Results Available</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Your results will appear here once your teacher enters your marks.
              </p>
              <button
                onClick={() => router.push("/student")}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.score}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
                            result.grade
                          )}`}
                        >
                          {result.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.point.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(result.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.point >= 2.0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Footer */}
          {results.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {results.length} course(s)
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Average Score:{" "}
                  {(
                    results.reduce((sum, result) => sum + result.score, 0) /
                    results.length
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        {results.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h4 className="font-medium text-gray-700 mb-2">Grade Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded-full mr-2"></span>
                <span>A (4.0) - Excellent</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full mr-2"></span>
                <span>B (3.0) - Good</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full mr-2"></span>
                <span>C (2.0) - Satisfactory</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-100 border border-orange-300 rounded-full mr-2"></span>
                <span>D (1.0) - Passing</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-100 border border-red-300 rounded-full mr-2"></span>
                <span>F (0.0) - Failed</span>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <h4 className="font-medium text-gray-700 mb-2">Debug Information</h4>
          <p className="text-gray-600">
            API Endpoint: <code>GET /api/results/me</code>
          </p>
          <p className="text-gray-600">
            Results Count: {results.length}
          </p>
          <p className="text-gray-600">
            Current GPA: {gpa}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}