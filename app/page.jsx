import { Button } from "flowbite-react"
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="font-montserrat min-h-screen bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90% overflow-hidden">
      <div className="flex flex-col justify-center items-start h-screen p-9 ml-10">
        <Image
          src="/secusim.png"
          alt="random image"
          width={70}
          height={70}
          className="mb-3 animate-fadeIn delay-500"
        />
        <h1 className="text-8xl font-bold text-stone-100 font-montserrat mb-5 animate-fadeIn delay-100">
          SecuSim
        </h1>

        <p className="text-stone-100 text-2xl font-montserrat animate-fadeIn delay-300">
          Interactive Network Sandbox and Simulator for all beginners..
        </p>

        <Button
          color="gray"
          className="mt-5 animate-fadeIn delay-500 shadow-md"
          as={Link} href='/home'>
          Get Started
        </Button>
      </div>
    </div>
  )
}
