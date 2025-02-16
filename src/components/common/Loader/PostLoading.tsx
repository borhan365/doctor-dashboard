export default function PostLoading() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-md border border-slate-100 mb-5">
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-blue-200"></div>
        <div className="absolute left-0 top-0 h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
      <p className="text-gray-600 mt-4 text-lg font-medium">Loading...</p>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
