import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

// DELETE - Delete professional contact (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authAdminMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const sql = `DELETE FROM professional_contacts WHERE _id = ?`;
    await query(sql, [params.id]);

    return NextResponse.json({ 
      success: true, 
      message: 'Contact supprimé avec succès' 
    });
  } catch (error) {
    console.error('Error deleting professional contact:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression du contact' },
      { status: 500 }
    );
  }
}

