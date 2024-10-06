import AccessControl from '@/components/Policies/AccessControl';
import QualityOfService from '@/components/Policies/QualityOfService';
import FirewallPolicy from '@/components/Policies/Firewall';
import Encryption from '@/components/Policies/Encryption';

export const metadata = {
  title: 'Policies',
  description: 'SECUSIM Policies',
}

export default function Policies() {
  return (
    <div className='font-montserrat'>
      <div className='text-center text-2xl font-bold text-stone-600 py-5'> Learn about Policies </div>
      <div className="flex justify-evenly gap-3 p-3">
        <AccessControl />
        <QualityOfService />
      </div>
      <div className="flex justify-evenly gap-3 p-3">
        <FirewallPolicy />
        <Encryption />
      </div>
    </div >
  )
}