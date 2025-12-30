import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt';
import { query } from '@/lib/db';
import { signInSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = signInSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, role = 'admin' } = validationResult.data;

    let sql: string;
    if (role === 'admin') {
      sql = 'SELECT _id, name, email, password, role FROM admin WHERE email = ?';
    } else {
      sql = 'SELECT _id, name, email, password, role FROM employe WHERE email = ?';
    }

    const results: any = await query(sql, [email]);

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Email non trouvé' },
        { status: 401 }
      );
    }

    const userFromDB = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, userFromDB.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Prepare user data
    const user = {
      _id: userFromDB._id,
      name: userFromDB.name,
      email: userFromDB.email,
      role: userFromDB.role,
    };

    // Generate JWT
    const token = generateToken(user);

    return NextResponse.json({ success: true, user, token }, { status: 200 });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}





