"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";
import ScenarioThree from "@/components/Scenarios/Environment/ScenarioThree";

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

      <ScenarioThree />

      <ScenarioModal
        title="Scenario 3"
        scenarioTitle="VoIP Communication in a Mesh Network"
        scenarioDesc="AppleSociety.inc hired you to administer a mesh network for VoIP communication, the company expects it to get finished in a certain amount of time,"
        description="Build a mesh topology with 10 devices supporting smooth VoIP communication between all devices."
        objOne="Build a mesh network with 10 devices, consisting of 5 PCs, 4 hubs, and 1 router. Ensure each device can connect to all other devices."
        objTwo="Enable VoIP communication for all devices and limit peer-to-peer (P2P) traffic to prevent bandwidth congestion."
        objThree="Enable remote desktop access for the router and hubs only to allow network administrators to monitor the devices remotely."
        objFour="You have to complete the requirements of the scenario under 7 minutes (420 seconds)"
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}