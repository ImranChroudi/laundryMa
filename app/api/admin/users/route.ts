import { NextResponse } from 'next/server';

// Admin API route for users
export async function GET() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
  ];

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you would save this to a database
    return NextResponse.json({ 
      message: 'User created successfully',
      data: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}














