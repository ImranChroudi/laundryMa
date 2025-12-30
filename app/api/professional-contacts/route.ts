import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// GET - Get all professional contacts (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await authAdminMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const sql = `SELECT * FROM professional_contacts ORDER BY createdAt DESC`;
    const contacts = await query(sql) as any[];

    return NextResponse.json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    console.error('Error fetching professional contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des contacts' },
      { status: 500 }
    );
  }
}

