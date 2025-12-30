import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// PUT - Update promotion (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authAdminMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const body = await request.json();
    const {
      code,
      title,
      titleAr,
      description,
      descriptionAr,
      discountType,
      discountValue,
      isActive,
      startDate,
      endDate,
      imageUrl,
      buttonText,
      buttonTextAr,
      buttonLink
    } = body;

    const sql = `
      UPDATE promotions SET
        code = ?,
        title = ?,
        titleAr = ?,
        description = ?,
        descriptionAr = ?,
        discountType = ?,
        discountValue = ?,
        isActive = ?,
        startDate = ?,
        endDate = ?,
        imageUrl = ?,
        buttonText = ?,
        buttonTextAr = ?,
        buttonLink = ?,
        updatedAt = CURRENT_TIMESTAMP
      WHERE _id = ?
    `;

    await query(sql, [
      code || null,
      title,
      titleAr || null,
      description || null,
      descriptionAr || null,
      discountType || 'percentage',
      discountValue,
      isActive !== undefined ? isActive : false,
      startDate || null,
      endDate || null,
      imageUrl || null,
      buttonText || 'Voir l\'offre',
      buttonTextAr || 'شاهد العرض',
      buttonLink || null,
      params.id
    ]);

    return NextResponse.json({ 
      success: true, 
      message: 'Promotion mise à jour avec succès' 
    });
  } catch (error: any) {
    console.error('Error updating promotion:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour de la promotion' },
      { status: 500 }
    );
  }
}

// DELETE - Delete promotion (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authAdminMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const sql = `DELETE FROM promotions WHERE _id = ?`;
    await query(sql, [params.id]);

    return NextResponse.json({ 
      success: true, 
      message: 'Promotion supprimée avec succès' 
    });
  } catch (error) {
    console.error('Error deleting promotion:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression de la promotion' },
      { status: 500 }
    );
  }
}

