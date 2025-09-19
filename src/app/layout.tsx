import type { Metadata } from "next"
import { Inter, Sora, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/AuthProvider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "LearnAI - Transform Your Learning Journey with AI",
    template: "%s | LearnAI"
  },
  description: "Experience personalized education powered by artificial intelligence. Join over 100,000 learners advancing their careers with AI-powered learning on LearnAI.",
  keywords: [
    "AI learning",
    "artificial intelligence education",
    "online courses",
    "personalized learning",
    "machine learning courses",
    "professional development",
    "skill development",
    "EdTech",
    "interactive learning"
  ],
  authors: [{ name: "LearnAI Team" }],
  creator: "LearnAI",
  publisher: "LearnAI",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnai.com",
    title: "LearnAI - Transform Your Learning Journey with AI",
    description: "Experience personalized education powered by artificial intelligence. Join over 100,000 learners advancing their careers with AI-powered learning.",
    siteName: "LearnAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LearnAI - AI-Powered Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnAI - Transform Your Learning Journey with AI",
    description: "Experience personalized education powered by artificial intelligence. Join over 100,000 learners advancing their careers.",
    creator: "@learnai",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#7c3aed",
    "color-scheme": "dark light",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body
        className={`${
          inter.variable
        } ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
