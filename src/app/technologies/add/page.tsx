import { getAllData } from "@/tools/DataManager";
import AddTechnology from "./AddTechnology";

export const revalidate = 0;

export default async function AddTechnologyPage() {
  const { courses } = await getAllData();
  return <AddTechnology courses={courses} />;
}