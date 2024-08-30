'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Card, Button, Alert, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoArrowUndo } from "react-icons/io5";
import { FaTrash } from 'react-icons/fa6';
import { FaLink } from 'react-icons/fa';

const TopologyCanvas = () => {
    const networkRef = useRef(null);
    const network = useRef(null);
    const nodes = useRef(new DataSet([]));
    const edges = useRef(new DataSet([]));
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });
    const [showModal, setShowModal] = useState(false);

    const resetSelection = () => {
        setSelectedNodes([]);
    };

    useEffect(() => {
        const container = networkRef.current;
        const data = {
            nodes: nodes.current,
            edges: edges.current,
        };
        const options = {
            physics: false,
            interaction: {
                hover: true,
                multiselect: true,
            },
            manipulation: {
                enabled: false,
            },
        };
        network.current = new Network(container, data, options);

        network.current.on('selectNode', (params) => {
            setSelectedNodes((prev) => {
                const uniqueNodes = new Set([...prev, ...params.nodes]);
                return Array.from(uniqueNodes);
            });
        });

        network.current.on('deselectNode', (params) => {
            setSelectedNodes((prev) => prev.filter((id) => !params.nodes.includes(id)));
        });

        container.addEventListener('dragover', (event) => event.preventDefault());
        container.addEventListener('drop', (event) => handleDrop(event));

        return () => {
            network.current.destroy();
        };
    }, []);

    useEffect(() => {
        let timeout;
        if (showAlert.show) {
            timeout = setTimeout(() => {
                setShowAlert({ show: false, message: '', type: '' });
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showAlert]);

    const handleDragStart = (event, deviceType) => {
        event.dataTransfer.setData('deviceType', deviceType);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const boundingRect = networkRef.current.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;

        const deviceType = event.dataTransfer.getData('deviceType');

        if (deviceType) {
            const existingNode = [...nodes.current.get()].find(
                (node) => node.label === deviceType && node.x === x && node.y === y
            );
            if (!existingNode) {
                const images = {
                    Router: './router.png',
                    Hub: './hub.png',
                    PC: './pc.png',
                };
                const newNode = {
                    id: Math.random().toString(),
                    label: deviceType, x, y,
                    shape: 'image',
                    image: images[deviceType] || '',
                };

                nodes.current.add(newNode);

                network.current.moveTo({
                    position: { x, y },
                    animation: false,
                });
            }
        }
    };

    const handleDeleteNodes = () => {
        setShowModal(true);
    };

    const confirmDeleteNodes = () => {
        if (selectedNodes.length > 0) {
            nodes.current.remove(selectedNodes);
            edges.current.remove(edges.current.get().filter(edge => selectedNodes.includes(edge.from) || selectedNodes.includes(edge.to)));
            setSelectedNodes([]);
            setShowAlert({ show: true, message: 'Selected node(s) deleted successfully!', type: 'failure' });
        } else {
            setShowAlert({ show: true, message: 'No node selected for deletion', type: 'warning' });
        }
        setShowModal(false);
    };

    const handleConnectNodes = () => {
        if (selectedNodes.length === 2) {
            const [from, to] = selectedNodes;
            const newEdge = {
                id: `${from}-${to}`,
                from: from,
                to: to,
            };
            edges.current.add(newEdge);
            setSelectedNodes([]);
        } else {
            setShowAlert({ show: true, message: 'Please select exactly two nodes to connect', type: 'warning' });
        }
    };

    return (
        <div className="p-4 font-montserrat">
            <div className="flex items-center mb-4">
                <div className="flex space-x-4">
                    <Card
                        className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Router')}>
                        <img src="./router.png" alt="Router" />
                    </Card>
                    <Card
                        className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Hub')}>
                        <img src="./hub.png" alt="Hub" />
                    </Card>
                    <Card
                        className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'PC')}>
                        <img src="./pc.png" alt="PC" />
                    </Card>
                </div>
                <div className="ml-auto">
                    {showAlert.show && (
                        <Alert color={showAlert.type} className="mb-4">
                            {showAlert.message}
                        </Alert>
                    )}
                </div>
            </div>

            <div ref={networkRef} className="relative border-2 border-dashed border-gray-300 rounded-lg h-96"></div>

            <div className="flex justify-between items-center mt-3">
                <div className="text-gray-600 flex justify-between gap-3">
                    <div className='p-2 font-semibold'>
                    {selectedNodes.length} node{selectedNodes.length !== 1 ? 's' : ''} selected
                    </div>
                    <Button onClick={resetSelection} color="gray"
                        className='text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                        <IoArrowUndo className='text-xl'/>
                    </Button>
                </div>
                <div className="flex space-x-3">
                    <Button onClick={handleConnectNodes} gradientMonochrome="teal" 
                            className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                        <FaLink className='text-xl'/>
                    </Button>
                    <Button onClick={handleDeleteNodes} gradientMonochrome="failure" 
                            className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                        <FaTrash className='text-xl'/>
                    </Button>
                </div>
            </div>
            
            <Modal className='font-montserrat' size='md' show={showModal} onClose={() => setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body className='text-stone-600'>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400' />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete the selected node(s)?
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button onClick={confirmDeleteNodes} gradientMonochrome='failure'
                            className='text-stone-100 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                            Yes, Delete
                        </Button>
                        <Button onClick={() => setShowModal(false)} color="gray"
                            className='text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TopologyCanvas;
