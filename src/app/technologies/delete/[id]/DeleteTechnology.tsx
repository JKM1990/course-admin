"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DeleteTechnologyProps } from "@/tools/data.model";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function DeleteTechnology({ technology }: DeleteTechnologyProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);

    const response = await sendJSONData(
      `/api/technologies/delete/${technology._id}`,
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
      setErrorMessage("Error deleting technology");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="min-h-screen bg-gray-200">
        <div className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">Are you sure you want to delete the follow technology?</p>
            <p className="text-emerald-600 font-bold">{technology.name}</p>
          </div>

          {errorMessage && (
            <div className="text-red-600 mb-4">
              {errorMessage}
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              Ok
            </button>
            <Link href="/" className="px-4 py-2 border bg-red-500 text-white rounded hover:bg-red-600">
              Cancel
            </Link>
          </div>

          <footer className="mt-8 text-gray-600">
            Web App powered by <span className="text-emerald-600">NextJS</span> |{" "}
            <span className="text-emerald-600">MongoDB</span>
          </footer>
        </div>
      </div>
    </>
  );
}