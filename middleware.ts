import { NextRequest, NextResponse } from 'next/server'
import { verify } from './lib/jwt'

export default async function middleware(req: NextRequest) {
  const verified = await verify(req.cookies.get('user_token')?.value || '')

  const pathname = req.nextUrl.pathname.toLowerCase()

  // for unverified users
  if (!verified && pathname.startsWith('/checkout')) {
    return NextResponse.redirect(newUrl('/Auth'))
  }

  // for verified users
  if (verified && pathname.startsWith('/Auth')) {
    return NextResponse.redirect(newUrl('/'))
  }

  return NextResponse.next()

  function newUrl(url: string): URL {
    return new URL(url, req.url)
  }
}
