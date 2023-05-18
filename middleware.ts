import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from './lib/jwtAuth'

export default async function middleware(req: NextRequest) {
  const verified = await verifyAuth(req)

  const { pathname } = req.nextUrl
  if (pathname.startsWith('/Product')) {
    if (!verified) return NextResponse.redirect(newUrl('/'))
  }

  return NextResponse.next()

  function newUrl(url: string): URL {
    return new URL(url, req.url)
  }
}
