"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CourseDocument } from "@/tools/data.model";

export default function DeleteCourse({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<CourseDocument | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch("/api/all");
      const data = await response.json();
      const course = data.courses.find((c: CourseDocument) => c._id === params.id);
      if (course) {
        setCourse(course);
      }
    };
    fetchCourse();
  }, [params.id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">Are you sure you want to delete the follow course?</p>
        <p className="text-gray-700">{course.code} {course.name}</p>
      </div>

      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Ok
        </button>
        <Link href="/" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
          Cancel
        </Link>
      </div>
    </div>
  );
}