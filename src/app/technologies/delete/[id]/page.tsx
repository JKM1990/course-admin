"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Technology } from "@/tools/data.model";

export default function DeleteTechnology({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [technology, setTechnology] = useState<Technology | null>(null);

  useEffect(() => {
    const fetchTechnology = async () => {
      const response = await fetch("/api/all");
      const data = await response.json();
      const tech = data.technologies.find((t: Technology) => t._id === params.id);
      setTechnology(tech || null);
    };
    fetchTechnology();
  }, [params.id]);

  if (!technology) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">Are you sure you want to delete the follow technology?</p>
        <p className="text-gray-700">{technology.name}</p>
      </div>

      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Ok
        </button>
        <Link href="/" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
          Cancel
        </Link>
      </div>

      <footer className="mt-8 text-gray-600">
        Web App powered by <span className="text-emerald-600">NextJS</span> |{" "}
        <span className="text-emerald-600">MongoDB</span>
      </footer>
    </div>
  );
}