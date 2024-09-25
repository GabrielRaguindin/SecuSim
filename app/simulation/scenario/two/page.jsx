"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";
import ScenarioTwo from "@/components/Scenarios/Environment/ScenarioTwo";

export default function Two() {
  const [openScenarioModal, setOpenScenarioModal] = useState(true);

  return (
    <>
      <div className="flex justify-end p-5">
        <Button
          gradientMonochrome="teal"
          className="shadow-md transform hover:scale-105 active:scale-100 transition duration-300"
          onClick={() => setOpenScenarioModal(true)}> Open Scenario Details </Button>
      </div>

      <ScenarioTwo />

      <ScenarioModal
        title="Scenario 2"
        scenarioTitle="Optimized Video Streaming in a Star Network"
        scenarioDesc="Professor X wants to optimize his video streaming in a star network, so he asked an IT Professional to deal with the problem."
        description="Build a star topology with 9 devices (including PCs, routers, and hubs) optimized for video streaming."
        objOne="Create a star topology with 6 PCs, 2 hubs, and 1 router. The router must be at the center, connecting to the hubs and PCs."
        objTwo="Prioritize streaming for all PCs to ensure smooth video streaming. Throttle bulk data on 3 specific PCs to ensure bandwidth for streaming."
        objThree="Allow web traffic and restrict outbound traffic to prevent network overload."
        objFour="You have to complete the requirements of the scenario under 4 minutes (240 seconds)"
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}