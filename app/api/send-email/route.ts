import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // Limit each IP to 5 requests per windowMs
};

const rateLimitMap = new Map();

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.windowMs;

    // Clean up old entries
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const recentTimestamps = timestamps.filter((ts: number) => ts > windowStart);
      if (recentTimestamps.length > 0) {
        rateLimitMap.set(ip, recentTimestamps);
      } else {
        rateLimitMap.delete(ip);
      }
    }

    // Check rate limit
    const requestTimestamps = rateLimitMap.get(clientIp) || [];
    if (requestTimestamps.length >= RATE_LIMIT.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(RATE_LIMIT.windowMs / 1000).toString(),
          },
        }
      );
    }

    // Parse request body
    const { name, email, phone, subject, message } = await request.json();
    
    console.log('Form data received:', { name, email, phone, subject });

    // Validate input
    if (!name || !email || !message) {
      console.error('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Update rate limit
    rateLimitMap.set(clientIp, [...requestTimestamps, now]);

    // Send email using our service
    const result = await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (!result.success) {
      console.error('Failed to send email:', result.error);
      throw new Error(result.error || 'Failed to send email');
    }

    console.log('Email sent successfully');
    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: result.messageId 
    });
    
  } catch (error: any) {
    console.error('Error in send-email API:', {
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
    
    let errorMessage = 'Failed to process your request';
    let statusCode = 500;

    if (error.message.includes('rate limit')) {
      errorMessage = 'Too many requests. Please try again later.';
      statusCode = 429;
    } else if (error.message.includes('validation')) {
      errorMessage = error.message;
      statusCode = 400;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
