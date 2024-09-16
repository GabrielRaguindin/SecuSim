"use client";

import { Modal, Button } from "flowbite-react";
import { useEffect } from "react";

export default function ScenarioModal({ title, scenarioDesc, description, openModal, setOpenModal, objOne, objTwo, objThree }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setOpenModal(false);
        }
    };

    useEffect(() => {
        if (openModal) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [openModal]);

    return (
        <Modal className="font-montserrat" show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className="bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%">{title}</Modal.Header>
            <Modal.Body>
                <div className='space-y-2'>
                    <p className='text-stone-600 font-bold text-lg'> {scenarioDesc} </p>
                    <p className='text-stone-600 font-bold'> Objective : </p>
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                    <p className='text-stone-600 font-bold'> Requirements : </p>
                    <div className="space-y-3 ml-5 text-stone-600">
                        <ul className="list-disc list-inside">
                            <li> {objOne} </li>
                            <li> {objTwo} </li>
                            <li> {objThree} </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <Button gradientMonochrome="teal" onClick={() => setOpenModal(false)}
                        className="shadow-md transform hover:scale-105 active:scale-100 transition duration-300">
                        Got it!
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}