import "./globals.css";
import { Montserrat } from 'next/font/google';
import Drawerbar from "@/components/Drawerbar";
import DrawerContextProvider from "@/context/DwrContext";

const montserrat_init = Montserrat ({
  subsets: ['latin'],
  weight: ['100', '300', '500'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: "SecuSim",
  description: "Network Security Policy Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat_init.variable}>
        <DrawerContextProvider>
          <Drawerbar> {children} </Drawerbar>
        </DrawerContextProvider>
      </body>
    </html>
  );
}