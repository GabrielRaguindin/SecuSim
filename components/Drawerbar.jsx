"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import Headbar from './Headbar';

// Imported Icons
import { HiHome, HiSearch, HiCubeTransparent, HiChevronRight, HiInformationCircle } from 'react-icons/hi';
import { PiNetworkFill } from 'react-icons/pi';
import { MdPolicy } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';

// Imported UI Components
import { TextInput } from 'flowbite-react';

// Imported Context
import { DrawerContext } from '@/context/DwrContext';

const Drawerbar = ({ children }) => {
  const { open } = useContext(DrawerContext);

  return (
    <div className='bg-stone-100 min-h-screen'>
      <Headbar />
      <div className='lg:flex'>
        {/* Sidebar for larger screens */}
        <aside className={`fixed lg:relative bg-gradient-to-r from-teal-700 to-teal-400 
              min-h-screen overflow-hidden transition-all duration-200
              ${open ? "w-60 p-4" : "w-0"} lg:w-[22%] lg:p-4 top-0 left-0 z-50 lg:static`}>

          <h1 className='text-xl text-stone-200'> Menu </h1>

          <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} className='py-3'></TextInput>

          <ul>
            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <HiHome /> </span>
              <Link href='/' class='flex-1 text-stone-200'>Home</Link>
            </li>

            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <MdPolicy /> </span>
              <Link href='/policies' class='flex-1 text-stone-200'>Policy Templates</Link>
              <HiChevronRight class='text-stone-200' />
            </li>

            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <PiNetworkFill /> </span>
              <Link href='/topologies' class='flex-1 text-stone-200'>Topology Templates</Link>
              <HiChevronRight class='text-stone-200' />
            </li>

            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <HiCubeTransparent /> </span>
              <Link href='/' class='flex-1 text-stone-200'>Simulate</Link>
              <HiChevronRight class='text-stone-200' />
            </li>

            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <IoMdAnalytics /> </span>
              <Link href='/' class='flex-1 text-stone-200'>Reports</Link>
            </li>

            <li class='flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300'>

              <span class='mr-4 text-stone-200 text-xl'> <HiInformationCircle /> </span>
              <Link href='/' class='flex-1 text-stone-200'>What is SecuSim?</Link>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className={`flex-1 lg:ml-0 ${open ? 'lg:ml-60' : ''} transition-all duration-200`}>
          {children}
        </main>

      </div>
    </div>
  );
}

export default Drawerbar;