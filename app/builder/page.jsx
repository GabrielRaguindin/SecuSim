import TopologyBuilder from '@/components/TopologyBuilder';

export const metadata = {
  title: 'Builder',
  description: 'SECUSIM BUILDER',
}

export default function TopolgyCanvas() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-600 text-center py-4 font-montserrat">
        Topology Sandbox </h1>
      <TopologyBuilder />
    </div>
  )
}
