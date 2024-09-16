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
                description="File Sharing in a Secure Ring Network"
                onButtonClick={handleButtonClick}
            />
        </>
    )
}