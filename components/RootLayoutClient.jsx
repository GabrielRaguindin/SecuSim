"use client";

import { usePathname } from 'next/navigation';
import Drawerbar from "@/components/Drawerbar";

const RootLayoutClient = ({ children }) => {
  const pathname = usePathname();
  
  const pagesWithDrawer = ["/home", "/policies", "/topologies", "/builder", "/simulation", "/results", "/about"];

  return (
    <>
      {pagesWithDrawer.includes(pathname) ? (
        <Drawerbar>{children}</Drawerbar>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default RootLayoutClient;
