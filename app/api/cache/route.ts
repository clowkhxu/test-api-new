import { NextResponse } from 'next/server';
import { getCacheStats, clearCache } from '../../../lib/cache';

export async function GET() {
  const stats = getCacheStats();
  
  return NextResponse.json({
    status: true,
    data: {
      cacheSize: stats.size,
      maxCacheSize: stats.maxSize,
      message: `Cache contains ${stats.size} items (max: ${stats.maxSize})`
    }
  });
}

export async function DELETE() {
  clearCache();
  
  return NextResponse.json({
    status: true,
    message: 'Cache cleared successfully'
  });
}