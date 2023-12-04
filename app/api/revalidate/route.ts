import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(req, process.env.SANITY_WEBHOOK_SECRET)
    if (!isValidSignature) return Response.json({ message: 'Invalid signature', isValidSignature, body }, { status: 401 })
    if (!body?._type) return Response.json({ message: 'Bad Request' }, { status: 400 })

    revalidateTag('sanity')
    return NextResponse.json({ body }, { status: 200 })
  } catch (err) {
    return Response.json('something went wrong!', { status: 500 })
  }
}
