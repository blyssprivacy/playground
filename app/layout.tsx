import './css/style.css'

import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Blyss',
  description: 'The platform for confidential AI.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}>
          <div className="flex flex-col min-h-screen overflow-hidden">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
