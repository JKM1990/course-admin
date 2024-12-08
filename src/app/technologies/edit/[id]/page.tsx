"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Technology } from '@/tools/data.model';

export default function EditTechnology({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [technology, setTechnology] = useState<Technology | null>(null);

  // Fetch the technology data when component mounts
  useEffect(() => {
    const fetchTechnology = async () => {
      const response = await fetch('/api/all');
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
      <h2 className="text-xl text-emerald-600 mb-6">Edit Technology:</h2>

      {/* Form will go here*/}
      <div>Editing: {technology.name}</div>
    </div>
  );
}