import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';

/**
 * GET /api/orders/get-orders - Get all orders with their services (requires admin auth)
 * This route maintains compatibility with existing hooks
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await authAdminMiddleware(request);
    if (authResponse) {
      return authResponse;
    }

    const sql = `
      SELECT 
        o._id AS orderId,
        o.nameClient,
        o.phone,
        o.statut,
        o.dateLivraisonPrevue,
        o.dateLivraisonEffective,
        o.heureRamassage,
        o.heureLivraison,
        o.addressRamassage,
        o.addressLivraison,
        o.locationRamassage AS locationRamassage,
        o.locationLivraison AS locationLivraison,
        o.date
      FROM \`order\` AS o
    `;

    const results: any = await query(sql);
    console.log(results);

    // Ensure results is an array
    if (!Array.isArray(results)) {
      return NextResponse.json(
        { success: false, error: 'Invalid query result format' },
        { status: 500 }
      );
    }

    const orders: Record<string, any> = {};

    results.forEach((row: any) => {
      const orderId = row.orderId;

      if (!orders[orderId]) {
        orders[orderId] = {
          orderId: row.orderId,
          nameClient: row.nameClient,
          phone: row.phone,
          location: row.location,
          statut: row.statut,
          dateLivraisonPrevue: row.dateLivraisonPrevue,
          dateLivraisonEffective: row.dateLivraisonEffective,
          heureRamassage: row.heureRamassage,
          heureLivraison: row.heureLivraison,
          addressRamassage: row.addressRamassage,
          addressLivraison: row.addressLivraison,
          locationRamassage: JSON.parse(row.locationRamassage),
          locationLivraison: JSON.parse(row.locationLivraison),
          date: row.date,
        };
      }     
    });

    const finalResult = Object.values(orders);

    return NextResponse.json(
      { success: true, orders: finalResult },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

