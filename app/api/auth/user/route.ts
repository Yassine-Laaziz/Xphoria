import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyAuth } from '../../../../lib/jwtAuth'

export async function GET() {
  const user_token = cookies().get('user_token')?.value || ''
  let user = await verifyAuth(user_token)
  return NextResponse.json({ user })
}
