import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Bangladesh's 1st & Largest Health Directory",
    template: "%s | Bangladesh's 1st & Largest Health Directory",
  },
  description:
    "Find and connect with the best hospitals and healthcare providers",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bangladesh's 1st & Largest Health Directory",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhealthcare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};
