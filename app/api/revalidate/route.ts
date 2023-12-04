import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    // verication
    const signature = request.headers.get('sanity-webhook-signature')
    const authorization = request.headers.get('authorization')
    if (!signature || !authorization) return Response.error()

    const secret = process.env.SANITY_WEBHOOK_SECRET
    if (!verifyWebhookSignature(signature, authorization, secret)) return Response.error()

    revalidateTag('sanity') // revalidate Sanity Cache
    return Response.json({}, { status: 200 })
  } catch (err) {
    return Response.error()
  }
}

function verifyWebhookSignature(
  headerSignature: string,
  headerAuthorization: string,
  secret: string,
  allowedTimeDifferenceInSeconds: number = 90 // 1:30 minutes
): boolean {
  if (headerAuthorization !== secret) return false

  // Extract timestamp and signature from the header
  const [, timestamp, receivedSignature] = headerSignature.match(/t=(\d+),v1=(.+)/) || []
  // Invalid header format
  if (!timestamp || !receivedSignature) return false

  // Ensure the timestamp is recent enough
  const currentTime = Math.floor(Date.now() / 1000) // Convert milliseconds to seconds
  const receivedTimestamp = Math.floor(parseInt(timestamp, 10) / 1000) // Convert to a number then to seconds
  if (Math.abs(currentTime - receivedTimestamp) > allowedTimeDifferenceInSeconds) return false // too old

  return true
}
