'use client';

// Imported Modules
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { saveTopology, getTopology, deleteTopology, getSavedTopologies } from '@/pages/api/saveTopology';

// Imported UI Components
import { Card, Button, Alert, Modal, TextInput, Dropdown, Tooltip } from 'flowbite-react';

// Imported Icons
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoArrowUndo } from "react-icons/io5";
import { FaTrash } from 'react-icons/fa6';
import { FaLink, FaSave } from 'react-icons/fa';

const TopologyBuilder = () => {

    // Refs
    const networkRef = useRef(null);
    const network = useRef(null);
    const nodes = useRef(new DataSet([]));
    const edges = useRef(new DataSet([]));

    // States
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [showOverwriteModal, setShowOverwriteModal] = useState(false);
    const [topologyName, setTopologyName] = useState('');
    const [savedTopologies, setSavedTopologies] = useState([]);

    const resetSelection = () => {
        setSelectedNodes([]);
    };

    // Use Effects
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

    useEffect(() => {
        setSavedTopologies(getSavedTopologies());
    }, []);

    // Handles
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
                    Modem: './modem.png',
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

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === ' ') {
                handleConnectNodes();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleConnectNodes]);

    const handleSaveTopology = () => {
        if (topologyName) {
            const existingTopologies = getSavedTopologies();
            if (existingTopologies.includes(topologyName)) {
                setShowAlert({ show: true, message: 'Topology with the same name already exists. Please choose a different name.', type: 'warning' });
                setShowOverwriteModal(true);
            } else {
                saveTopology(topologyName, nodes.current.get(), edges.current.get());
                setSavedTopologies(getSavedTopologies());
                setShowAlert({ show: true, message: 'Topology saved successfully!', type: 'success' });
                setSaveModal(false);
            }
        } else {
            setShowAlert({ show: true, message: 'Please provide a name to save the topology', type: 'warning' });
        }
    };

    const confirmOverwrite = () => {
        saveTopology(topologyName, nodes.current.get(), edges.current.get());
        setSavedTopologies(getSavedTopologies());
        setShowAlert({ show: true, message: 'Topology overwritten successfully!', type: 'success' });
        setShowOverwriteModal(false);
        setSaveModal(false);
    }

    const handleLoadTopology = (name) => {
        const savedTopology = getTopology(name);
        if (savedTopology) {
            nodes.current.clear();
            edges.current.clear();
            nodes.current.add(savedTopology.nodes);
            edges.current.add(savedTopology.edges);
        }
    };

    const handleDeleteTopology = (name) => {
        deleteTopology(name);
        setSavedTopologies(getSavedTopologies());
    }

    return (
        <div className="p-4 font-montserrat">

            {/* Node types */}
            <div className="flex items-center mb-4">
                <div className="flex space-x-4">
                    <Tooltip content="Router" style='light' placement='bottom' animation='duration-500'>
                        <Card
                            className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Router')}>
                            <Image
                                src="/router.png"
                                alt="Router"
                                width={80}
                                height={80}
                            />
                        </Card>
                    </Tooltip>

                    <Tooltip content="Hub" style='light' placement='bottom' animation='duration-500'>
                        <Card
                            className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Hub')}>
                            <Image
                                src="/hub.png"
                                alt="Hub"
                                width={80}
                                height={80}
                            />
                        </Card>
                    </Tooltip>

                    <Tooltip content="PC" style='light' placement='bottom' animation='duration-500'>
                        <Card
                            className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'PC')}>
                            <Image
                                src="/pc.png"
                                alt="PC"
                                width={80}
                                height={80}
                            />
                        </Card>
                    </Tooltip>

                    <Tooltip content="Modem" style='light' placement='bottom' animation='duration-500'>
                        <Card
                            className="w-20 h-20 flex items-center text-stone-600 transform hover:scale-105 transition duration-300"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Modem')}>
                            <Image
                                src="/modem.png"
                                alt="Modem"
                                width={80}
                                height={80}
                            />
                        </Card>
                    </Tooltip>
                </div>

                {/* Alert */}
                <div className="ml-auto">
                    {showAlert.show && (
                        <Alert color={showAlert.type} className="mb-4">
                            {showAlert.message}
                        </Alert>
                    )}
                </div>
            </div>

            <div ref={networkRef} className="relative border-2 border-dashed border-gray-300 rounded-lg h-96"></div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mt-3">
                <div className="text-gray-600 flex justify-between gap-3">
                    <div className='p-2 font-semibold'>
                        {selectedNodes.length} node{selectedNodes.length !== 1 ? 's' : ''} selected
                    </div>
                    <Button onClick={resetSelection} color="gray"
                        className='text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                        <IoArrowUndo />
                    </Button>
                    <Dropdown label="Saved Topologies" className="mt-2" gradientMonochrome="teal">
                        {savedTopologies.map((name) => (
                            <Dropdown.Item key={name} className='font-bold'>
                                {name}
                                <div className="flex space-x-2 ml-5">
                                    <Button gradientMonochrome="teal" onClick={() => handleLoadTopology(name)} size="xs">
                                        Load
                                    </Button>
                                    <Button gradientMonochrome="failure" onClick={() => handleDeleteTopology(name)} size="xs" color="failure">
                                        Delete
                                    </Button>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>

                <div className="flex space-x-3">
                    <Tooltip content='Link Nodes' style='light' placement='top' animation='duration-500'>
                        <Button onClick={handleConnectNodes} gradientMonochrome="teal"
                            className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                            <FaLink className='text-xl' />
                        </Button>
                    </Tooltip>

                    <Tooltip content='Delete Nodes' style='light' placement='top' animation='duration-500'>
                        <Button onClick={handleDeleteNodes} gradientMonochrome="failure"
                            className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                            <FaTrash className='text-xl' />
                        </Button>
                    </Tooltip>

                    <Tooltip content='Save' style='light' placement='top' animation='duration-500'>
                        <Button onClick={() => setSaveModal(true)} gradientMonochrome="success"
                            className="text-stone-200 border-stone-400 shadow-md
                            transform hover:scale-105 active:scale-100 transition duration-300">
                            <FaSave className='text-xl' />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            {/* Delete Node Modal*/}
            <Modal className='font-montserrat' size='md' show={showModal} onClose={() => setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body className='text-stone-600'>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 text-red-500' />
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

            {/* Topology Save Modal */}
            <Modal className='font-montserrat' size='md' show={saveModal} onClose={() => setSaveModal(false)} popup>
                <Modal.Header className='bg-gradient-to-r from-green-400 from-10% to-green-700 to-90%'> Save Topology </Modal.Header>
                <Modal.Body className='text-stone-600'>
                    <div className='text-center mt-5'>
                        <TextInput
                            type="text"
                            placeholder="Enter Topology Name"
                            value={topologyName}
                            onChange={(e) => setTopologyName(e.target.value)}
                            className="rounded text-stone-600" />
                    </div>
                    <div className="flex justify-center gap-4 mt-5">
                        <Button onClick={handleSaveTopology} gradientMonochrome='success'
                            className='text-stone-100 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                            Yes, Save
                        </Button>
                        <Button onClick={() => setSaveModal(false)} color="gray"
                            className='text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Topology Overwrite Modal */}
            <Modal className='font-montserrat' size='md' show={showOverwriteModal} onClose={() => setShowOverwriteModal(false)} popup>
                <Modal.Header />
                <Modal.Body className='text-stone-600'>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 text-red-500' />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Topology already exists. Do you wish to overwrite it?
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button onClick={confirmOverwrite} gradientMonochrome='failure'
                            className='text-stone-100 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                            Yes, Overwrite
                        </Button>
                        <Button onClick={() => setShowOverwriteModal(false)} color="gray"
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

export default TopologyBuilder;
