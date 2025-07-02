import * as Sentry from '@sentry/nextjs';
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SentryExampleAPIError';
  }
}

// A faulty API route to test Sentry's error monitoring
export async function GET() {
  try {
    // Simuler une erreur pour tester Sentry
    throw new SentryExampleAPIError("This error is raised on the backend called by the example page.");
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
