import { FaMobileAlt } from "react-icons/fa";

export default function MobileView() {
    return (
        <div className="font-montserrat flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%">
            <div className="p-6 rounded-lg max-w-md">
                <div className="flex justify-center">
                    <FaMobileAlt className="text-7xl text-gray-800 mb-5 text-stone-100" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-stone-100">Mobile Device Detected!</h1>
                <p className="text-stone-100">
                    It looks like you&apos;re using a mobile device! To enjoy the full SecuSim experience, please use a device with larger viewports.
                </p>
            </div>
        </div>
    )
}