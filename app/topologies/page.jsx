import RingTopology from "@/components/Topologies/RingTopology";
import StarTopology from "@/components/Topologies/StarTopology";
import MeshTopology from "@/components/Topologies/MeshTopology";

export const metadata = {
  title: 'TOPOLOGY',
  description: 'SECUSIM TOPOLOGIES',
}

export default function Topologies() {
  return (
    <div className='font-montserrat'>
      <div className='text-center text-2xl font-bold text-stone-600 py-5'> Learn about Topologies </div>
      <div className='flex flex-col justify-center p-5 gap-5'>
        {/* Ring Topolog */}
        <RingTopology />
        {/* Star Topology */}
        <StarTopology />
        {/* Mesh Topology */}
        <MeshTopology />
      </div>
    </div >
  )
}