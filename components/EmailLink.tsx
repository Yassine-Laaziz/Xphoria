import Link from 'next/link'
import styles from '../styles'

type Props = { email: string; goBack: () => void }
export default function EmailLink({ email, goBack }: Props) {
  const domain = email.split('@')[1]
  let link: { name: string; url: string } = { name: '', url: '' }

  switch (domain) {
    case 'gmail.com':
      link = { name: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox' }
      break
    case 'hotmail.com':
    case 'outlook.com':
      link = { name: 'Hotmail', url: 'https://outlook.live.com/mail/inbox' }
      break
    case 'yahoo.com':
      link = { name: 'Yahoo', url: 'https://mail.yahoo.com/d/folders/1' }
      break
    case 'aol.com':
      link = {
        name: 'Aol',
        url: 'https://mail.aol.com/webmail-std/en-us/suite',
      }
      break
    default:
      link = { name: '', url: '' }
  }

  return (
    <div className='text-center'>
      <h2 className={`relative ${link.name ? 'pb-16' : ''}`}>
        Check your inbox at {email}
        <span className='font-bold text-xs block text-red-500'>NOTE: check spam section</span>
        {link.name && (
          <Link
            href={link.url}
            className={`bg-gray-900 dark:text-white text-blue-700 [text-shadow:0_0_2px_rgb(29_78_216)]
            cursor-pointer hover:scale-110 transition ${styles.loopingBorder}
            left-1/2 -translate-x-1/2 bottom-0`}
          >
            open {link.name}
          </Link>
        )}
      </h2>
      <h2
        onClick={goBack}
        className='text-teal-500 mt-12 cursor-pointer'
      >
        change email address?
      </h2>
    </div>
  )
}
