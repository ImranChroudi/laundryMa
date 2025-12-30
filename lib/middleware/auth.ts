import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from '@/lib/jwt';
import { query } from '@/lib/db';

export interface AuthRequest extends NextRequest {
  admin?: any;
  user?: any;
}

export async function authAdminMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const authHeader = request.headers.get('authorization');
    console.log("authHeader", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { stop: true, success: false, message: 'Aucun token d\'authentification fourni' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log("token", token);
    let decoded: TokenPayload;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      console.log("error", err);
      return NextResponse.json(
        { stop: true, success: false, message: 'Token invalide ou expiré, Please login again' },
        { status: 401 }
      );
    }

    const { email, id, role } = decoded;
    if (!id || !email || !role) {
      
      return NextResponse.json(
        { stop: true, success: false, message: 'Données du token incorrectes, Please login again' },
        { status: 401 }
      );
    }

    const results: any = await query(
      'SELECT * FROM admin WHERE _id = ? AND email = ? AND role = ?',
      [id, email, role]
    );

    if (results.length === 0) {
      return NextResponse.json(
        { stop: true, success: false, message: 'Données du token incorrectes, Please login again' },
        { status: 401 }
      );
    }

    // Store admin in request headers for use in route handlers
    // Note: In Next.js App Router, we can't modify the request object directly
    // So we'll need to pass the admin data through headers or return it
    return null; // null means authentication passed
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur côté serveur' },
      { status: 500 }
    );
  }
}

// Helper function to get admin from token (for use in route handlers)
export async function getAdminFromToken(request: NextRequest): Promise<any | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const { email, id, role } = decoded;

    if (!id || !email || !role) {
      return null;
    }

    const results: any = await query(
      'SELECT * FROM admin WHERE _id = ? AND email = ? AND role = ?',
      [id, email, role]
    );

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    return null;
  }
}





