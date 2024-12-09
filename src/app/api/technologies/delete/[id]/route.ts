import type { NextRequest } from "next/server"
import { deleteTechnology } from "@/tools/DataManager";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return deleteTechnology(request, params.id);
}