'use client';

import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { useEffect } from "react";

export default function PolicyModal({ title, description, descriptionTwo, settings, setSettings, openModal, setOpenModal, handleSavePolicy, }) {
    const handleChange = (setting) => (e) => {
        setSettings({ ...settings, [setting]: e.target.checked });
    };

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
        };
    }, [openModal]);

    return (
        <Modal className='font-montserrat' show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>{title}</Modal.Header>
            <Modal.Body>
                <h3 className='text-stone-600 font-bold mb-2'>Definition</h3>
                <p className='text-stone-600 mb-3'>{description}</p>
                <p className='text-stone-600 mb-3'>{descriptionTwo}</p>
                <h3 className='text-stone-600 font-bold mb-3'>Controls</h3>
                <div className="space-y-3 ml-5">
                    {Object.keys(settings).map((key) => (
                        <div key={key} className="flex items-center gap-2">
                            <Checkbox checked={settings[key]} id={key} onChange={handleChange(key)} />
                            <Label htmlFor={key} className="hover:cursor-pointer hover:underline duration-150">{key.split(/(?=[A-Z])/).join(' ')}</Label>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
                <Button color="gray" onClick={() => setOpenModal(false)}
                    className='text-stone-600 border-stone-400 shadow-md 
            transform hover:scale-105 active:scale-100 transition duration-300'>
                    Close
                </Button>
                <Button onClick={() => { handleSavePolicy(title, settings); setOpenModal(false); }}
                    gradientMonochrome='teal'
                    className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}