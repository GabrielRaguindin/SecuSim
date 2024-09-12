import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

export default function TopologyCanvas ({ nodes, edges }) {
    const networkContainerRef = useRef(null);

    useEffect(() => {
        // Transform nodes to use images
        const transformedNodes = nodes.map(node => {
            if (node.label === "Center Node") {
                return { ...node, shape: 'image', image: '/router.png' }; // Path to the router image
            } else {
                return { ...node, shape: 'image', image: '/pc.png' }; // Path to the PC image for all other nodes
            }
        });

        const networkData = {
            nodes: new DataSet(transformedNodes),
            edges: new DataSet(edges),
        };

        const options = {
            physics: true,
            autoResize: true,
            height: '100%',
            width: '100%',
            interaction: {
                zoomView: true,
                dragView: true,
            },
            // Additional customization options can go here
        };

        const network = new Network(networkContainerRef.current, networkData, options);

        return () => network.destroy(); // Cleanup on component unmount
    }, [nodes, edges]);

    return (
        <div
            ref={networkContainerRef}
            style={{ height: '300px', border: '1px solid #ccc' }}
        />
    );
};
