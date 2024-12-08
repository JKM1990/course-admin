import type { NextRequest } from 'next/server';
import { updateCourse } from '@/tools/DataManager';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return updateCourse(request, params.id);
}