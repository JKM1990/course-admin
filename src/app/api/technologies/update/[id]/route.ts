import type { NextRequest } from 'next/server'
import { updateTechnology } from "@/tools/DataManager";

export function PUT( request: NextRequest, { params }:{ params: { id: string } } ) {
    return updateTechnology(request, params.id);
}
