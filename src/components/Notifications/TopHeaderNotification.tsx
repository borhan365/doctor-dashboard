import Link from "next/link";
import { useHeaderTopNotification } from "../../hooks/usePushNotifications";

function TopHeaderNotification() {
  const { notification, loading, visible, shouldShow, handleDismiss } =
    useHeaderTopNotification();

  // Don't render anything if loading or notification shouldn't be shown
  if (loading || !shouldShow || !notification) return null;

  return (
    <section
      style={{
        backgroundColor: notification.backgroundColor || "#1d4ed8",
        color: notification.textColor || "#ffffff",
        transition: "opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
        opacity: visible ? 1 : 0,
        maxHeight: visible ? "200px" : "0",
        overflow: "hidden",
      }}
      className="relative px-4 py-2.5"
    >
      <div className="flex flex-col items-start justify-center gap-1 sm:flex-row sm:items-center sm:gap-2">
        <p
          className="text-base font-medium"
          style={{ color: notification.textColor || "#ffffff" }}
        >
          {notification.title || "Important notification"}
        </p>

        {notification.buttonText && notification.buttonLink && (
          <Link
            href={notification.buttonLink}
            className="font-medium underline"
            style={{ color: notification.textColor || "#ffffff" }}
          >
            {notification.buttonText}
          </Link>
        )}
      </div>

      {notification.dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-black/10"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={notification.textColor || "#ffffff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </section>
  );
}

export default TopHeaderNotification;
