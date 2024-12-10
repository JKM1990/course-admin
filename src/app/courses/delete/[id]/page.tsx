import { getAllData } from "@/tools/DataManager";
import DeleteCourse from "./DeleteCourse";
import { CourseDocument } from "@/tools/data.model";

export default async function DeleteCoursePage({ params }: { 
    params: { id: string } }) {
    const { courses } = await getAllData();
    const course = courses.find((c: CourseDocument) => c._id === params.id);
  
    if (!course) {
      return <div>Technology not found</div>;
    }
  
    return <DeleteCourse course={course} />;
  }