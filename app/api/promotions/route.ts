import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Get active promotions (public endpoint)
export async function GET(request: NextRequest) {
  try {
    console.log("get promotion ")
    const now = new Date();
    const nowString = now.toISOString().slice(0, 19).replace('T', ' ');
    
    // First, get all active promotions without date filtering to debug
    const allActiveSql = `SELECT * FROM promotions WHERE isActive = TRUE ORDER BY createdAt DESC`;
    const allActive = await query(allActiveSql) as any[];
    console.log('All active promotions:', allActive);
    
    // Then filter by date if needed
    const sql = `
      SELECT * FROM promotions 
      WHERE isActive = TRUE 
      AND (startDate IS NULL OR startDate <= ?)
      AND (endDate IS NULL OR endDate >= ?)
      ORDER BY createdAt DESC
      LIMIT 1
    `;
    
    const promotions = await query(sql, [nowString, nowString]) as any[];
    console.log('Filtered promotions:', promotions);
    console.log('Current time:', nowString);

    console.log(promotions)
    
    
    return NextResponse.json({ 
      success: true, 
      promotion: allActive.length > 0 ? allActive[0] : null
    });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des promotions', error: String(error) },
      { status: 500 }
    );
  }
}

// POST - Create promotion (admin only)
export async function POST(request: NextRequest) {
  try {
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

    if (!title || !discountValue) {
      return NextResponse.json(
        { success: false, message: 'Titre et valeur de réduction sont requis' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO promotions (
        code, title, titleAr, description, descriptionAr,
        discountType, discountValue, isActive, startDate, endDate,
        imageUrl, buttonText, buttonTextAr, buttonLink
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      buttonLink || null
    ]);
    console.log("sdsdsds")

    return NextResponse.json({ 
      success: true, 
      message: 'Promotion créée avec succès' 
    });
  } catch (error: any) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création de la promotion' },
      { status: 500 }
    );
  }
}

