"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import ScenarioModal from "@/components/Scenarios/ScenarioModal";
import ScenarioOne from "@/components/Scenarios/Environment/ScenarioOne";

export default function One() {

  const [openScenarioModal, setOpenScenarioModal] = useState(true);

  return (
    <>
      <div className="flex justify-end p-5">
        <Button
          gradientMonochrome="teal"
          className="shadow-md transform hover:scale-105 active:scale-100 transition duration-300"
          onClick={() => setOpenScenarioModal(true)}> Open Scenario Details </Button>
      </div>

      <ScenarioOne />

      <ScenarioModal
        title="Scenario 1"
        scenarioTitle="File Sharing in a secure Ring Network"
        scenarioDesc="A local company needs a network administrator to configurate a ring network for a secure file sharing in an alloted time."
        description="Build a ring topology with 10 PCs and 2 routers where only certain PCs can transfer files securely."
        objOne="Create a ring topology with 10 PCs and 2 routers. Ensure that each PC is connected to at least one router."
        objTwo="Enable file transfer access only for 5 specific PCs. The remaining PCs should not have file transfer access."
        objThree="Block untrusted IPs to prevent unauthorized access to the file-sharing PCs. Allow web traffic for all devices."
        objFour="You have to complete the requirements of the scenario under 5 minutes (300 seconds)"
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}