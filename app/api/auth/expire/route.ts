import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

export async function POST() {
  const serialized = serialize('user_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
  return NextResponse.json(
    { success: true },
    { status: 200, headers: { 'Set-Cookie': serialized } }
  )
}
