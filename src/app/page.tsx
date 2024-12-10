import { getAllData } from "@/tools/DataManager";
import Link from "next/link";

// ensure revalidation of data on every request
export const revalidate = 0;

export default async function Home() {
  const { technologies, courses } = await getAllData();

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
          {/* Technologies Section */}
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl text-emerald-600">Technologies:</h2>
              <Link
                href="/technologies/add"
                className="ml-2 text-2xl text-gray-600 hover:text-emerald-600"
              >
                +
              </Link>
            </div>
            <div className="border-l-4 border-emerald-600">
              {technologies.map((tech) => (
                <div key={tech._id} className="flex items-center">
                  <div className="w-2 -ml-1"></div>
                  <div className="flex items-center px-2">
                    <Link href={`/technologies/edit/${tech._id}`} className="hover:text-emerald-600 mr-1">
                      ✎
                    </Link>
                    <Link href={`/technologies/delete/${tech._id}`} className="hover:text-emerald-600">
                      🗑
                    </Link>
                  </div>
                  <span className="text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl text-emerald-600">Courses:</h2>
              <Link
                href="/courses/add"
                className="ml-2 text-2xl text-gray-600 hover:text-emerald-600"
              >
                +
              </Link>
            </div>
            <div className="border-l-4 border-emerald-600">
              {courses.map((course) => (
                <div key={course._id} className="flex items-center">
                  <div className="w-2 -ml-1"></div>
                  <div className="flex items-center px-2">
                    <Link href={`/courses/edit/${course._id}`} className="hover:text-emerald-600 mr-1">
                      ✎
                    </Link>
                    <Link href={`/courses/delete/${course._id}`} className="hover:text-emerald-600">
                      🗑
                    </Link>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-bold">{course.code}</span>
                    <span> - {course.name}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
  );
}