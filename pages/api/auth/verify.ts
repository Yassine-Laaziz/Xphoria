import { User } from "./../../../types"
import type { NextApiRequest, NextApiResponse } from "next"
import UserModel from "../../../models/Users"
import { connect } from "../../../lib/mongodb"
import { sign, verify } from "jsonwebtoken"
import { serialize } from "cookie"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const err = {
    isErr: true,
    msg: "Something went wrong, Please retry or check again later",
  }
  const success = { msg: "Email verified successfully!" }
  try {
    await connect()
    const payload = verify(req.body.jwtToken, process.env.JWT_SECRET_KEY)
    if (typeof payload !== "object") return res.status(400).json(err)
    if (payload.role !== "auth") return
    const user: User = payload.user
    const { email, username } = user
    if (!email || !username) return res.status(400).json(err)

    const emailAlreadyExists = await UserModel.findOne({ email })
    const usernameAlreadyExists = await UserModel.findOne({ username })
    if (emailAlreadyExists || usernameAlreadyExists)
      return res.status(200).json(success)

    await UserModel.create(payload.user)
    const jwtToken = sign(
      { signedUp: true, user },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "17d" }
    )
    const serialized = serialize("jwtToken", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 17,
      path: "/",
    })
    res.setHeader("Set-Cookie", serialized)

    res.status(200).json(success)
  } catch (e) {
    res.status(400).json(err)
  }
}
