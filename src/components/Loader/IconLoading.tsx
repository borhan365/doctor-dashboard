function IconLoading({
  fullScreen = true,
  inline = false,
}: {
  fullScreen?: boolean;
  inline?: boolean;
}) {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-99999 flex items-center justify-center bg-white/75"
          : ""
      } ${
        inline
          ? "absolute inset-0 z-99999 flex items-center justify-center bg-white/75"
          : ""
      }`}
    >
      <div className="flex items-start">
        {/* Pulse effect container */}
        <div className="relative">
          {/* Multiple pulse rings */}
          <div className="animate-pulse-ring-1 absolute inset-0 rounded-full border-2 border-blue-500 opacity-75"></div>
          <div className="animate-pulse-ring-2 absolute inset-0 rounded-full border-2 border-blue-500 opacity-75"></div>
          <div className="animate-pulse-ring-3 absolute inset-0 rounded-full border-2 border-blue-500 opacity-75"></div>
          {/* H Design */}
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black sm:h-12 sm:w-12">
            <span className="mt-4 text-[38px] font-black text-white sm:mt-3.5 sm:text-5xl">
              H
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default IconLoading;
