"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CourseDocument } from "@/tools/data.model";
import { sendJSONData } from "@/tools/Toolkit";

export default function EditCourse({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<CourseDocument | null>(null);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch("/api/all");
      const data = await response.json();
      const course = data.courses.find((c: CourseDocument) => c._id === params.id);
      if (course) {
        setCourse(course);
        setName(course.name);
      }
    };
    fetchCourse();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await sendJSONData(
      `/api/courses/update/${params.id}`,
      { name },
      "PUT"
    );

    if (!response) {
      setErrorMessage("No response received");
      return;
    }

    if (response.status === 200) {
      router.push("/");
      router.refresh();
    } else if (response.status === 404) {
      setErrorMessage("Course not found");
    } else {
      setErrorMessage("Error updating course");
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
      <h2 className="text-xl text-emerald-600 mb-6">Edit Course:</h2>

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
            value={course.code}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
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