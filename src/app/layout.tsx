import "@/css/style.css";
import { AuthHydration } from "@/providers/AuthHydration";
import QueryProvider from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <AuthHydration>
            <SessionProvider>{children}</SessionProvider>
          </AuthHydration>
        </QueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
