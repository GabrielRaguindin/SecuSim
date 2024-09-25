"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";
import ScenarioFour from "@/components/Scenarios/Environment/ScenarioFour";

export default function Four() {
  const [openScenarioModal, setOpenScenarioModal] = useState(true);

  return (
    <>
      <div className="flex justify-end p-5">
        <Button
          gradientMonochrome="teal"
          className="shadow-md transform hover:scale-105 active:scale-100 transition duration-300"
          onClick={() => setOpenScenarioModal(true)}> Open Scenario Details </Button>
      </div>

      <ScenarioFour />

      <ScenarioModal
        title="Scenario 4"
        scenarioTitle="Secure Data Transfer in a Hybrid Network"
        scenarioDesc="An IT Department is planning to create a network laboratory, the president asks for a hybrid network with applied policies for a secure data transfer"
        description="Build a hybrid topology (combination of ring and star) with 13 devices (10 PCs, 2 Hubs, and 1 Router) to secure data transfer between specific devices."
        objOne="Create a hybrid topology with 5 PCs in a ring formation, 5 PCs in a star formation, each topology must have at least 1 hub connected to a universal router"
        objTwo="Enable SSH access for all the PCs to allow secure remote connections between them. Disable admin privileges for all devices except one central router."
        objThree="Block ping requests to all PCs to secure the network from potential ICMP-based attacks. Allow only trusted IPs to the hubs to transfer data."
        objFour="You have to complete the requirements of the scenario under 10 minutes (600 seconds)"
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}