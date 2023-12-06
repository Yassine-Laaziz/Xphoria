export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex min-h-[calc(100vh-76px)] items-center justify-center'>
      <div
        className='w-full max-w-xs rounded-xl border-4 dark:border-gray-700 p-8 dark:shadow-none
         dark:text-white border-black'
      >
        {children}
      </div>
    </main>
  )
}
