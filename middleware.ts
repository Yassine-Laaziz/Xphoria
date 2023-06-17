import { NextRequest, NextResponse } from 'next/server'
import { verify } from './lib/jwt'

export default async function middleware(req: NextRequest) {
  const verified = await verify(req.cookies.get('user_token')?.value || '')

  const { pathname } = req.nextUrl

  // for unverified users
  if (!verified && pathname.startsWith('/checkout')) {
    return NextResponse.redirect(newUrl('/'))
  }

  // for verified users
  if (verified && pathname.startsWith('/auth')) {
    return NextResponse.redirect(newUrl('/'))
  }

  return NextResponse.next()

  function newUrl(url: string): URL {
    return new URL(url, req.url)
  }
}
