import { getAllData } from '@/tools/DataManager';

export default async function Home() {
  const { technologies, courses } = await getAllData();
  
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Technologies</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(technologies, null, 2)}
        </pre>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(courses, null, 2)}
        </pre>
      </div>
    </div>
  );
}