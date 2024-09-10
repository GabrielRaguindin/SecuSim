"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { Card, Button } from "flowbite-react"

import { LuFileWarning } from "react-icons/lu";
import { PiShieldWarning, PiCloudWarning, PiSealWarning } from "react-icons/pi";

const Simulator = () => {
    return (
        <div className='font-montserrat'>
            <div className='flex justify-evenly mb-7'>
                <Card className='w-[45%] shadow-xl'>
                    <LuFileWarning className='text-5xl text-stone-600' />
                    <h1 className='text-2xl font-medium text-stone-600'>
                        Scenario 1 </h1>

                    <p className='text-stone-600'>
                        Simulate a scenario where a specific network has a problem with file sharing. </p>

                    <Button gradientMonochrome='teal'
                            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                            as={Link} href='/scenario/one'>
                        Simulate
                    </Button>
                </Card>

                <Card className='w-[45%] shadow-xl'>
                    <PiShieldWarning className='text-6xl text-stone-600' />
                    <h1 className='text-2xl font-medium text-stone-600'>
                        Scenario 2 </h1>

                    <p className='text-stone-600'>  
                        Simulate a scenario where a specific network has experiencing a network breach. </p>
                    
                    <Button gradientMonochrome='teal'
                            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                            as={Link} href='/scenario/two'>
                        Simulate
                    </Button>
                </Card>
            </div>

            <div className='flex justify-evenly'>
                <Card className='w-[45%] shadow-xl'>
                    <PiCloudWarning className='text-6xl text-stone-600' />
                    <h1 className='text-2xl font-medium text-stone-600'>
                        Scenario 3 </h1>

                    <p className='text-stone-600'>
                        Simulate a scenario where the network has to prioritize streaming over gaming. </p>
                    <Button gradientMonochrome='teal'
                            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                            as={Link} href='/scenario/three'>
                        Simulate
                    </Button>
                </Card>

                <Card className='w-[45%] shadow-xl'>
                    <PiSealWarning className='text-6xl text-stone-600' />
                    <h1 className='text-2xl font-medium text-stone-600'>
                        Scenario 4 </h1>

                    <p className='text-stone-600'>
                        Simulate a scenario where the network has no firewall activated. </p>

                    <Button gradientMonochrome='teal'
                            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                            as={Link} href='/scenario/four'>
                        Simulate
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default Simulator