import { HiHome, HiCubeTransparent, HiInformationCircle } from 'react-icons/hi';
import { PiNetworkFill } from 'react-icons/pi';
import { MdPolicy } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';

// For future updates you can make this dynamic (fetching from the server with the following json format below)
export const drawerData = [
    { icon: <HiHome />, link: '/', label: 'Home' },
    { icon: <MdPolicy />, link: '/policies', label: 'Policy Templates', hasChevron: true },
    { icon: <PiNetworkFill />, link: '/topologies', label: 'Topology Templates', hasChevron: true },
    { icon: <HiCubeTransparent />, link: '/', label: 'Simulate', hasChevron: true },
    { icon: <IoMdAnalytics />, link: '/', label: 'Reports' },
    { icon: <HiInformationCircle />, link: '/', label: 'What is SecuSim?' },
]