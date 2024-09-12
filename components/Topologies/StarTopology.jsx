"use client";

import { useState } from "react";
import TopologyCard from "../TopologyCard";
import { TbTopologyStar } from "react-icons/tb";
import TopologyModal from "./TopologyModal/TopologyModal";
import TopologyCanvas from "./Canvas/TopologyCanvas";

export default function StarTopology() {
    const [openModalStar, setOpenModalStar] = useState(false);

    const starTopology = {
        nodes: [
            { id: 1, label: "Center Node" },
            { id: 2, label: "Node 2" },
            { id: 3, label: "Node 3" },
            { id: 4, label: "Node 4" },
            { id: 5, label: "Node 5" },
            { id: 6, label: "Node 6" },
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 },
            { from: 1, to: 6 },
        ],
    };

    return (
        <>
            <TopologyCard
                icon={TbTopologyStar}
                title="Star Topology"
                description="Star topology is a type of network configuration
            in which each network component is physically connected to a central node."
                onViewDetailsClick={() => setOpenModalStar(true)}
            />

            <TopologyModal
                title="Star Topology"
                description="In a Star Topology, the central node acts like a server and the connecting nodes act like clients. 
                When the central node receives a packet from a connecting node, it can pass the packet on to other nodes in the network."
                visualRep={<TopologyCanvas nodes={starTopology.nodes} edges={starTopology.edges} />}
                openModal={openModalStar}
                setOpenModal={setOpenModalStar}
            />
        </>
    )
}
