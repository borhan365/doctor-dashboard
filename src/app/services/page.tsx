"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Services() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div>
      <h1>Services</h1>
      {/* Your services content here */}
    </div>
  );
}
