import type { NextRequest } from 'next/server'
import { updateTechnology } from "@/tools/DataManager";

export function PUT( request: NextRequest ) {
    return updateTechnology(request);
}