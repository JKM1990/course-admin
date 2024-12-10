import { getAllData } from "@/tools/DataManager";
import EditCourse from "./EditCourse";
import { CourseDocument } from "@/tools/data.model";

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const { courses } = await getAllData();
  const course = courses.find((c: CourseDocument) => c._id === params.id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return <EditCourse course={course} />;
}