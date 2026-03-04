import { NextResponse } from 'next/server';

// Admin API route for orders
export async function GET() {
  const orders = [
    { id: 1234, customer: 'John Doe', status: 'Pending', amount: 45.00 },
    { id: 1233, customer: 'Jane Smith', status: 'Completed', amount: 32.50 },
    { id: 1232, customer: 'Bob Johnson', status: 'In Progress', amount: 67.00 },
  ];

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you would save this to a database
    return NextResponse.json({ 
      message: 'Order created successfully',
      data: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}














