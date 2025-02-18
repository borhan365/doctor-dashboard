import Link from 'next/link';

export default function FrontendNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frontend Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        {`We're sorry, the page you're looking for doesn't exist in Healtha.io.`}
        </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
