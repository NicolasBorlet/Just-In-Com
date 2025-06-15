import { NextResponse } from 'next/server';

async function verifyRecaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=6LfqwGErAAAAAEFhAPG1ROG5S2jWKdqanHjtaQwJ&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // Verify reCAPTCHA token
    const isValid = await verifyRecaptcha(recaptchaToken);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid reCAPTCHA token' },
        { status: 400 }
      );
    }

    // Here you would typically process the form data
    // For example, sending an email, saving to database, etc.
    console.log('Form data received:', formData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
