import { X } from "lucide-react";
import Link from "next/link";
import { usePopupNotification } from "../../hooks/usePushNotifications";

function PopupNotificationModel() {
  const { notification, loading, visible, shouldShow, handleDismiss } =
    usePopupNotification();

  console.log("notification", notification);

  // Don't render anything if loading or notification shouldn't be shown
  if (loading || !shouldShow || !notification) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-lg p-10 shadow-xl"
        style={{
          backgroundColor: notification.backgroundColor || "#ffffff",
          color: notification.textColor || "#000000",
          transform: visible ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {notification.dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 rounded-full p-1 transition-colors hover:bg-gray-700 hover:bg-opacity-20"
            aria-label="Close notification"
          >
            <X size={20} color={notification.textColor || "#000000"} />
          </button>
        )}

        <div className="mb-6">
          <h3 className="mb-2 text-2xl font-bold">
            {notification.title || "Notification"}
          </h3>
          <p className="text-base opacity-90">
            {notification.description || ""}
          </p>
        </div>

        {notification.buttonText && notification.buttonLink && (
          <div className="mt-6">
            <Link
              href={notification.buttonLink}
              className={`inline-block rounded-md border border-current px-4 py-2 text-base font-medium transition-colors hover:bg-opacity-90`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: notification.textColor || "#000000",
              }}
            >
              {notification.buttonText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupNotificationModel;
