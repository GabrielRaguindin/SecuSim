"use client";

import { useState } from "react";
import TopologyCard from "../TopologyCard";
import { TbTopologyRing } from "react-icons/tb";
import TopologyModal from "./TopologyModal/TopologyModal";
import TopologyCanvas from "./Canvas/TopologyCanvas";

export default function RingTopology() {
    const [openModalRing, setOpenModalRing] = useState(false);

    const ringTopology = {
        nodes: [
            { id: 1, label: "Node 1" },
            { id: 2, label: "Node 2" },
            { id: 3, label: "Node 3" },
            { id: 4, label: "Node 4" },
            { id: 5, label: "Node 5" },
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
            { from: 5, to: 1 },
        ],
    };

    return (
        <>
            <TopologyCard
                icon={TbTopologyRing}
                title="Ring Topology"
                description="Ring topology is a type of network configuration
            where devices are connected in a circular manner, forming a closed loop."
                onViewDetailsClick={() => setOpenModalRing(true)}
            />

            <TopologyModal
                title="Ring Topology"
                description="In a Ring Topology, data is transmitted from one node to the next in a sequential manner. 
                When you send data from one node, it travels to the next node in the ring, 
                and that node passes it along to the next node until it reaches the intended recipient."
                visualRep={<TopologyCanvas nodes={ringTopology.nodes} edges={ringTopology.edges} />}
                openModal={openModalRing}
                setOpenModal={setOpenModalRing}
            />
        </>
    )
}