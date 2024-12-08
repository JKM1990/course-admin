import { getAllData } from '@/tools/DataManager';
import Link from 'next/link';

export default async function Home() {
  const { technologies, courses } = await getAllData();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl text-gray-700 mb-8">_Technology Roster : Course Admin</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
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
          <div className="space-y-2">
            {technologies.map((tech) => (
              <div key={tech._id} className="flex items-center space-x-2">
                <Link href={`/technologies/edit/${tech._id}`} className="hover:text-emerald-600">
                  ✎
                </Link>
                <Link href={`/technologies/delete/${tech._id}`} className="hover:text-emerald-600">
                  🗑
                </Link>
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
          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course._id} className="flex items-center space-x-2">
                <Link href={`/courses/edit/${course._id}`} className="hover:text-emerald-600">
                  ✎
                </Link>
                <Link href={`/courses/delete/${course._id}`} className="hover:text-emerald-600">
                  🗑
                </Link>
                <span className="text-gray-700">{course.code} {course.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 text-gray-600">
        Web App powered by{' '}
        <span className="text-emerald-600">NextJS</span> |{' '}
        <span className="text-emerald-600">MongoDB</span>
      </footer>
    </div>
  );
}