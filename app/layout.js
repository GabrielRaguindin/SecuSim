import "./globals.css";
import { Montserrat } from 'next/font/google';
import DrawerContextProvider from "@/context/DwrContext";
import RootLayoutClient from "@/components/RootLayoutClient";
import { headers } from "next/headers";
import { siteConfig } from "./config/site";
import MobileView from "@/components/MobileView";
import manifest from "./manifest";

const montserrat_init = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '500'],
  variable: '--font-montserrat',
});

export const metadata = {
  manifest: manifest(),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Network Simulator", "Network Security Policy", "Network Policy",],

  authors: [{
    name: siteConfig.name,
    url: siteConfig.url,
  },
  ],
  creator: siteConfig.authorName,
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@secu-sim",
  },
  icons: {
    icon: "/public/secusim.png",
  },
};

export default function RootLayout({ children }) {
  const userAgent = headers().get('user-agent') || '';
  const isMobileDevice = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="CTMPkuJM7bVD9ksmGqRMhRaIyC1yuZSNxTlcnuzAuhs" />
      </head>
      <body className={montserrat_init.variable}>
        {isMobileDevice ? <MobileView /> :
          <DrawerContextProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </DrawerContextProvider>
        }

      </body>
    </html>
  );
}
