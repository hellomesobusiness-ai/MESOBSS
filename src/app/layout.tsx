import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import LoadingProvider from "@/components/LoadingProvider"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MESO | Modernize Every SME with Opportunity",
  description:
    "Business growth agency helping startups and SMEs grow through AI, branding, websites, marketing, and automation.",
  openGraph: {
    title: "MESO | Business Growth Ecosystem",
    description:
      "We help businesses grow through AI, branding, websites, marketing and automation.",
    siteName: "MESO",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="font-sans">
        <LoadingProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  )
}
