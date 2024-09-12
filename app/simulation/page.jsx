import FirstScenario from "@/components/Scenarios/Cards/FirstScenario"
import SecondScenario from "@/components/Scenarios/Cards/SecondScenario"
import ThirdScenario from "@/components/Scenarios/Cards/ThirdScenario"
import FourthScenario from "@/components/Scenarios/Cards/FourthScenario"

export default function SimulationEnvironment() {
  return (
    <div className="font-montserrat">
      <div className="text-center text-2xl font-bold text-stone-600 py-5"> Simulation Scenarios </div>
      <div className="flex justify-evenly mb-7">
        <FirstScenario />
        <SecondScenario />
      </div>
      <div className="flex justify-evenly">
        <ThirdScenario />
        <FourthScenario />
      </div>
    </div>
  )
}
