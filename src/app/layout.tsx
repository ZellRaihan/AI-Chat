import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from "next/font/google";
import "@/styles/global.css";
import ThemeProvider from "@/components/ThemeProvider";
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI Chat - Intelligent Conversations with Advanced AI',
  description: 'Experience intelligent conversations with our advanced AI chat platform. Get instant, accurate responses powered by cutting-edge language models.',
  keywords: 'AI chat, artificial intelligence, chatbot, GPT, Claude, AI assistant, intelligent conversations',
  authors: [{ name: 'AI Chat Team' }],
  creator: 'AI Chat Team',
  publisher: 'AI Chat',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-chats.net',
    siteName: 'AI Chat',
    title: 'AI Chat - Intelligent Conversations with Advanced AI',
    description: 'Experience intelligent conversations with our advanced AI chat platform. Get instant, accurate responses powered by cutting-edge language models.',
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
    title: 'AI Chat - Intelligent Conversations with Advanced AI',
    description: 'Experience intelligent conversations with our advanced AI chat platform. Get instant, accurate responses powered by cutting-edge language models.',
    images: ['/android-chrome-512x512.png'],
    creator: '@aichat',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
    userScalable: true,
  },
  themeColor: '#8b5cf6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Chat',
    startupImage: [
      {
        url: '/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/apple-splash-1668-2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/apple-splash-1290-2796.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: 'https://ai-chats.net',
    languages: {
      'en-US': 'https://ai-chats.net',
    },
  },
  verification: {
    google: 'your-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#121220',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/android-chrome-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/android-chrome-512x512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="content-language" content="en-US" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
