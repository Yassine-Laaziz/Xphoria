import { User } from '../../../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../../models/Users'
import { connect } from '../../../lib/mongodb'
import { sign, verify } from 'jsonwebtoken'
import { serialize } from 'cookie'
import sendEmail from '../../../lib/utils/sendEmail'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const err = 'Something went wrong, Please retry or check again later'
  try {
    await connect()
    const payload = verify(req.body.jwtToken, process.env.JWT_SECRET_KEY)
    if (
      typeof payload !== 'object' ||
      !payload.exp ||
      payload.exp < 0 ||
      !payload.role
    ) {
      return res.status(400).send(err)
    }
    // at this point we know that the payload has 2 properties { role: 'login' | 'signup' } and depending on either
    // the role is login or signup there's going to be an email or a user property derived from 'signup' and 'login' api routes

    let user
    if (payload.role === 'login') {
      const { email } = payload
      const verifiedUser: User | null = await UserModel.findOne({ email })
      if (verifiedUser) user = verifiedUser
      else return res.status(400).send(err)
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
    } else return res.status(400).send(err)

    const { username, email, img, id } = user
    const jwtToken = sign(
      { username, email, img, id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '17d' }
    )

    const serialized = serialize('jwtToken', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 17,
      path: '/',
    })
    res.setHeader('Set-Cookie', serialized)

    res.status(200).send('Verified & logged in successfully!')
  } catch (e) {
    res.status(400).send(err)
  }
}
