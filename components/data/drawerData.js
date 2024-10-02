import { HiHome, HiCubeTransparent, HiInformationCircle } from 'react-icons/hi';
import { PiNetworkFill } from 'react-icons/pi';
import { MdPolicy } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { FaHammer } from "react-icons/fa6";

// For future updates you can make this dynamic (fetching from the server with the following json format below)
export const drawerData = [
    { icon: <HiHome />, link: '/home', label: 'Home' },
    { icon: <MdPolicy />, link: '/policies', label: 'Learn Policies' },
    { icon: <PiNetworkFill />, link: '/topologies', label: 'Learn Topologies' },
    { icon: <FaHammer />, link: '/builder', label: 'Topology Sandbox' },
    { icon: <HiCubeTransparent />, link: '/simulation', label: 'Simulator' },
    { icon: <IoMdAnalytics />, link: '/results', label: 'Result Logs'},
    { icon: <HiInformationCircle />, link: '/about', label: 'What is SecuSim?' },
]