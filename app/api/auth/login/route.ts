import { NextRequest, NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongodb'
import sendVerificationEmail from '../../../../lib/utils/sendEmail'
import UserModel from '../../../../models/Users'
import styles from '../../../../styles'
import { User } from '../../../../types'
import { sign } from '../../../../lib/jwtAuth'
import { err } from '../../../../lib/constants'

export async function POST(request: NextRequest) {
  const req = await request.json()

  try {
    await connect()
    const email: string = req.body.email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return NextResponse.json({ err }, { status: 400 })

    const user: User | null = await UserModel.findOne({ email })
    if (!user)
      return NextResponse.json(
        {
          msg: 'there is no account with this email address, please consider signing up instead',
        },
        { status: 400 }
      )

    const token = await sign({ email, role: 'login' }, '2h')

    sendVerificationEmail(
      user.email,
      `Hello there, someone tried to Login to our website using your email address You can click the verify
      button below to Login, if this is not you, you can still login through the verify button you're totally safe.
      <a
        href="${process.env.BASE_URL}/auth/verify?t=${token}"
        style="${styles.htmlVerifyButton}"
        >
        verify
      </a>`
    )

    return NextResponse.json(
      {
        msg: 'An email was sent to you, please check your inbox',
      },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ err }, { status: 400 })
  }
}
