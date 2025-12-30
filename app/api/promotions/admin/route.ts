import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// GET - Get all promotions (admin)
export async function GET(request: NextRequest) {
  try {
    const authResult = await authAdminMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const sql = `SELECT * FROM promotions ORDER BY createdAt DESC`;
    const promotions = await query(sql) as any[];

    return NextResponse.json({ 
      success: true, 
      promotions 
    });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des promotions' },
      { status: 500 }
    );
  }
}

