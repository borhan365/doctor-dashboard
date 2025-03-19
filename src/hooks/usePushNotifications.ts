import axios from "axios";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  NotificationSetting,
  PushNotificationSettings,
} from "../types/pushNotifications";
import { ApiUrl } from "@/app/Variables";

/**
 * Hook to fetch and manage push notification settings
 */
export const usePushNotifications = () => {
  const [settings, setSettings] = useState<PushNotificationSettings | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notification settings from the API
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<PushNotificationSettings>>(
        `${ApiUrl}/settings/push-notifications/get-single`,
      );

      if (response.data.status === "success" && response.data.data) {
        setSettings(response.data.data);
      } else {
        setError(
          response.data.error || "Failed to fetch notification settings",
        );
      }
    } catch (err) {
      console.error("Error fetching notification settings:", err);
      setError("Failed to fetch notification settings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  /**
   * Check if a notification should be shown based on its settings
   */
  const shouldShowNotification = (
    notification: NotificationSetting | undefined,
    notificationType: string,
  ): boolean => {
    if (!notification || !notification.enabled) return false;

    // Check date range
    const now = new Date();
    const startDate = notification.startDate
      ? new Date(notification.startDate)
      : null;
    const endDate = notification.endDate
      ? new Date(notification.endDate)
      : null;

    const isWithinDateRange =
      (!startDate || now >= startDate) && (!endDate || now <= endDate);

    if (!isWithinDateRange) return false;

    // Check if it should only be shown once
    if (notification.showOnce) {
      const shownNotifications = JSON.parse(
        localStorage.getItem("shownNotifications") || "{}",
      );

      // Use a more specific key that includes the notification type
      const notificationKey = `${notificationType}`;

      if (shownNotifications[notificationKey]) {
        return false;
      }
    }

    return true;
  };

  /**
   * Mark a notification as shown in localStorage
   */
  const markNotificationAsShown = (notificationType: string) => {
    if (!notificationType) return;

    const shownNotifications = JSON.parse(
      localStorage.getItem("shownNotifications") || "{}",
    );

    localStorage.setItem(
      "shownNotifications",
      JSON.stringify({
        ...shownNotifications,
        [notificationType]: true,
      }),
    );
  };

  return {
    settings,
    loading,
    error,
    fetchSettings,
    shouldShowNotification,
    markNotificationAsShown,
  };
};

/**
 * Hook specifically for header top notifications
 */
export const useHeaderTopNotification = () => {
  const {
    settings,
    loading,
    error,
    shouldShowNotification,
    markNotificationAsShown,
  } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const headerTopNotification = settings?.doctorSettings?.headerTop;
  const shouldShow =
    !dismissed && shouldShowNotification(headerTopNotification, "headerTop");

  // Handle fade-in effect
  useEffect(() => {
    if (shouldShow) {
      // Small delay for the fade-in effect
      const timer = setTimeout(() => {
        setVisible(true);
      }, 100);

      // If showOnce is true, mark it as shown immediately
      if (headerTopNotification?.showOnce) {
        markNotificationAsShown("headerTop");
      }

      // Auto-dismiss if duration is set
      if (headerTopNotification?.displayDuration) {
        const dismissTimer = setTimeout(() => {
          handleDismiss();
        }, headerTopNotification.displayDuration * 1000);

        return () => {
          clearTimeout(timer);
          clearTimeout(dismissTimer);
        };
      }

      return () => clearTimeout(timer);
    }
  }, [shouldShow, headerTopNotification, markNotificationAsShown]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
    }, 500); // Match with CSS transition duration
  };

  return {
    notification: headerTopNotification,
    loading,
    error,
    visible,
    dismissed,
    handleDismiss,
    shouldShow,
  };
};

/**
 * Hook specifically for popup notifications
 */
export const usePopupNotification = () => {
  const {
    settings,
    loading,
    error,
    shouldShowNotification,
    markNotificationAsShown,
  } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const popupNotification = settings?.doctorSettings?.popup;
  const shouldShow =
    !dismissed && shouldShowNotification(popupNotification, "popup");

  // Handle fade-in effect
  useEffect(() => {
    if (shouldShow) {
      // Small delay for the fade-in effect
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500); // Slightly longer delay for popup to not compete with header

      // If showOnce is true, mark it as shown immediately
      if (popupNotification?.showOnce) {
        markNotificationAsShown("popup");
      }

      // Auto-dismiss if duration is set
      if (popupNotification?.displayDuration) {
        const dismissTimer = setTimeout(() => {
          handleDismiss();
        }, popupNotification.displayDuration * 1000);

        return () => {
          clearTimeout(timer);
          clearTimeout(dismissTimer);
        };
      }

      return () => clearTimeout(timer);
    }
  }, [shouldShow, popupNotification, markNotificationAsShown]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
    }, 500); // Match with CSS transition duration
  };

  return {
    notification: popupNotification,
    loading,
    error,
    visible,
    dismissed,
    handleDismiss,
    shouldShow,
  };
};
