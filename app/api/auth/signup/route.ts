import { NextRequest, NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongodb'
import clientSideCheck from '../../../../lib/utils/clientSideCheck'
import UserModel from '../../../../models/Users'
import { User } from '../../../../types'
import styles from '../../../../styles'
import { sign } from '../../../../lib/jwtAuth'
import { err } from '../../../../lib/constants'
import sendEmail from '../../../../lib/utils/sendEmail'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    await connect()
    const user: User = body.user
    if (!clientSideCheck(user).isCorrect)
      return NextResponse.json({ err }, { status: 400 })

    if (await UserModel.findOne({ username: user.username }))
      return NextResponse.json(
        { err: 'This username has been taken!' },
        { status: 422 }
      )

    const email = user.email.toLowerCase()
    if (await UserModel.findOne({ email })) {
      return NextResponse.json(
        { err: 'This email address has been taken!' },
        { status: 422 }
      )
    }

    const token = await sign({ user, role: 'signup' }, '2h')

    sendEmail(
      user.email,
      'Sign up!',
      `Hello there, someone tried to Sign up to our website using your email address.
      If this is you, click the verify button below to sign up with the username
      <span style="color:rgb(4,120,87)">"${user.username}"</span>.
      <p>
      If this is not you, please ignore this email. We'd love it if you considered visiting our
      <a href="${process.env.BASE_URL}" style="color:rgb(29,78,216)">website</a>.
      </p>
      <a href="${process.env.BASE_URL}/auth/verify?t=${token}" style="${styles.htmlVerifyButton}">
        Verify
      </a>`
    )

    return NextResponse.json(
      { msg: 'An email was sent to you, please check your inbox' },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ err }, { status: 400 })
  }
}
