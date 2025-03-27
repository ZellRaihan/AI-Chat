import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from "next/font/google";
import "@/styles/global.css";
import ThemeProvider from "@/components/ThemeProvider";
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ["latin"] });

// Configure next-head-count
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121220' }
  ]
};

// Base metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://ai-chats.net'),
  title: {
    default: 'AI Chat: Your Intelligent Conversation Partner - Free (No Signup)',
    template: '%s | AI Chat'
  },
  description: 'Looking for a free AI chat that actually understands you? Our online AI chat assistant delivers helpful, human-like conversations without signups, subscriptions, or complications.',
  keywords: ['AI chat', 'free AI chat', 'no signup chatbot', 'AI assistant', 'human-like AI', 'intelligent conversations', 'chatbot', 'AI tools', 'AI writing assistant', 'GPT', 'Claude', 'language model', 'virtual assistant', 'AI helper'],
  authors: [{ name: 'AI Chat Team' }],
  creator: 'AI Chat Team',
  publisher: 'AI Chat',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ai-chats.net',
    languages: {
      'en-US': 'https://ai-chats.net',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-chats.net',
    siteName: 'AI Chat',
    title: 'AI Chat: Your Intelligent Conversation Partner - Free (No Signup)',
    description: 'Looking for a free AI chat that actually understands you? Our online AI chat assistant delivers helpful, human-like conversations without signups, subscriptions, or complications.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'AI Chat Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chat: Your Intelligent Conversation Partner - Free (No Signup)',
    description: 'Looking for a free AI chat that actually understands you? Our online AI chat assistant delivers helpful, human-like conversations without signups, subscriptions, or complications.',
    images: ['/android-chrome-512x512.png'],
    creator: '@aichat',
  },
  icons: {
    icon: [
      { url: '/globe.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'Add your Google Search Console verification code here',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Chat',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'technology',
  classification: 'business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="content-language" content="en-US" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
