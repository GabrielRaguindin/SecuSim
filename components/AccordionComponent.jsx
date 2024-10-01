"use client"
import { Accordion } from "flowbite-react";

export default function AccordionComponent() {

    return (
        <>
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>What is the Simulation Environment?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            The Simulation Environment is SecuSim&apos;s interactive Network Simulator feature for users who are interested
                            to learn the fundamentals of Networking. It is not overwhelming, not complicated, and... It is free.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>How does it work?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            You have to complete a series of network related tasks that the given scenario requires under an alloted time. 
                            You will be asked to select devices, build a Network Topology, and configure Network Policies.
                        </p>
                        <p className="mb-2 text-gray-500">
                            After the simulation is finished, you may choose to save your result logs and have an option to download them.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Is it safe?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Of course! SecuSim is a generic, open for all, free-to-use Network Simulator, whatever you do here doesn&apos;t affect 
                            real networks and doesn&apos;t collect any of your sensitive data.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </>
    )
}