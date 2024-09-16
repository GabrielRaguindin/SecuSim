"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";

export default function Three() {
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
        title="Scenario 3"
        scenarioDesc="VoIP Communication in a Mesh Network"
        description="Build a mesh topology with 20 devices supporting smooth VoIP communication between all devices."
        objOne="Build a mesh network with 20 devices, consisting of PCs, hubs, and routers. Ensure each device can connect to at least two other devices."
        objTwo="Enable VoIP communication for all devices and limit peer-to-peer (P2P) traffic to prevent bandwidth congestion."
        objThree="Enable remote desktop access for the routers and hubs only to allow network administrators to monitor the devices remotely."
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}