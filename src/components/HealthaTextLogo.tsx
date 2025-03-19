import Link from "next/link";

function HealthaTextLogo() {
  return (
    <Link
      href="/dashboard"
      className="group flex items-center transition-all duration-300 group-hover:scale-105"
    >
      <div className="flex items-start">
        {/* H Design */}
        <span className="mr-0.5 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black transition-all duration-300 group-hover:bg-green-700 dark:bg-slate-950">
          <span className="mt-2.5 text-3xl font-black text-white">H</span>
        </span>

        {/* eltha.io */}
        <span className="text-3xl font-extrabold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-slate-900/80">
          ealtha
        </span>
        <span className="text-3xl font-extrabold text-green-700 transition-all duration-300 group-hover:text-green-700/80">
          .
        </span>
      </div>
    </Link>
  );
}

export default HealthaTextLogo;
