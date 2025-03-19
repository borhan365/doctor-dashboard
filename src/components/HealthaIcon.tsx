import Link from "next/link";

function HealthaIcon() {
  return (
    <Link
      href="/"
      className="group flex items-center transition-all duration-300 group-hover:scale-105"
    >
      <div className="flex items-start">
        {/* H Design */}
        <span className="mr-0.5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black group-hover:border-blue-700 bg-black shadow-default transition-all duration-300 group-hover:bg-blue-700 dark:border-slate-950 sm:h-12 sm:w-12">
          <span className="mt-4 text-[38px] font-black text-white sm:mt-3.5 sm:text-5xl">
            H
          </span>
        </span>
      </div>
    </Link>
  );
}

export default HealthaIcon;
