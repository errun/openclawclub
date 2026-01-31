import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n';

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1];
  const locale = isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;

  const response = NextResponse.next();
  response.cookies.set('locale', locale, { path: '/' });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api).*)']
};
