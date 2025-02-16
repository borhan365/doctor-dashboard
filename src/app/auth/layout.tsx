export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {children}
    </div>
  )
} 