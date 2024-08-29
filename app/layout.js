import "./globals.css";
import Drawerbar from "@/components/Drawerbar";
import DrawerContextProvider from "@/context/DwrContext";

export const metadata = {
  title: "SecuSim",
  description: "Network Security Policy Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DrawerContextProvider>
          <Drawerbar> {children} </Drawerbar>
        </DrawerContextProvider>
      </body>
    </html>
  );
}