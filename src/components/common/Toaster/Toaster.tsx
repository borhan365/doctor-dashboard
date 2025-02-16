import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options for all toasts
        duration: 5000,
        style: {
          background: "#fff",
          color: "#363636",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          fontSize: "14px",
          maxWidth: "350px",
        },
        // Custom success styles
        success: {
          duration: 3000,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #dcfce7",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },
        // Custom error styles
        error: {
          duration: 4000,
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fee2e2",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
