import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import QueryProvider from '@/components/QueryProvider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'


export const metadata: Metadata = {
  title: 'Airbnb - Onboarding',
  description: 'Complete your Airbnb account setup',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
          <Toaster />
          <Footer />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </QueryProvider>

      </body>
    </html>
  )
}

