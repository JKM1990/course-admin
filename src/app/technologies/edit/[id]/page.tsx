'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Technology } from '@/tools/data.model';

export default function EditTechnology({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('1');

  useEffect(() => {
    const fetchTechnology = async () => {
      const response = await fetch('/api/all');
      const data = await response.json();
      const tech = data.technologies.find((t: Technology) => t._id === params.id);
      if (tech) {
        setTechnology(tech);
        setName(tech.name);
        setDescription(tech.description);
        setDifficulty(tech.difficulty.toString());
      }
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

      <form className="space-y-6">
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

        <div>
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded bg-white h-32"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
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
        Web App powered by <span className="text-emerald-600">NextJS</span> |{' '}
        <span className="text-emerald-600">MongoDB</span>
      </footer>
    </div>
  );
}