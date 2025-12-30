import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

/**
 * DELETE /api/orders/[id] - Remove an order by ID (requires admin auth)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  console.log("delete order", params);
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

      
    const { id } = await params;
    console.log("id", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    await query(`DELETE FROM \`order\` WHERE _id = ?`, [id]);

    return NextResponse.json(
      { success: true, message: 'Order deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}

