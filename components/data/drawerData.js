import { HiHome, HiCubeTransparent, HiInformationCircle } from 'react-icons/hi';
import { PiNetworkFill } from 'react-icons/pi';
import { MdPolicy } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { FaHammer } from "react-icons/fa6";

// For future updates you can make this dynamic (fetching from the server with the following json format below)
export const drawerData = [
    { icon: <HiHome />, link: '/', label: 'Home' },
    { icon: <MdPolicy />, link: '/policies', label: 'Policies', hasChevron: true },
    { icon: <PiNetworkFill />, link: '/topologies', label: 'Topologies', hasChevron: true },
    { icon: <FaHammer />, link: '/builder', label: 'Topology Builder', hasChevron: true },
    { icon: <HiCubeTransparent />, link: '/simulation', label: 'Simulate', hasChevron: true },
    { icon: <IoMdAnalytics />, link: '/', label: 'Reports' },
    { icon: <HiInformationCircle />, link: '/about', label: 'What is SecuSim?' },
]