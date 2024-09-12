"use client";

import { Modal, Button } from "flowbite-react";
import { useEffect } from "react";

export default function TopologyModal({ title, description, visualRep, openModal, setOpenModal }) {
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
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {description}
                </p>
                <div>
                    {visualRep}
                </div>
                <div className="flex justify-end mt-5">
                    <Button color="gray" onClick={() => setOpenModal(false)}
                        className="shadow-md transform hover:scale-105 active:scale-100 transition duration-300">
                        Got it!
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}