import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authAdminMiddleware } from '@/lib/middleware/auth';
import { sendEmail } from '@/lib/send-email';
import { generateOrderEmailTemplate } from '@/lib/email-template';

/**
 * GET /api/orders - Get all orders with their services (requires admin auth)
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
        o.total,
        o.phone,
        o.location,
        o.statut,
        o.dateLivraisonPrevue,
        o.dateLivraisonEffective,
        o.idClient,
        p._id AS panierId,
        ps.quantity,
        pr._id AS produitId,
        pr.nameProduct,
        pr.prix
      FROM \`order\` AS o
      LEFT JOIN panier AS p ON o._id = p.orderId
      LEFT JOIN panier_services AS ps ON p._id = ps.panierId
      LEFT JOIN produit AS pr ON ps.produitId = pr._id
    `;

    const results: any = await query(sql);

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
          total: row.total,
          phone: row.phone,
          location: row.location,
          statut: row.statut,
          dateLivraisonPrevue: row.dateLivraisonPrevue,
          dateLivraisonEffective: row.dateLivraisonEffective,
          idClient: row.idClient,
          produits: [], // initialize product list
        };
      }

      // If product data exists, push to the array
      if (row.produitId) {
        orders[orderId].produits.push({
          produitId: row.produitId,
          nameProduct: row.nameProduct,
          prix: row.prix,
          quantity: row.quantity,
        });
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

/**
 * POST /api/orders - Create a new pickup/order
 * Note: This endpoint is public (no auth required) to allow clients to create orders
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nameClient,
      phone,
      dateLivraisonPrevue,
      dateRamassage,
      heureRamassage,
      heureLivraison,
      locationRamassage,
      locationLivraison,
      cartItems = [],
    } = body;

    // Validate required fields
    if (!nameClient || !phone || !dateLivraisonPrevue || !dateRamassage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into order table
    const sqlPickup = `
      INSERT INTO \`order\`
      (nameClient, phone, dateRamassage, heureRamassage, dateLivraisonPrevue, heureLivraison, locationRamassage, locationLivraison)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result: any = await query(sqlPickup, [
      nameClient,
      phone,
      dateRamassage,
      heureRamassage,
      dateLivraisonPrevue,
      heureLivraison,
      JSON.stringify(locationRamassage),
      JSON.stringify(locationLivraison),
    ]);

    const orderId = result.insertId;

    // If cartItems exist, insert them into panier and panier_services tables
    if (cartItems && cartItems.length > 0) {
      console.log('Processing cart items:', cartItems);

      // Insert into panier table
      const sqlPanier = `
        INSERT INTO panier (orderId)
        VALUES (?)
      `;

      const panierResult: any = await query(sqlPanier, [orderId]);
      const panierId = panierResult.insertId;

      // Insert each cart item into panier_services table
      for (const item of cartItems) {
        const sqlPanierServices = `
          INSERT INTO panier_services (panierId, produitId, quantity)
          VALUES (?, ?, ?)
        `;

        await query(sqlPanierServices, [
          panierId,
          item.produitId || item.id,
          item.quantity,
        ]);

        console.log(
          `Inserted cart item: produitId=${item.produitId || item.id}, quantity=${item.quantity}`
        );
      }

      console.log(
        `Successfully processed ${cartItems.length} cart items for order ${orderId}`
      );
    }

    // Send email to prestataire
    try {
      const prestataireEmail = process.env.PRESTATAIRE_EMAIL || process.env.CONTACT_EMAIL || 'b2b@laundry.ma';
      
      // Get product details for email
      let productsHtml = '';
      if (cartItems && cartItems.length > 0) {
        const productIds = cartItems.map((item: any) => item.produitId || item.id);
        const products: any = await query(
          `SELECT _id, nameProduit, prix FROM produit WHERE _id IN (${productIds.map(() => '?').join(',')})`,
          productIds
        );

        productsHtml = '<table role="presentation" style="width: 100%; border-collapse: collapse;">';
        cartItems.forEach((item: any) => {
          const product = Array.isArray(products) ? products.find((p: any) => p._id === item.produitId || p._id === item.id) : null;
          if (product) {
            productsHtml += `
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #333333; font-size: 15px;">
                  ${product.nameProduit} x${item.quantity}
                </td>
                <td style="padding: 10px 0; color: #333333; font-size: 15px; text-align: right; font-weight: 600;">
                  ${product.prix} DH
                </td>
              </tr>
            `;
          }
        });
        productsHtml += '</table>';
      }

      const ramassageMapLink = `https://www.google.com/maps?q=${locationRamassage?.latitude},${locationRamassage?.longitude}`;
      const livraisonMapLink = `https://www.google.com/maps?q=${locationLivraison?.latitude},${locationLivraison?.longitude}`;
      
      // Extract addresses from location objects
      const addressRamassage = locationRamassage?.address || 'Non spécifiée';
      const addressLivraison = locationLivraison?.address || 'Non spécifiée';
      
      // Create WhatsApp link with pre-filled message
      const whatsappMessage = encodeURIComponent(`Bonjour ${nameClient}, merci pour votre commande #${orderId}. Nous vous contacterons bientôt pour confirmer les détails.`);
      const whatsappLink = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

      const emailHtml = generateOrderEmailTemplate({
        orderId,
        nameClient,
        phone,
        dateRamassage,
        heureRamassage: heureRamassage || 'Non spécifiée',
        dateLivraisonPrevue,
        heureLivraison: heureLivraison || 'Non spécifiée',
        addressRamassage,
        addressLivraison,
        ramassageMapLink,
        livraisonMapLink,
        productsHtml: productsHtml || '<p style="color: #666666; font-size: 15px;">Aucun article</p>',
        whatsappLink,
      });

      await sendEmail(
        prestataireEmail,
        `Nouvelle commande #${orderId} - ${nameClient}`,
        emailHtml
      );
    } catch (emailError) {
      console.error('Error sending email to prestataire:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pickup created successfully',
        pickupId: orderId,
        cartItemsProcessed: cartItems.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating pickup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create pickup' },
      { status: 500 }
    );
  }
}

