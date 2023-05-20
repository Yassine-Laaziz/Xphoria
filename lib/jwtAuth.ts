import type { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { User } from '../types'

export class AuthError extends Error {}

// Verifies the user's JWT token and returns its payload if it's valid.
export async function verifyAuth(token: string) {
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
