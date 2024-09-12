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
        title="Given Scenario"
        description="Scenario 3 description: To be added..."
        openModal={openScenarioModal}
        setOpenModal={setOpenScenarioModal}
      />

    </>
  )
}