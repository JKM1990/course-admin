import type { NextRequest } from "next/server";
import { deleteCourse } from "@/tools/DataManager";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return deleteCourse(request, params.id);
}