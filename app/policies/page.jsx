import AccessControl from '@/components/Policies/AccessControl';
import QualityOfService from '@/components/Policies/QualityOfService';
import FirewallPolicy from '@/components/Policies/Firewall';

export default function Policies() {
  return (
    <div className='font-montserrat'>
      <div className='text-center text-2xl font-bold text-stone-600 py-5'> Policy Templates (Staging!) </div>
      <div className='flex flex-col justify-center p-5 gap-5'>
        {/* Access Control */}
        <AccessControl />
        {/* Quality of Service */}
        <QualityOfService />
        {/* Firewall */}
        <FirewallPolicy />
      </div>
    </div >
  )
}