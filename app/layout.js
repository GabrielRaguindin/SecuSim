import "./globals.css";
import { Montserrat } from 'next/font/google';
import DrawerContextProvider from "@/context/DwrContext";
import RootLayoutClient from "@/components/RootLayoutClient";
import { headers } from "next/headers";
import MobileView from "@/components/MobileView";

const montserrat_init = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '500'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "SecuSim",
  description: "SecuSim is a web-based Network Security Policy Simulator that provides virtual network simulation environment. This is a Capstone Project",
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
        { isMobileDevice ? <MobileView /> :
          <DrawerContextProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </DrawerContextProvider>
        }

      </body>
    </html>
  );
}
