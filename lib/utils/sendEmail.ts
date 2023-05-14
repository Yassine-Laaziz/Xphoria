'use server'

import nodemailer from 'nodemailer'

export default async function (email: string, htmlText: string) {
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
      to: email,
      subject: 'Email Verification',
      html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Message</title>
        <style type="text/css">
          body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            background-color: #f2f2f2;
          }
      
          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-spacing: 0;
            margin: 0 auto;
          }
      
          td, th {
            padding: 20px;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: black;
            border-radius: 20px;
            color:white
          }

        </style>
      </head>
      <body>
        <center>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" valign="top">
                <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      ${htmlText}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>
      `,
    })
  } catch (e) {
    throw new Error(`${e}`)
  }
}
