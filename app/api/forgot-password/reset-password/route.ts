import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { query } from '@/lib/db';
import { generateToken } from '@/lib/jwt';
import { getCode, deleteCode } from '@/app/lib/code-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword, confirmPassword } = body;

    if (!email || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Les mots de passe ne correspondent pas' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    const record = getCode(email);

    if (!record) {
      return NextResponse.json(
        { success: false, message: 'Code non vérifié ou expiré' },
        { status: 401 }
      );
    }

    // Determine table based on role
    const tableName = record.role === 'admin' ? 'admin' : 'employe';

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in database
    const sql = `UPDATE ${tableName} SET password = ? WHERE email = ?`;
    await query(sql, [hashedPassword, email]);

    // Get user data for token generation
    const userSql = `SELECT _id, name, email, role FROM ${tableName} WHERE email = ?`;
    const userResults: any = await query(userSql, [email]);

    if (userResults.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    const user = userResults[0];

    // Generate token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    // Delete code after successful reset
    deleteCode(email);

    return NextResponse.json(
      {
        success: true,
        message: 'Mot de passe modifié avec succès',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

