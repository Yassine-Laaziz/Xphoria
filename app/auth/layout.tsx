export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-76px)] flex items-center justify-center">
      <div className="border-4 border-gray-700 p-8 rounded-xl text-white max-w-xs w-full">
        {children}
      </div>
    </main>
  )
}
