"use client"

import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'

const ThirdScenario = () => {

  const [showModal, setShowModal] = useState(true);

  return (
    <div className='font-montserrat'>
      <div className='flex justify-end p-5'>
        <Button gradientMonochrome='teal' onClick={() => setShowModal(true)}>Open Scenario Condition</Button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} className='font-montserrat'>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>
          Given Scenario
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-2'>
            <p className='text-stone-600 font-bold'> Problem Description : </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, ratione error est recusandae consequuntur
              quidem aliquid voluptates numquam voluptas laborum incidunt rerum beatae non, harum minima suscipit amet deleniti
              consequatur!
            </p>
          </div>
          <div className='flex justify-end mt-5'>
            <Button gradientMonochrome='teal' onClick={() => setShowModal(false)}>
              Got it!
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ThirdScenario