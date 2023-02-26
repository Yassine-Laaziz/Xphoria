import type { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../lib/mongodb"
import clientSideCheck from "../../../lib/utils/clientSideCheck"
import sendVerificationEmail from "../../../lib/utils/sendVerificationEmail"
import { sign } from "jsonwebtoken"
import UserModel from "../../../models/Users"
import { User } from "../../../types"

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const err = {
    isErr: true,
    msg: "Something went wrong! please retry or check again later",
  }
  try {
    await connect()
    const user: User = req.body.user
    const { username, email } = user
    if (!clientSideCheck(user).isCorrect) return res.status(400).send(err)

    if (await UserModel.findOne({ username }))
      return res
        .status(422)
        .send({ isErr: true, msg: "This username has been taken!" })

    if (await UserModel.findOne({ email })) {
      return res
        .status(422)
        .send({ isErr: true, msg: "This email address has been taken!" })
    }

    const token = sign({ user, role: "auth" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    })
    res
      .status(200)
      .send({ msg: "An email was sent to you, please check your inbox" })

    sendVerificationEmail(user, token)
  } catch (e) {
    res.status(400).send(err)
  }
}
