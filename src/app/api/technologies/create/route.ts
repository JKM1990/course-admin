import type { NextRequest } from 'next/server'
import { createTechnology } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return createTechnology(request);
}