import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Test database connection endpoint
export async function GET(request: NextRequest) {
  try {
    // Simple test query
    const result = await query('SELECT 1 as test');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      test: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}











