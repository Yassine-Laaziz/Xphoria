import { NextRequest, NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongodb'
import clientSideCheck from '../../../../lib/utils/clientSideCheck'
import sendVerificationEmail from '../../../../lib/utils/sendEmail'
import UserModel from '../../../../models/Users'
import { User } from '../../../../types'
import styles from '../../../../styles'
import { sign } from '../../../../lib/jwtAuth'
import { err } from '../../../../lib/constants'

export async function POST(request: NextRequest) {
  const req = await request.json()

  try {
    await connect()
    const user: User = req.body.user
    const { username, email } = user
    if (!clientSideCheck(user).isCorrect)
      return NextResponse.json({ err }, { status: 400 })

    if (await UserModel.findOne({ username }))
      return NextResponse.json(
        { err: 'This username has been taken!' },
        { status: 422 }
      )

    if (await UserModel.findOne({ email })) {
      return NextResponse.json(
        { err: 'This email address has been taken!' },
        { status: 422 }
      )
    }

    const token = sign({ user, role: 'signup' }, '2h')

    sendVerificationEmail(
      user.email,
      `Hello there, someone tried to Sign up to our website using your email address
      if this is you click the verify button below you're gonna Sign up with the username
      <span style="color:rgb(4,120,87)">"${user.username}"</span>
      <p>
      if this is not you please ignore this email and we'd love it if you considered visiting our
      <a href="${process.env.BASE_URL}" style="color:rgb(29,78,216)">website</a>.
      </p>
      <a
        href="${process.env.BASE_URL}/auth/verify?t=${token}"
        style="${styles.htmlVerifyButton}"
      >
        verify
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
