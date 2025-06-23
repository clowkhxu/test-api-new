import { NextRequest, NextResponse } from 'next/server';
import { proxyToGoogleScript } from '../../../lib/proxy';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Reconstruct the path from the dynamic segments
    const path = params.path.join('/');
    
    // Extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryParams: Record<string, string> = {};
    
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    console.log(`API Request - Path: ${path}, Query:`, queryParams);

    // Determine cache TTL based on endpoint type
    let cacheTTL = 300; // Default 5 minutes
    
    if (path.startsWith('phim/')) {
      // Movie details - cache longer (10 minutes)
      cacheTTL = 600;
    } else if (path.includes('tim-kiem')) {
      // Search results - cache shorter (2 minutes)
      cacheTTL = 120;
    } else if (path.includes('phim-moi-cap-nhat')) {
      // New movies - cache shorter (3 minutes)
      cacheTTL = 180;
    }

    // Proxy the request to Google Apps Script
    const data = await proxyToGoogleScript(path, queryParams, { 
      cacheTTL,
      timeout: 25000 // 25 second timeout
    });

    // Return the response with appropriate headers
    const response = NextResponse.json(data);
    
    // Set cache headers for CDN/browser caching
    response.headers.set('Cache-Control', `public, s-maxage=${cacheTTL}, stale-while-revalidate=${cacheTTL * 2}`);
    response.headers.set('X-Cache-TTL', cacheTTL.toString());
    response.headers.set('X-Proxy-Path', path);
    
    return response;

  } catch (error) {
    console.error('API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        status: false,
        msg: `API Error: ${errorMessage}`,
        error: true
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}