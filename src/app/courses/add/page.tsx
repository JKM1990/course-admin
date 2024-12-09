"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendJSONData } from "@/tools/Toolkit";

export default function AddCourse() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
      <h2 className="text-xl text-emerald-600 mb-6">Add New Course:</h2>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Course Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            required
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Ok
          </button>
          <Link href="/" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
            Cancel
          </Link>
        </div>
      </form>

      <footer className="mt-8 text-gray-600">
        Web App powered by <span className="text-emerald-600">NextJS</span> |{" "}
        <span className="text-emerald-600">MongoDB</span>
      </footer>
    </div>
  );
}