import type { NextRequest } from 'next/server';
import { createCourse } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return createCourse(request);
}