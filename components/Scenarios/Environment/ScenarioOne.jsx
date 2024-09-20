"use client"

// Imported Modules
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

// Imported Icons
import { IoArrowUndo } from "react-icons/io5";
import { FaTrash } from 'react-icons/fa6';
import { FaLink } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

// Imported UI Components
import { Card, Button, Checkbox, Dropdown, Label, Tooltip, Modal, TextInput, Alert, Progress } from 'flowbite-react'

export default function ScenarioOne() {

    // Network Variables
    const networkRef = useRef(null);
    const network = useRef(null);
    const nodes = useRef(new DataSet([]));
    const edges = useRef(new DataSet([]));

    // State Variables (Selections)
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedNodes, setSelectedNodes] = useState([]);

    // State Variables (Modals & Alerts)
    const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const [showIpModal, setShowIpModal] = useState(false);
    const [showSimulationModal, setShowSimulationModal] = useState(false);

    // State Variables (Simulation Messages)
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);

    // State Variables (Simulation Settings)
    const [editingNode, setEditingNode] = useState(null);
    const [fakeIpAddress, setFakeIpAddress] = useState('');
    const [deviceIPs, setDeviceIPs] = useState({});
    const [devicePolicies, setDevicePolicies] = useState({});
    const [isSimulationRunning, setIsSimulationRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timer, setTimer] = useState(60); // Initial timer set to 60 seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Use Effect for Network
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
            const node = nodes.current.get(params.nodes[0]);
            setSelectedDevice(node.ip || '');
            setSelectedNodes((prev) => {
                const uniqueNodes = new Set([...prev, ...params.nodes]);
                return Array.from(uniqueNodes);
            });
        });

        network.current.on('deselectNode', (params) => {
            setSelectedNodes((prev) => prev.filter((id) => !params.nodes.includes(id)));
            if (selectedNodes.length === 0) {
                setSelectedDevice(null);
            }
        });

        network.current.on('doubleClick', (params) => {
            if (params.nodes.length === 1) {
                const nodeId = params.nodes[0];
                const node = nodes.current.get(nodeId);
                setEditingNode(node);
                setFakeIpAddress(node.ip || '');
                setShowIpModal(true);
            }
        });

        container.addEventListener('dragover', (event) => event.preventDefault());
        container.addEventListener('drop', (event) => handleDrop(event));

        return () => {
            network.current.destroy();
        };
    }, []);

    // Use Effect for Alerts
    useEffect(() => {
        let timeout;
        if (showAlert.show) {
            timeout = setTimeout(() => {
                setShowAlert({ show: false, message: '', type: '' });
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showAlert]);

    // Use Effect for Device IPs
    useEffect(() => {
        const nodesData = nodes.current.get();
        const ips = {};
        nodesData.forEach(node => {
            if (node.ip) {
                ips[node.id] = node.ip;
            }
        });
        setDeviceIPs(ips);
    }, []);

    // Use Effect for Device Selection
    useEffect(() => {
        network.current.on('selectedNode', (params) => {
            if (params.nodes.length === 1) {
                setSelectedDevice(params.nodes[0]);
            } else {
                setSelectedDevice(null);
            }
        })
    })

    // Functions
    const resetSelection = () => {
        setSelectedNodes([]);
    };

    const isValidIP = (ip) => {
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    };

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
                    Router: '/router.png',
                    Hub: '/hub.png',
                    PC: '/pc.png',
                };
                const newNode = {
                    id: Math.random().toString(),
                    label: deviceType, x, y,
                    shape: 'image',
                    image: images[deviceType] || '',
                };

                nodes.current.add(newNode);

                setDeviceIPs(prev => ({
                    ...prev,
                    [newNode.id]: ''
                }));

                setDevicePolicies(prev => ({
                    ...prev,
                    [newNode.id]: {
                        accessControl: [],
                        qos: [],
                        firewall: [],
                    }
                }))

                network.current.moveTo({
                    position: { x, y },
                    animation: false,
                });
            }
        }
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

    const handleDeleteNodes = () => {
        setShowModal(true);
    };

    const confirmDeleteNodes = () => {
        if (selectedNodes.length > 0) {
            nodes.current.remove(selectedNodes);
            edges.current.remove(edges.current.get().filter(edge => selectedNodes.includes(edge.from) || selectedNodes.includes(edge.to)));
            setDeviceIPs(prev => {
                const updatedIPs = { ...prev };
                selectedNodes.forEach(nodeId => {
                    delete updatedIPs[nodeId];
                });
                return updatedIPs;
            });
            setSelectedNodes([]);
            setShowAlert({ show: true, message: 'Selected node(s) deleted successfully!', type: 'failure' });
        } else {
            setShowAlert({ show: true, message: 'No node selected for deletion', type: 'warning' });
        }
        setShowModal(false);
    };

    const isIPUnique = (ip) => {
        return !Object.values(deviceIPs).includes(ip);
    };

    const updateNodeLabel = (nodeId, newIp) => {
        const node = nodes.current.get(nodeId);
        const newLabel = node.label.split('\n')[0] + (newIp ? `\n${newIp}` : '');
        nodes.current.update({ ...node, ip: newIp, label: newLabel });
    };

    const saveFakeIP = () => {
        if (editingNode) {
            if (!isValidIP(fakeIpAddress)) {
                setShowAlert({ show: true, message: 'Invalid IP Address. Please enter a valid format.', type: 'failure' });
                return;
            }
            if (!isIPUnique(fakeIpAddress)) {
                setShowAlert({ show: true, message: 'IP address already in use. Please choose a different IP.', type: 'warning' });
                return;
            }
            updateNodeLabel(editingNode.id, fakeIpAddress);

            setDeviceIPs(prev => {
                const { [editingNode.id]: _, ...rest } = prev;
                return { ...rest, [editingNode.id]: fakeIpAddress };
            });

            setDevicePolicies(prev => {
                const { [editingNode.id]: policies, ...rest } = prev;
                return {
                    ...rest,
                    [fakeIpAddress]: policies || {
                        accessControl: [],
                        qos: [],
                        firewall: [],
                    }
                };
            });

            setEditingNode(null);
            setShowIpModal(false);
            setShowAlert({ show: true, message: 'IP address updated successfully!', type: 'success' });
        }
    };

    const handlePolicyChange = (policyType, policyName) => {
        if (selectedDevice) {
            setDevicePolicies(prev => {

                const currentPolicies = prev[selectedDevice] || {
                    accessControl: [],
                    qos: [],
                    firewall: [],
                };

                return {
                    ...prev,
                    [selectedDevice]: {
                        ...currentPolicies,
                        [policyType]: currentPolicies[policyType].includes(policyName)
                            ? currentPolicies[policyType].filter(policy => policy !== policyName)
                            : [...currentPolicies[policyType], policyName]
                    }
                };
            });
        }
    };

    const handlePolicySave = () => {
        if (selectedDevice) {
            setDevicePolicies(prev => ({
                ...prev,
                [selectedDevice]: {
                    accessControl: devicePolicies[selectedDevice]?.accessControl || [],
                    qos: devicePolicies[selectedDevice]?.qos || [],
                    firewall: devicePolicies[selectedDevice]?.firewall || [],
                }
            }));
            setShowAlert({ show: true, message: 'Policies applied successfully!', type: 'success' });
        } else {
            setShowAlert({ show: true, message: 'No device selected. Please select a device first.', type: 'warning' });
        }
    };

    const validateRingTopology = (nodes, edges) => {
        const adjacencyList = {};
        let pcCount = 0;
        let routerCount = 0;

        nodes.forEach(node => {
            if (node.label.startsWith('PC')) {
                pcCount++;
            } else if (node.label.startsWith('Router')) {
                routerCount++;
            }
        });

        edges.forEach(edge => {
            if (!adjacencyList[edge.from]) {
                adjacencyList[edge.from] = [];
            }
            if (!adjacencyList[edge.to]) {
                adjacencyList[edge.to] = [];
            }
            adjacencyList[edge.from].push(edge.to);
            adjacencyList[edge.to].push(edge.from);
        });

        const isValidTopology = Object.values(adjacencyList).every(connections => connections.length === 2);

        const isValidDeviceCount = pcCount === 10 && routerCount === 2;

        return { isValidTopology, isValidDeviceCount, pcCount, routerCount };
    };

    const validatePolicies = (devicePolicies) => {
        const validDevices = Object.keys(devicePolicies).filter(ip => ip.includes('.'));

        const fileTransferPCs = validDevices.filter(ip =>
            devicePolicies[ip].accessControl.includes('File Transfer Access')).length;

        const untrustedIPsBlocked = validDevices.every(ip =>
            devicePolicies[ip].firewall.includes('Block Untrusted IP'));

        const allDevicesAllowWebTraffic = validDevices.every(ip =>
            devicePolicies[ip].firewall.includes('Allow Web Traffic'));

        return fileTransferPCs === 5 && untrustedIPsBlocked && allDevicesAllowWebTraffic;
    };

    const intervalRef = useRef({
        timer: null,
        progressBar: null
    });

    const handleRunSimulation = () => {
        setIsTimerRunning(true);
        setProgress(0);
        setTimer(3); // Set the initial timer value

        const timerInterval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    setIsTimerRunning(false);
                    setTimeout(startProgressBar, 300); // Start the progress bar after a slight delay
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        intervalRef.current.timer = timerInterval;
    };

    const startProgressBar = () => {
        setIsSimulationRunning(true);
        const progressBarInterval = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress >= 100) {
                    clearInterval(progressBarInterval);
                    setIsSimulationRunning(false);
                    handleSimulationResult(); // Handle simulation results
                    return oldProgress; // Maintain current progress
                } else {
                    return oldProgress + 1;
                }
            });
        }, 100);

        intervalRef.current.progressBar = progressBarInterval;
    };

    // Handle simulation results as before
    const handleSimulationResult = () => {
        const nodesData = nodes.current.get();
        const edgesData = edges.current.get();

        const isCanvasEmpty = nodesData.length === 0;

        if (isCanvasEmpty) {
            setErrorMessages(['The canvas is empty. Please add devices first.']);
            setSuccessMessages([]);
            setShowSimulationModal(true);
            return;
        }

        const allDevicesHaveIP = nodesData.every(node => node.ip);

        if (!allDevicesHaveIP) {
            setErrorMessages(['All devices placed must have a unique IP address.']);
            setSuccessMessages([]);
            setShowSimulationModal(true);
            return;
        }

        const validNodes = nodesData.filter(node => deviceIPs[node.id]);

        const { isValidTopology, isValidDeviceCount, pcCount, routerCount } = validateRingTopology(validNodes, edgesData);
        const arePoliciesValid = validatePolicies(devicePolicies);

        const errorMessages = [];
        const successMessages = [];

        if (isValidDeviceCount) {
            successMessages.push(`Device count is correct! ${pcCount} PCs and ${routerCount} Routers found.`);
        } else {
            errorMessages.push(`Incorrect device count! Expected 10 PCs and 2 Routers, but found ${pcCount} PCs and ${routerCount} Routers.`);
        }

        if (isValidTopology) {
            successMessages.push('The Topology is correct!');
        } else {
            errorMessages.push('Incorrect Topology!');
        }

        if (arePoliciesValid) {
            successMessages.push('Policies are correctly applied!');
        } else {
            errorMessages.push('Policies are not correctly applied.');
        }

        if (isValidDeviceCount && isValidTopology && arePoliciesValid) {
            successMessages.push('Well Done! The scenario conditions are met.');
        }

        setErrorMessages(errorMessages);
        setSuccessMessages(successMessages);
        setShowSimulationModal(true);
    };

    const handleResetSimulation = () => {
        setShowSimulationModal(false);
        nodes.current.clear();
        edges.current.clear();
        setDeviceIPs({});
        setDevicePolicies({});
        setSelectedNodes([]);
        setSelectedDevice(null);
        setShowAlert({ show: true, message: 'Simulation reset successfully!', type: 'success' });

        // Reset timer and clear interval
        setTimer(60);
        setIsTimerRunning(false);
        clearInterval(intervalRef.current.timer);
        clearInterval(intervalRef.current.progressBar);
    };

    return (
        <div className="font-montserrat text-stone-600 flex flex-col p-3 bg-gray-100">
            {/* Main Content Area */}
            <div className="flex gap-3">
                {/* Topology Builder Placeholder */}
                <Card className="flex-grow rounded-lg shadow-md">
                    <h2 className="text-lg text-center font-semibold">Topology Structure</h2>

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

                        {showAlert.show && (
                            <Alert color={showAlert.type} className="mb-4">
                                {showAlert.message}
                            </Alert>
                        )}
                    </div>

                    <div ref={networkRef} className="relative border-2 border-dashed border-gray-300 rounded-lg h-80"></div>

                    <div className="flex justify-between items-center">
                        <div className="text-stone-600 flex">
                            <div className='p-2 font-semibold'>
                                {selectedNodes.length} node{selectedNodes.length !== 1 ? 's' : ''} selected
                            </div>
                            <Button onClick={resetSelection} color="gray"
                                className='ml-2 text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                                <IoArrowUndo />
                            </Button>
                        </div>

                        <div className="flex space-x-3">
                            <Tooltip content='Link Nodes' style='light' placement='top' animation='duration-500'>
                                <Button onClick={handleConnectNodes} gradientMonochrome="teal"
                                    className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                                    <FaLink className='text-lg' />
                                </Button>
                            </Tooltip>

                            <Tooltip content='Delete Nodes' style='light' placement='top' animation='duration-500'>
                                <Button onClick={handleDeleteNodes} gradientMonochrome="failure"
                                    className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                                    <FaTrash className='text-lg' />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </Card>

                <div className='flex flex-col gap-3'>
                    {/* Policy Configuration Panel */}
                    <Card className="w-full h-[60%] rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-center">Policies Configuration</h2>
                        <div>
                            <p className="text-center text-sm font-semibold">Device : {selectedDevice || 'None'}</p>
                        </div>
                        {/* Access Control Policy */}
                        <Dropdown outline gradientDuoTone="greenToBlue" style={{ width: '100%' }} label="Access Control" dismissOnClick={false}>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.accessControl.includes('Remote Desktop Access') || false}
                                    onChange={() => handlePolicyChange('accessControl', 'Remote Desktop Access')}
                                    className='mr-2' />
                                <Label >Remote Desktop Access</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.accessControl.includes('File Transfer Access') || false}
                                    onChange={() => handlePolicyChange('accessControl', 'File Transfer Access')}
                                    className='mr-2' />
                                <Label >File Transfer Access</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.accessControl.includes('SSH Access') || false}
                                    onChange={() => handlePolicyChange('accessControl', 'SSH Access')}
                                    className='mr-2' />
                                <Label >SSH Access</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.accessControl.includes('Admin Privilege') || false}
                                    onChange={() => handlePolicyChange('accessControl', 'Admin Privilege')}
                                    className='mr-2' />
                                <Label >Admin Privilege</Label>
                            </Dropdown.Item>
                        </Dropdown>

                        {/* Quality of Service Policy */}
                        <Dropdown outline gradientDuoTone="greenToBlue" style={{ width: '100%' }} label="Quality of Service" dismissOnClick={false}>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.qos.includes('VoiP') || false}
                                    onChange={() => handlePolicyChange('qos', 'VoiP')}
                                    className='mr-2' />
                                <Label >VoiP</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.qos.includes('Limit P2P') || false}
                                    onChange={() => handlePolicyChange('qos', 'Limit P2P')}
                                    className='mr-2' />
                                <Label >Limit P2P</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.qos.includes('Throttle Bulk Data') || false}
                                    onChange={() => handlePolicyChange('qos', 'Throttle Bulk Data')}
                                    className='mr-2' />
                                <Label >Throttle Bulk Data</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.qos.includes('Prioritize Streaming') || false}
                                    onChange={() => handlePolicyChange('qos', 'Prioritize Streaming')}
                                    className='mr-2' />
                                <Label >Prioritize Streaming</Label>
                            </Dropdown.Item>
                        </Dropdown>

                        {/* Firewall Policy */}
                        <Dropdown outline gradientDuoTone="greenToBlue" style={{ width: '100%' }} label="Firewall" dismissOnClick={false}>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.firewall.includes('Block Untrusted IP') || false}
                                    onChange={() => handlePolicyChange('firewall', 'Block Untrusted IP')}
                                    className='mr-2' />
                                <Label>Block Untrusted IP</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.firewall.includes('Allow Web Traffic') || false}
                                    onChange={() => handlePolicyChange('firewall', 'Allow Web Traffic')}
                                    className='mr-2' />
                                <Label>Allow Web Traffic</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.firewall.includes('Block Ping Request') || false}
                                    onChange={() => handlePolicyChange('firewall', 'Block Ping Request')}
                                    className='mr-2' />
                                <Label>Block Ping Request</Label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox
                                    checked={devicePolicies[selectedDevice]?.firewall.includes('Restrict Outbound Traffic') || false}
                                    onChange={() => handlePolicyChange('firewall', 'Restrict Outbound Traffic')}
                                    className='mr-2' />
                                <Label>Restrict Outbound Traffic</Label>
                            </Dropdown.Item>
                        </Dropdown>

                        <Button gradientMonochrome="teal" onClick={handlePolicySave}
                            className="text-stone-200 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300">
                            Apply
                        </Button>
                    </Card>

                    <Card className="w-full h-[25%] rounded-lg shadow-md">
                        {isTimerRunning && (
                            <div className="text-center">
                                <p className="text-lg font-semibold">Time Left: {timer} seconds</p>
                            </div>
                        )}
                        <Button onClick={handleResetSimulation} gradientMonochrome="teal"
                            className='text-stone-200 border-stone-400 shadow-md
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                            Reset Simulation
                        </Button>
                        {!isTimerRunning && (
                            <Button onClick={handleRunSimulation}
                                gradientMonochrome="success" className='text-stone-200 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                                Start Simulation
                            </Button>
                        )}
                    </Card>

                    {/* Simulation Progress Bar */}
                    {isSimulationRunning && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-1/3 bg-white p-4 rounded shadow-lg">
                                <p className="text-lg font-semibold text-center">Simulation in Progress</p>
                                <div className="w-full h-full bg-gray-200 rounded h-2 mt-3">
                                    <div className="mt-2">
                                        <Progress
                                            progress={progress}
                                            color="teal"
                                            size="lg"
                                            labelProgress
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >

            {/* Delete Nodes Modal */}
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

            {/* IP Editing Modal */}
            <Modal className='font-montserrat' show={showIpModal} size="md" popup={true} onClose={() => setShowIpModal(false)}>
                <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'> Assign IP Address </Modal.Header>
                <Modal.Body>
                    <div className='text-center mt-5'>
                        <Label htmlFor="ipAddress" className='text-lg'>Enter IP Address</Label>
                        <TextInput
                            id="ipAddress"
                            type="text"
                            placeholder="ex: 192.168.0.1"
                            value={fakeIpAddress}
                            onChange={(e) => setFakeIpAddress(e.target.value)}
                            className="rounded text-stone-600 mt-3"
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-3">
                        <Button color="gray" className='text-stone-600 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300' onClick={() => setShowIpModal(false)}>
                            Cancel
                        </Button>
                        <Button gradientMonochrome="teal" onClick={saveFakeIP}
                            className='text-stone-100 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Simulation Modal */}
            <Modal className='font-montserrat' show={showSimulationModal} onClose={() => setShowSimulationModal(false)}>
                <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Simulation Result</Modal.Header>
                <Modal.Body>
                    {errorMessages.length > 0 && (
                        <ul className='list-disc list-inside text-red-600'>
                            {errorMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    )}
                    {successMessages.length > 0 && (
                        <ul className='list-disc list-inside text-green-600'>
                            {successMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    )}

                    <div className='flex justify-end mt-4'>
                        <Button className='text-stone-100 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'
                            gradientMonochrome="teal" onClick={handleResetSimulation}>Try Again!</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
}