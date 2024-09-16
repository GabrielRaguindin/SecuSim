"use client";

import { useRouter } from 'next/navigation'
import ScenarioCard from "../../ScenarioCard";
import { PiSealWarning } from 'react-icons/pi';

export default function FourthScenario() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/simulation/scenario/four');
    }

    return (
        <>
            <ScenarioCard 
                icon={PiSealWarning}
                title="Scenario 4"
                description="Secure Data Transfer in a Hybrid Network"
                onButtonClick={handleButtonClick}
            />
        </>    
    )
}