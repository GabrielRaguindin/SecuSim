"use client";

import { useState } from 'react'
import { Card, Button, Modal } from 'flowbite-react';
import { TbTopologyFull, TbTopologyRing, TbTopologyStar } from 'react-icons/tb';
import { TopologyCanvas } from '@/components/TopologyCanvas';

const page = () => {

  const [openModalRing, setOpenModalRing] = useState(false);
  const [openModalStar, setOpenModalStar] = useState(false);
  const [openModalMesh, setOpenModalMesh] = useState(false);

  const ringTopology = {
    nodes: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 1 },
    ],
  };

  const starTopology = {
    nodes: [
      { id: 1, label: "Center Node" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
      { id: 6, label: "Node 6" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 1, to: 6 },
    ],
  };

  const meshTopology = {
    nodes: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
    ],
  };

  return (
    <div className='font-montserrat'>
      <div className='text-center text-2xl font-bold text-stone-600 py-5'> Topology Templates </div>

      {/* Templates: Ring, Star, Mesh */}
      <div className='flex flex-col justify-center p-5 gap-5'>
        <Card className='w-[100%] shadow-xl'>
          <TbTopologyRing className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Ring Topology </h5>
          <p className='text-stone-600'>Ring topology is a type of network configuration
            where devices are connected in a circular manner, forming a closed loop.</p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalRing(true)}>
              View Details </Button>
          </div>
        </Card>

        <Card className='w-[100%] shadow-xl'>
          <TbTopologyStar className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Star Topology </h5>
          <p className='text-stone-600'>Star topology is a type of network configuration
            in which each network component is physically connected to a central node </p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalStar(true)}>
              View Details </Button>
          </div>
        </Card>

        <Card className='w-[100%] shadow-xl'>
          <TbTopologyFull className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Mesh Topology </h5>
          <p className='text-stone-600'>Mesh topology is a type of network configuration
            where each computer and network device is interconnected with one another. </p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalMesh(true)}>
              View Details </Button>
          </div>
        </Card>
      </div>


      {/* Modals: Ring, Star, Mesh */}
      <Modal className='font-montserrat' show={openModalRing} onClose={() => setOpenModalRing(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'> Ring Topology </Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'> In a Ring Topology, data is transmitted from one node to the next in a sequential manner. 
            When you send data from one node, it travels to the next node in the ring, 
            and that node passes it along to the next node until it reaches the intended recipient.
          </p>
          <TopologyCanvas nodes={ringTopology.nodes} edges={ringTopology.edges} />
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color='gray'
            className='text-stone-600 border-stone-400 shadow-md
                      transform hover:scale-105 active:scale-100 transition duration-300'
            onClick={() => setOpenModalRing(false)}> Close </Button>
        </Modal.Footer>
      </Modal>

      <Modal className='font-montserrat' show={openModalStar} onClose={() => setOpenModalStar(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'> Star Topology </Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'> In a Star Topology, the central node acts like a server and the connecting nodes act like clients. 
            When the central node receives a packet from a connecting node, it can pass the packet on to other nodes in the network.  
          </p>
          <TopologyCanvas nodes={starTopology.nodes} edges={starTopology.edges} />
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color='gray'
            className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'
            onClick={() => setOpenModalStar(false)}> Close </Button>
        </Modal.Footer>
      </Modal>

      <Modal className='font-montserrat' show={openModalMesh} onClose={() => setOpenModalMesh(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'> Mesh Topology </Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'> In a Mesh Topology, all the devices are connected with all other devices. 
            A Mesh is a network where every node will have an n-1 number of connections if there are n number of nodes available in the network.
          </p>
          <TopologyCanvas nodes={meshTopology.nodes} edges={meshTopology.edges} />
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color='gray'
            className='text-stone-600 border-stone-400 shadow-md
                      transform hover:scale-105 active:scale-100 transition duration-300'
            onClick={() => setOpenModalMesh(false)}> Close </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default page