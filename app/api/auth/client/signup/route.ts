import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt';
import { query } from '@/lib/db';
import { signUpSchemaClient } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = signUpSchemaClient.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, phone, email, password } = validationResult.data;

    // Check if email or phone already exists
    const existingClient: any = await query(
      'SELECT * FROM `client` WHERE email = ? OR phone = ? LIMIT 1',
      [email, phone]
    );

    if (existingClient && existingClient.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email or phone already exists',
        },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const result: any = await query(
      'INSERT INTO client (name, phone, email, password) VALUES (?, ?, ?, ?)',
      [name, phone, email, hashedPassword]
    );

    // Fetch created user without password
    const client: any = await query(
      'SELECT _id, name, phone, email FROM client WHERE _id = ?',
      [result.insertId]
    );

    const user = client[0];

    // Generate token
    const token = generateToken(
      {
        userId: user._id,
        email: user.email,
      },
      true
    );

    // Send response
    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: {
          token,
          user,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}












