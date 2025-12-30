import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';
import path from 'path';

// GET /api/produits - Get all products (requires auth)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

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
    console.error('Error fetching produits:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/produits - Add a new product (requires auth + file upload)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

    const formData = await request.formData();
    const nameProduct = formData.get('nameProduct') as string;
    const prix = formData.get('prix') as string;
    const type = formData.get('type') as string;
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: 'Image manquante' },
        { status: 400 }
      );
    }

    // Handle price
    const prixProduit = prix === '' || prix === null ? 0 : parseFloat(prix);

    // Save file
    const timestamp = Date.now();
    const originalName = imageFile.name.replace(/\s+/g, '-');
    const filename = `${timestamp}_${originalName}`;
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    
    // Ensure directory exists
    const fs = await import('fs/promises');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    // Insert into database
    const sql = `
      INSERT INTO produit (nameProduct, prix, image, type, statut)
      VALUES (?, ?, ?, ?, '1')
    `;

    await query(sql, [nameProduct, prixProduit, filename, type]);

    return NextResponse.json(
      { success: true, message: 'Produit ajouté' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding produit:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

