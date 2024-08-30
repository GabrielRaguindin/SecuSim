"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import Headbar from './Headbar';

// Imported Icons
import { HiSearch, HiChevronRight } from 'react-icons/hi';

// Imported UI Components
import { TextInput } from 'flowbite-react';

// Imported Context
import { DrawerContext } from '@/context/DwrContext';
import { drawerData } from './data/drawerData';

const Drawerbar = ({ children }) => {
  const { open } = useContext(DrawerContext);

  return (
    <div className='bg-stone-100 min-h-screen font-montserrat'>
      <Headbar />
      <div className='lg:flex'>
        {/* Sidebar for larger screens */}
        <aside className={`fixed lg:relative bg-gradient-to-r from-teal-700 to-teal-400 
              min-h-screen overflow-hidden transition-all duration-200
              ${open ? "w-60 p-4" : "w-0"} lg:w-[22%] lg:p-4 top-0 left-0 z-50 lg:static`}>

          <h1 className='text-xl text-stone-200'> Menu </h1>

          <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} className='py-3'></TextInput>

          <ul>
            {drawerData.map((item, index) => (
              <li
                key={index}
                className="flex justify-start items-center 
                hover:bg-glass-bg hover:backdrop-blur-md rounded-md p-2 
                cursor-pointer transition-all duration-300"
              >
                <span className="mr-4 text-stone-200 text-xl">{item.icon}</span>
                <Link href={item.link} className="flex-1 text-stone-200">
                  {item.label}
                </Link>
                {item.hasChevron && <HiChevronRight className="text-stone-200" />}
              </li>
            ))}
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