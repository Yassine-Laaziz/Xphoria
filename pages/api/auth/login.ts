import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../lib/mongodb'
import sendVerificationEmail from '../../../lib/utils/sendEmail'
import { sign } from 'jsonwebtoken'
import UserModel from '../../../models/Users'
import styles from '../../../styles'
import { User } from '../../../types'

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const err = 'Something went wrong! please retry or check again later'

  try {
    await connect()
    const email: string = req.body.email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res.status(400).send(err)

    const user: User | null = await UserModel.findOne({ email })
    if (!user)
      return res
        .status(400)
        .send(
          `there is no account with this email address, please consider signing up instead `
        )

    const token = sign({ email, role: 'login' }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h',
    })

    res
      .status(200)
      .send({ msg: 'An email was sent to you, please check your inbox' })

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
  } catch (e) {
    res.status(400).send(err)
  }
}
