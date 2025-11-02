import './globals.css'
import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { ThemeProvider } from './providers'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazir',
})

export const metadata: Metadata = {
  title: '🔍 موتور جست‌وجوی فارسی',
  description: 'موتور جست‌وجوی هوشمند فارسی با هوش مصنوعی',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazir.variable} font-vazir`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
