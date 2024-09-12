"use client";

import { useRouter } from "next/navigation";
import ScenarioCard from "../../ScenarioCard";
import { PiShieldWarning } from "react-icons/pi";

export default function SecondScenario() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/scenario/two');
    }
    return (
        <>
            <ScenarioCard
                icon={PiShieldWarning}
                title="Scenario 2"
                description="Simulate a scenario where a specific network has experiencing a network breach."
                onButtonClick={handleButtonClick}
            />
        </>
    )
}