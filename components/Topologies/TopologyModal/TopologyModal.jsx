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
                <h3 className='text-stone-600 font-bold mb-2'>Definition</h3>
                <p className="text-stone-600">
                    {description}
                </p>
                <div className="mt-3">
                    <h3 className='text-stone-600 font-bold mb-3'>Visual Representation</h3>
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