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
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'BRC Brake Chambers | Professional Factory Sales',
    description: 'Premium quality commercial brake chambers, spring brakes, service brakes, and parts. OEM Cross-Reference available.',
    url: 'https://www.brakechambers.com',
    siteName: 'BRC Brake Chambers',
    images: [
      {
        url: 'https://www.brakechambers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BRC Brake Chambers - Heavy Duty Truck Parts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRC Brake Chambers | Professional Factory Sales',
    description: 'Premium quality commercial brake chambers, spring brakes, service brakes, and parts.',
    images: ['https://www.brakechambers.com/og-image.jpg'],
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
        <link rel="preconnect" href="https://translate.googleapis.com" crossOrigin="anonymous" />
        <Script id="splash-check" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
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
