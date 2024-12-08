import type { NextRequest } from 'next/server'
import { createTechnology } from '@/tools/DataManager';

export function POST(request: NextRequest) {
    return createTechnology(request);
}