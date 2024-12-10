import { getAllData } from "@/tools/DataManager";
import DeleteTechnology from "./DeleteTechnology";
import { Technology } from "@/tools/data.model";

export default async function DeleteTechnologyPage({ params }: { params: { id: string } }) {
  const { technologies } = await getAllData();
  const technology = technologies.find((t: Technology) => t._id === params.id);

  if (!technology) {
    return <div>Technology not found</div>;
  }

  return <DeleteTechnology technology={technology} />;
}