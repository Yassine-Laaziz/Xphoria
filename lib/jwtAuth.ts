import type { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { User } from '../types'

export class AuthError extends Error {}

// Verifies the user's JWT token and returns its payload if it's valid.
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('user_token')?.value
  if (!token) return null

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    )
    return verified.payload
  } catch (err) {
    return null
  }
}

export async function sign(payload: any, expTime: string = '17d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(expTime)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY))
}

// Adds the user token cookie to a response.
export async function setUserCookie(user: User, res: NextResponse) {
  const token = await sign(user, '2h')

  res.cookies.set('user_token', token, {
    sameSite: true,
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 17, // 17 days in seconds
    path: '/',
  })

  return res
}

// Expires the user token cookie
export function expireUserCookie(res: NextResponse) {
  res.cookies.set('user_token', '', { httpOnly: true, maxAge: 0 })
  return res
}
