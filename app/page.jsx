import Link from 'next/link'
import { Card, Button, Popover } from 'flowbite-react'

const page = () => {
  return (
    <div>

      <div className='text-center text-3xl font-bold text-stone-600 py-5'> Welcome to SecuSim </div>

      <div className='flex justify-evenly'>
        <Card className='w-[45%] shadow-xl'>
          <img src="/Topology.jpg" alt="random image" className='rounded' />
          <h5 className='text-2xl font-medium text-stone-600'> Topology Builder </h5>
          <p className='text-stone-600'> Start creating your Network Topology Architecture </p>
          <Button gradientMonochrome='teal'
            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
            as={Link} href='topologies'>
            Start Building </Button>
        </Card>

        <Card className='w-[45%] shadow-xl'>
          <img src="/Simulation.jpg" alt="random image" className='rounded' />
          <h5 className='text-2xl font-medium text-stone-600'> Simulation Room </h5>
          <p className='text-stone-600'> Enter the Simulation Room with SecuSim&apos;s pinnacle feature </p>
          <div className='flex justify-evenly gap-5'>
            <Popover
              content={
                <div className="w-64 text-sm text-gray-500">
                  <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                    <h3 className="font-semibold text-gray-900"> This is the Simulation Room </h3>
                  </div>
                  <div className="px-3 py-2">
                    <p> Here you can simulate Network Policy templates
                      into a Network Topology architecture.
                    </p>
                    <p> In this Simulation Room, you can deploy the policies into
                      a device in a topology to test it&apos;s effectiveness. </p>
                  </div>
                </div>
              }
            >
              <Button color="gray" className='w-[47%] text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
                What does this do? </Button>
            </Popover>
            <Button gradientMonochrome='teal'
              className='w-[47%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              as={Link} href='/simulation'>
              Simulate </Button>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default page