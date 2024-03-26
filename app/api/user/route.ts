import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await auth();
  return NextResponse.json({ ok: true, user: session?.user });
};
