import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// PUT /api/produits/statut - Toggle product status (requires auth)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

    const body = await request.json();
    const { _id, statut } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: 'ID manquant' },
        { status: 400 }
      );
    }

    const newStatut = statut === 'active' ? 'active' : 'inactive';

    const sql = 'UPDATE produit SET statut = ? WHERE _id = ?';
    await query(sql, [newStatut, _id]);

    return NextResponse.json(
      { success: true, message: 'Statut mis à jour' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating produit statut:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

