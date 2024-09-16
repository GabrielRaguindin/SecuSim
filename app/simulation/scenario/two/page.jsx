"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";

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

      <ScenarioModal
        title="Scenario 2"
        scenarioDesc="Optimized Video Streaming in a Star Network"
        description="Build a star topology with 15 devices (including PCs, routers, and hubs) optimized for video streaming."
        objOne="Create a star topology with 10 PCs, 2 hubs, and 3 routers. The routers must be at the center, connecting to the hubs and PCs."
        objTwo="Prioritize streaming for all PCs to ensure smooth video streaming. Throttle bulk data on 5 specific PCs to ensure bandwidth for streaming."
        objThree="Allow web traffic but restrict outbound traffic to prevent network overload."
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}