import { getAllData } from "@/tools/DataManager";
import EditTechnology from "./EditTechnology";
import { Technology } from "@/tools/data.model";

export default async function EditTechnologyPage({ params }: { params: { id: string } }) {
  const { technologies, courses } = await getAllData();
  const technology = technologies.find((t: Technology) => t._id === params.id);

  if (!technology) {
    return <div>Technology not found</div>;
  }

  return <EditTechnology technology={technology} courses={courses} />;
}