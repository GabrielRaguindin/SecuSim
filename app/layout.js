import "./globals.css";
import { Montserrat } from 'next/font/google';
import DrawerContextProvider from "@/context/DwrContext";
import RootLayoutClient from "@/components/RootLayoutClient";

const montserrat_init = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '500'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "SecuSim",
  description: "Network Security Policy Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat_init.variable}>
        <DrawerContextProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </DrawerContextProvider>
      </body>
    </html>
  );
}
