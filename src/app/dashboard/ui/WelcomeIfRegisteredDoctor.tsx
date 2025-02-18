import { useSession } from "next-auth/react";
import Image from "next/image";

function WelcomeIfRegisteredDoctor() {
  const { data: session } = useSession();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/images/user/default-user.webp",
    profileImage: {
      featuredImage: "/images/user/default-user.webp",
    },
  };

  console.log("featured image:", user?.profileImage?.featuredImage);
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          {user?.image || user?.profileImage?.featuredImage ? (
            <Image
              src={user.image || user?.profileImage?.featuredImage}
              alt={user.name || "Profile"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-blue-600"> Dr. {user?.name}</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {`Here's what's happening with your practice today`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeIfRegisteredDoctor;
