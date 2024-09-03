"use client";
import { useContext } from 'react'
import { FaBars } from 'react-icons/fa6'
import { DrawerContext } from '@/context/DwrContext';

const Headbar = () => {
    const { toggle } = useContext(DrawerContext);
    return (
        <div className='bg-gradient-to-r from-teal-700 from-10% to-teal-400 to-90% flex justify-between items-center px-5 h-16'>
            <div className='text-2xl text-stone-100 font-bold font-montserrat'> SecuSim </div>
            <div onClick={toggle} className='lg:hidden'>
                <FaBars className='cursor-pointer text-stone-100 text-2xl' />
            </div>
        </div>
    )
}

export default Headbar