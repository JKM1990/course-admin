"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendJSONData } from "@/tools/Toolkit";

export default function AddCourse() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await sendJSONData(
      "/api/courses/create",
      {
        // convert the course code entered, to uppercase to check for distinct entry
        code: code.toUpperCase(),
        name
      },
      "POST"
    );

    if (!response) {
      setErrorMessage("No response received");
      return;
    }

    if (response.status === 200) {
      router.push("/");
      router.refresh();
    } else if (response.status === 400) {
      setErrorMessage("Course code must be unique");
    } else {
      setErrorMessage("Error creating course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
        <h2 className="text-xl text-emerald-600 mb-6">Add New Course:</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-red-600 mb-4">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Course Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={8}
              required
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
              Ok
            </button>
            <Link
              href="/"
              className="px-4 py-2 border bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </Link>
          </div>
        </form>

        <footer className="mt-8 text-gray-600">
          Web App powered by <span className="text-emerald-600">NextJS</span> |{" "}
          <span className="text-emerald-600">MongoDB</span>
        </footer>
      </div>
    </div>
  );
}