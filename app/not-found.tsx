import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center dark:text-white'>
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold'>Page Not Found</h1>
        <p className='mb-4 text-xl'>Sorry, the page you are looking for could not be found.</p>
        <Link
          href='/'
          className='rounded bg-emerald-500 px-4 py-2 font-bold hover:bg-emerald-700'
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
