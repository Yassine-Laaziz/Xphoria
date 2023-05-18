import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '../../../../lib/jwtAuth'

export async function GET(req: NextRequest) {
  let user = (await verifyAuth(req)) || null
  return NextResponse.json({ user })
}
