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
                description="Simulate a scenario where the network has to prioritize streaming over gaming."
                onButtonClick={handleButtonClick}
            />
        </>
    )
}