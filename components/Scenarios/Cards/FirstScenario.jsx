"use client";

import { useRouter } from "next/navigation";
import ScenarioCard from "../../ScenarioCard";
import { LuFileWarning } from "react-icons/lu";

export default function FirstScenario() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/simulation/scenario/one');
    }
    
    return (
        <>
            <ScenarioCard
                icon={LuFileWarning}
                title="Scenario 1"
                description="Simulate a scenario where a specific network has a problem with file sharing."
                onButtonClick={handleButtonClick}
            />
        </>
    )
}