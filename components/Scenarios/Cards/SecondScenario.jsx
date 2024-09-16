"use client";

import { useRouter } from "next/navigation";
import ScenarioCard from "../../ScenarioCard";
import { PiShieldWarning } from "react-icons/pi";

export default function SecondScenario() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/simulation/scenario/two');
    }
    
    return (
        <>
            <ScenarioCard
                icon={PiShieldWarning}
                title="Scenario 2"
                description="Optimized Video Streaming in a Star Network"
                onButtonClick={handleButtonClick}
            />
        </>
    )
}