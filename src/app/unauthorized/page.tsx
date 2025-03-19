"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      toast.error("Please login to access this page");
      router.push("/auth/login");
    } else {
      toast.error("You are not authorized to access this page");
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Unauthorized Access
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          You don't have permission to access this page.
        </p>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
