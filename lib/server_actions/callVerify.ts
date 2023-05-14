'use server'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export default async function callVerify(
  resolve: () => void,
  reject: () => void
) {
  const searchParams = useSearchParams()
  let jwtToken: null | string = ''
  if (searchParams) jwtToken = searchParams.get('t')
  if (jwtToken) {
    axios
      .post('/api/auth/verify', { jwtToken })
      .then(() => resolve())
      .catch(() => reject())
  } else reject()
  console.log('server or not???')
}
