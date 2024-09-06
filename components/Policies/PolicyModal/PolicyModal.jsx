'use client';

import { Button, Checkbox, Label, Modal } from "flowbite-react";

export default function PolicyModal({ title, description, settings, setSettings, openModal, setOpenModal, handleSavePolicy, }) {
    const handleChange = (setting) => (e) => {
        setSettings({ ...settings, [setting]: e.target.checked });
    };
    return (
        <Modal className='font-montserrat' show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>{title}</Modal.Header>
            <Modal.Body>
                <p className='text-stone-600 mb-3'>{description}</p>
                <h3 className='text-stone-600 font-bold mb-3'>Controls</h3>
                <div className="space-y-3 ml-5">
                    {Object.keys(settings).map((key) => (
                        <div key={key} className="flex items-center gap-2">
                            <Checkbox checked={settings[key]} onChange={handleChange(key)} />
                            <Label>{key.split(/(?=[A-Z])/).join(' ')}</Label>
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