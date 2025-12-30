import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';
import path from 'path';

// PUT /api/produits/update - Update a product (requires auth + optional file upload)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

    const formData = await request.formData();
    const _id = formData.get('_id') as string;
    const nameProduct = formData.get('nameProduct') as string;
    const prix = formData.get('prix') as string;
    const type = formData.get('type') as string;
    
    // Check if there's a new file uploaded (field name 'image' from multer)
    // In FormData, if it's a file, it will be a File object, otherwise it might be a string
    const imageField = formData.get('image');
    const imageFile = imageField instanceof File ? imageField : null;
    // If no file, get existing image filename from body (original code uses req.body.image)
    const existingImage = typeof imageField === 'string' ? imageField : (formData.get('existingImage') as string | null);

    // Handle price
    const prixProduit = prix === '' || prix === null ? 0 : parseFloat(prix);

    // Handle image - same logic as original: if req.file exists, use it, else use req.body.image
    let imagePath: string;

    if (imageFile && imageFile.size > 0) {
      // New file uploaded
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
      
      imagePath = filename;
    } else {
      // Use existing image (from req.body.image in original code)
      imagePath = existingImage || '';
    }

    // Update database
    const sql = `UPDATE produit SET nameProduct = ?, prix = ?, type = ?, image = ? WHERE _id = ?`;
    await query(sql, [nameProduct, prixProduit, type, imagePath, _id]);

    return NextResponse.json(
      { success: true, message: 'Produit modifié' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating produit:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

