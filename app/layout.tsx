import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Airbnb - Onboarding",
  description: "Complete your Airbnb account setup",
  icons: {
    icon: [
      {
        url: "/airbnb-logo.png",
        type: "image/png",
        sizes: "16x16 32x32",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
          <Toaster />
          <Footer />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </QueryProvider>
      </body>
    </html>
  );
}
