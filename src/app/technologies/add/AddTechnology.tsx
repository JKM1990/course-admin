"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CourseDocument, AddTechnologyProps } from "@/tools/data.model";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function AddTechnology({ courses }: AddTechnologyProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("1");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await sendJSONData(
      "/api/technologies/create",
      {
        name,
        description,
        difficulty: parseInt(difficulty),
        courses: selectedCourses.map(courseCode => {
          const course = courses.find(c => c.code === courseCode);
          return {
            code: courseCode,
            name: course?.name || ""
          };
        })
      },
      "POST"
    );

    if (!response) {
      console.error("No response received");
      return;
    }

    if (response.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      console.error("Error creating technology:", response.data);
      // remove loading state on error
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* display loading overlay if loading state = true */}
      {isLoading && <LoadingOverlay />}
      {
        <div className="min-h-screen bg-gray-200">
          <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
            <h2 className="text-xl text-emerald-600 mb-6">Add New Technology:</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  required
                  className="w-full p-2 border rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
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

              <div>
                <label className="block text-gray-700 mb-2">Used in courses:</label>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div key={course.code}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.code)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCourses([...selectedCourses, course.code]);
                            } else {
                              setSelectedCourses(
                                selectedCourses.filter(code => code !== course.code)
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        {course.code} {course.name}
                      </label>
                    </div>
                  ))}
                </div>
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
              Web App powered by{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                className="text-emerald-600 hover:underline"
              >
                NextJS
              </a>{" "}
              |{" "}
              <a
                href="https://www.mongodb.com"
                target="_blank"
                className="text-emerald-600 hover:underline"
              >
                MongoDB
              </a>
            </footer>
          </div>
        </div>
      }
    </>
  );
}