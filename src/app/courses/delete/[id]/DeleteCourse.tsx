"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DeleteCourseProps } from "@/tools/data.model";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function DeleteCourse({ course }:
  DeleteCourseProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleDelete = async () => {
    setIsLoading(true);

    const response = await sendJSONData(
      `/api/courses/delete/${course._id}`,
      {},
      "DELETE"
    );

    if (!response) {
      setErrorMessage("No response received");
      setIsLoading(false);
      return;
    }

    if (response.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      setErrorMessage("Error deleting course");
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && <LoadingOverlay />}
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">Are you sure you want to delete the follow course?</p>
          <p className="text-gray-700">{course.code} {course.name}</p>
        </div>

        {errorMessage && (
          <div className="text-red-600 mb-4">
            {errorMessage}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Ok
          </button>
          <Link href="/" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
}