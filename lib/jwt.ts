import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface TokenPayload {
  _id?: string;
  userId?: number;
  email: string;
  role?: string;
}

export function generateToken(user: TokenPayload, normalUser: boolean = false): string {
  let payload: TokenPayload;
  
  if (normalUser === true) {
    payload = {
      userId: user.userId,
      email: user.email,
    };
  } else {
    payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    console.log("payload", payload);
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
  
  return token;
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}





