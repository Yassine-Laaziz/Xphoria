import { User } from '../../../../types'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '../../../../models/Users'
import { connect } from '../../../../lib/mongodb'
import sendEmail from '../../../../lib/utils/sendEmail'
import { sign, verifyAuth } from '../../../../lib/jwtAuth'
import { err } from '../../../../lib/constants'
import { serialize } from 'cookie'

export async function POST(request: NextRequest) {
  const { user_token }: { user_token: unknown } = await request.json()
  const msg = 'Verified & logged in successfully!'
  try {
    await connect()

    type Payload =
      | null
      | { role: 'login'; email: string }
      | { role: 'signup'; user: User }

    if (typeof user_token !== 'string')
      return NextResponse.json({ err }, { status: 400 })
    const payload = (await verifyAuth(user_token)) as Payload
    if (!payload?.role) return NextResponse.json({ err }, { status: 400 })

    let user
    if (payload.role === 'login') {
      payload.email = payload.email.toLowerCase()
      const verifiedUser: User | null = await UserModel.findOne({
        email: payload.email,
      })
      if (verifiedUser) user = verifiedUser
      else return NextResponse.json({ err }, { status: 400 })
    } else if (payload.role === 'signup') {
      payload.user.email = payload.user.email.toLowerCase()
      user = await UserModel.create(payload.user)
      await sendEmail(
        payload.user.email,
        'Congratulations !',
        `
          <h1>Welcome!</h1>
          <p>Thank you for signing up to our platform! We are thrilled to have you as a new member of our community.</p>
          <p>Your account has been successfully created, and you can now log in with your credentials anytime to use our 
          platform. We're here to help you make the most of your experience, so here are a few things you can do now:</p>
          <ul>
            <li>Explore our products and features and see how they can benefit you</li>
            <li>Customize your profile and make it your own</li>
            <li>You can now start searching our Drippy products and review them</li>
          </ul>
          <p>Thank you again for joining us. We're excited to see the brand new Drip you'll achieve!</p>
          <p style="text-align: center;">Best regards.</p>
        `
      )
    } else return NextResponse.json({ err }, { status: 400 })

    const { username, email, _id, img } = user
    const token = await sign({ username, email, id: _id, img })

    const serialized = serialize('user_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 17,
      path: '/',
    })

    return NextResponse.json(
      { msg },
      { status: 200, headers: { 'Set-Cookie': serialized } }
    )
  } catch (e) {
    return NextResponse.json({ err }, { status: 400 })
  }
}
