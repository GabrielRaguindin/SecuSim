import RingTopology from "@/components/Topologies/RingTopology";
import StarTopology from "@/components/Topologies/StarTopology";
import MeshTopology from "@/components/Topologies/MeshTopology";

export default function Topologies() {
  return (
    <div className='font-montserrat'>
      <div className='text-center text-2xl font-bold text-stone-600 py-5'> Topology Templates </div>
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