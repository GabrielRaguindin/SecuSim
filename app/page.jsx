import { Button } from "flowbite-react"
import Link from 'next/link'

export default function page() {
  return (
    <div className="font-montserrat min-h-screen bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%">
      <div className="flex flex-col justify-center items-start h-screen p-9 ml-10">
        <h1 className="text-7xl font-bold text-stone-100 font-montserrat mb-5"> SecuSim </h1>
        <p className="text-stone-100 text-2xl font-montserrat"> Interactive Network Sandbox and Simulator for all beginners.. </p>
        <Button color='gray' 
            className="shadow-xl transform hover:scale-105 active:scale-100 transition duration-300 mt-5" 
            as={Link} href='/home'> Get Started </Button>
      </div>
    </div>
  )
}