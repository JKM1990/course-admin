import type { NextRequest } from "next/server"
import { getAllData } from "@/tools/DataManager";

export async function GET(request: NextRequest) {
  const data = await getAllData();
  return Response.json(data);
}