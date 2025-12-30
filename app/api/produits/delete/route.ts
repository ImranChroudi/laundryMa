import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// PUT /api/produits/delete - Delete a product (requires auth)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'ID manquant' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM produit WHERE _id = ?';
    await query(sql, [_id]);

    return NextResponse.json(
      { success: true, message: 'Produit supprimé' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting produit:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

