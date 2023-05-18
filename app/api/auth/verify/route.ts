import { User } from '../../../../types'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '../../../../models/Users'
import { connect } from '../../../../lib/mongodb'
import sendEmail from '../../../../lib/utils/sendEmail'
import { verifyAuth, setUserCookie } from '../../../../lib/jwtAuth'
import { err } from '../../../../lib/constants'

export async function POST(request: NextRequest) {
  const req = await request.json()
  try {
    await connect()

    type Payload =
      | null
      | { role: 'login'; email: string }
      | { role: 'signup'; user: User }

    const payload = (await verifyAuth(req.body.user_token)) as Payload
    if (typeof payload !== 'object' || !payload?.role) {
      return NextResponse.json({ err }, { status: 400 })
    }

    let user
    if (payload.role === 'login') {
      const { email } = payload
      const verifiedUser: User | null = await UserModel.findOne({ email })
      if (verifiedUser) user = verifiedUser
      else return NextResponse.json({ err }, { status: 400 })
    } else if (payload.role === 'signup') {
      const newUser = await UserModel.create(payload.user)
      const modifiedUser: User = { ...newUser, id: newUser._id }
      user = modifiedUser
      sendEmail(
        payload.user.email,
        `
          <h1>Welcome!</h1>
          <p>Thank you for signing up to our platform! We are thrilled to have you as a new member of our community.</p>
          <p>Your account has been successfully created, and you can now log in with your credentials Anytime to use our 
          platform. We're here to help you make the most of your experience so here are a few things you can do now:</p>
          <ul>
            <li>Explore our Products & features and see how they can benefit you</li>
            <li>Customize your profile and make it your own</li>
            <li>You can now start searching our Drippy products & review them</li>
            </ul>
            <p>Thank you again for joining us. We're excited to see The Brand new Drip you'll achieve!</p>
          <p style="text-align: center;">Best regards.</p>
          `
      )
    } else return NextResponse.json({ err }, { status: 400 })

    const { username, email, id, img } = user
    setUserCookie({ username, email, id, img }, new NextResponse())

    return NextResponse.json(
      { msg: 'Verified & logged in successfully!' },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ err }, { status: 400 })
  }
}
