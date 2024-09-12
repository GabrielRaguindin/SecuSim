"use client";

import { useState } from "react";
import TopologyCard from "../TopologyCard";
import { TbTopologyFull } from "react-icons/tb";
import TopologyModal from "./TopologyModal/TopologyModal";
import TopologyCanvas from "./Canvas/TopologyCanvas";

export default function MeshTopology() {
    const [openModalMesh, setOpenModalMesh] = useState(false);

    const meshTopology = {
        nodes: [
            { id: 1, label: "Node 1" },
            { id: 2, label: "Node 2" },
            { id: 3, label: "Node 3" },
            { id: 4, label: "Node 4" },
            { id: 5, label: "Node 5" },
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 },
            { from: 2, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 4 },
            { from: 3, to: 5 },
            { from: 4, to: 5 },
        ],
    };

    return (
        <>
            <TopologyCard
                icon={TbTopologyFull}
                title="Mesh Topology"
                description="Mesh topology is a type of network configuration
                where each computer and network device is interconnected with one another."
                onViewDetailsClick={() => setOpenModalMesh(true)}
            />

            <TopologyModal
                title="Mesh Topology"
                description="In a Mesh Topology, all the devices are connected with all other devices. 
                A Mesh is a network where every node will have an n-1 number of connections if there are n number of nodes available in the network."
                visualRep={<TopologyCanvas nodes={meshTopology.nodes} edges={meshTopology.edges} />}
                openModal={openModalMesh}
                setOpenModal={setOpenModalMesh}
            />
        </>
    )
}