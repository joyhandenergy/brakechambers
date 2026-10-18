import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';
import CookieConsent from '@/components/layout/CookieConsent';
import SplashScreen from '@/components/layout/SplashScreen';
import GlobalSearchModal from '@/components/ui/GlobalSearchModal';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.brakechambers.com'),
  title: 'BRC Brake Chambers | Professional Factory Sales',
  description: 'Premium quality commercial brake chambers, spring brakes, service brakes, and parts. OEM Cross-Reference available.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'none',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'BRC Brake Chambers | Professional Factory Sales',
    description: 'Premium quality commercial brake chambers, spring brakes, service brakes, and parts. OEM Cross-Reference available.',
    url: 'https://www.brakechambers.com',
    siteName: 'BRC Brake Chambers',
    images: [
      {
        url: 'https://www.brakechambers.com/images/logo-brc.png',
        width: 800,
        height: 800,
        alt: 'BRC Brake Chambers Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BRC Brake Chambers | Professional Factory Sales',
    description: 'Premium quality commercial brake chambers, spring brakes, service brakes, and parts.',
    images: ['https://www.brakechambers.com/images/logo-brc.png'],
  },
};

import { getProducts } from '@/sanity/queries';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://translate.googleapis.com" crossOrigin="anonymous" />
        <script id="splash-check" dangerouslySetInnerHTML={{ __html: `
          try {
            if (sessionStorage.getItem('hasSeenSplash')) {
              document.documentElement.classList.add('hide-splash');
            }
          } catch (e) {}
        `}} />
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: #F8FAFC; }
          #splash-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background-color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          html.hide-splash #splash-container { display: none !important; }
        `}} />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#F8FAFC] text-navy-900 flex flex-col min-h-screen overflow-x-clip`}>

        <NextTopLoader
          color="#FFB000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFB000,0 0 5px #FFB000"
          zIndex={9999}
        />
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script id="google-translate-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,zh-CN',
                autoDisplay: false
              }, 'google_translate_element');
            };
          `
        }} />
        <Script src="https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        
        {/* Ahrefs Web Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="i1gVBXGaGQkbrtol03jXyQ"
          strategy="afterInteractive"
        />
        
        <SplashScreen />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <GlobalSearchModal products={products} />
        <WhatsAppWidget />
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
