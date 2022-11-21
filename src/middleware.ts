import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith('/s')) {
    // cors
    console.log('path??', req.nextUrl.pathname);

    const slug = req.nextUrl.pathname.split('/').pop();

    console.log('full next url??', req.nextUrl);

    const data = await (
      await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json();

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    console.log('slug??', slug);
  }

  if (req.nextUrl.pathname.startsWith('/api/shorten')) {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    // allow cors
    req.headers.set('Access-Control-Allow-Origin', domain);
  }
}
