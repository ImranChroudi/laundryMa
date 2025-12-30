import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/produits/tarifs - Get all products (public, no auth required)
export async function GET(request: NextRequest) {
  try {
    const sql = 'SELECT * FROM produit';
    const produits = await query(sql);

    if (Array.isArray(produits) && produits.length === 0) {
      return NextResponse.json(
        { success: true, message: 'Aucun produit trouvé', produits: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, produits },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tarifs:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}



