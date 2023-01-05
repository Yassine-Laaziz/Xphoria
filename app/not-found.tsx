import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl mb-4">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="bg-emerald-500 hover:bg-emerald-700 font-bold py-2 px-4 rounded"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
