import { NextResponse } from 'next/server'
import { expireUserCookie } from '../../../../lib/jwtAuth'

export const runtime = 'edge'

export async function POST() {
  return expireUserCookie(NextResponse.json({ success: true }, { status: 200 }))
}
