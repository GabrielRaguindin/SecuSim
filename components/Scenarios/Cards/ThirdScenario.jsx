"use client";

import { useRouter } from 'next/navigation'
import ScenarioCard from "../../ScenarioCard";
import { PiCloudWarning } from 'react-icons/pi';

export default function ThirdScenario() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/simulation/scenario/three');
    }

    return (
        <>
            <ScenarioCard 
                icon={PiCloudWarning}
                title="Scenario 3"
                description="VoIP Communication in a Mesh Network"
                onButtonClick={handleButtonClick}
            />
        </>
    )
}