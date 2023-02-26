import { User } from "./../../types"
import nodemailer from "nodemailer"

export default async function (user: User, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.USER,
      to: user.email,
      subject: "Verify Your Account",
      html: `
      <div style="
        font-family: monospace, sans-serif;
        background-color:black;
        color:rgb(4 120 87);
        padding: 20px
      ">
      <p style="text-align:center;color:red;font-size:30px">!</p>
      <p style="max-width:800px">
        Hi there, someone tried to Sign up to our website using your email address
        in case it's you verify yourself by checking that you're the one who used the
        username below if yes click the verify button if not just ignore this message.
      </p>
      <p style="margin-top:10px;">
        username:<span style="color: rgb(20 184 166);">${user.username}</span>
      </p>
      <a 
        href="${process.env.BASE_URL}/auth/verify?t=${token}"
        style="
            display:block;
            margin-top:30px;
            cursor: pointer;
            transition: ease-in .1s;
            border: 1px solid;
            border-radius: 10px;
            text-align:center;
            font-weight:900;
            font-size:30px"
          >
        verify
      </a>
    </div>
      `,
    })
  } catch (e) {
    throw new Error(`${e}`)
  }
}
