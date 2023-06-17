import { NextRequest, NextResponse } from 'next/server'
import { connect } from '../../../../lib/mongodb'
import UserModel from '../../../../models/Users'
import styles from '../../../../styles'
import { User } from '../../../../types'
import { sign } from '../../../../lib/jwt'
import { err } from '../../../../lib/constants'
import sendEmail from '../../../../lib/utils/sendEmail'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    await connect()

    const email = body.email.toLowerCase()
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return NextResponse.json({ err }, { status: 400 })

    const user: User | null = await UserModel.findOne({ email })
    if (!user)
      return NextResponse.json(
        {
          err: 'there is no account with this email address, please consider signing up instead',
        },
        { status: 400 }
      )

    const token = await sign({ email, role: 'login' }, '2h')

    sendEmail(
      user.email,
      'Login !',
      `Hello there, someone tried to login to our website using your email address.
      You can click the verify button below to login. If this is not you, you can still login through the verify button. You're totally safe.
      <a href="${process.env.BASE_URL}/auth/verify?t=${token}" style="${styles.htmlVerifyButton}">
        Verify
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
