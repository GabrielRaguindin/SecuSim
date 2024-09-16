"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";

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

      <ScenarioModal
        title="Scenario 4"
        scenarioDesc="Secure Data Transfer in a Hybrid Network"
        description="Build a hybrid topology (combination of ring and star) with 12 devices to secure data transfer between specific devices."
        objOne="Create a hybrid topology with 6 PCs in a ring formation and 3 routers, 3 hubs connected in a star formation. 
        The ring and star networks should be connected via one router."
        objTwo="Enable SSH access for the ring network to allow secure remote connections between the PCs. 
        Disable admin privileges for all devices except one central router."
        objThree="Block ping requests to secure the network from potential ICMP-based attacks. Allow only trusted IPs to transfer data."
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}