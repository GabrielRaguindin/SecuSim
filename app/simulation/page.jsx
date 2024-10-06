import FirstScenario from "@/components/Scenarios/Cards/FirstScenario"
import SecondScenario from "@/components/Scenarios/Cards/SecondScenario"
import ThirdScenario from "@/components/Scenarios/Cards/ThirdScenario"
import AccordionComponent from "@/components/AccordionComponent"

export const metadata = {
  title: 'Scenarios',
  description: 'SECUSIM SIMULATOR',
}

export default function SimulationEnvironment() {
  return (
    <div className="font-montserrat">
      <div className="text-center text-2xl font-bold text-stone-600 py-5"> Simulation Environment </div>
      <div className="p-3">
        <h1 className="text-xl font-bold text-stone-600 mb-3"> Environment Overview </h1>
        <AccordionComponent />
      </div>
      <div className="flex justify-evenly gap-3 p-3">
        <FirstScenario />
        <SecondScenario />
        <ThirdScenario />
      </div>
    </div>
  )
}
