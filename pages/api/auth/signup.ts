import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../lib/mongodb'
import clientSideCheck from '../../../lib/utils/clientSideCheck'
import sendVerificationEmail from '../../../lib/utils/sendEmail'
import { sign } from 'jsonwebtoken'
import UserModel from '../../../models/Users'
import { User } from '../../../types'
import styles from '../../../styles'

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const err = 'Something went wrong! please retry or check again later'
  try {
    await connect()
    const user: User = req.body.user
    const { username, email } = user
    if (!clientSideCheck(user).isCorrect) return res.status(400).send(err)

    if (await UserModel.findOne({ username }))
      return res.status(422).send('This username has been taken!')

    if (await UserModel.findOne({ email })) {
      return res.status(422).send('This email address has been taken!')
    }

    const token = sign({ user, role: 'signup' }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h',
    })
    res.status(200).send('An email was sent to you, please check your inbox')

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
  } catch (e) {
    res.status(400).send(err)
  }
}
