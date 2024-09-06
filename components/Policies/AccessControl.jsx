'use client';

import { useState } from "react";
import PolicyCard from "../PolicyCard";
import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { SiOpenaccess } from "react-icons/si";
import { handleSavePolicy } from "@/app/lib/SavePolicy";

export default function AccessControl() {
    const [openModalAccess, setOpenModalAccess] = useState(false);

    const [accessSettings, setAccessSettings] = useState({
        remoteDesktopAccess: false,
        fileTransferAccess: false,
        sshAccess: false,
        adminPrivileges: false,
    });

    return (
        <>
            <PolicyCard
                icon={SiOpenaccess}
                title="Access Control Policy"
                description="Access control policy functions by authenticating user credentials..."
                onViewDetailsClick={() => setOpenModalAccess(true)}
            />
            <Modal className='font-montserrat' show={openModalAccess} onClose={() => setOpenModalAccess(false)}>
                <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Access Control Policy</Modal.Header>
                <Modal.Body>
                    <p className='text-stone-600 mb-3'>Considered a key component in a security plan, access control policies
                        refer to rules or policies that limit unauthorized physical or logical access to sensitive data.</p>

                    <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
                    <div className="space-y-3 ml-5">
                        <div className="flex items-center gap-2">
                            <Checkbox checked={accessSettings.remoteDesktopAccess} onChange={(e) => setAccessSettings({ ...accessSettings, remoteDesktopAccess: e.target.checked })} />
                            <Label> Remote Desktop Access </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={accessSettings.fileTransferAccess} onChange={(e) => setAccessSettings({ ...accessSettings, fileTransferAccess: e.target.checked })} />
                            <Label> File Transfer Protocol Access </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={accessSettings.sshAccess} onChange={(e) => setAccessSettings({ ...accessSettings, sshAccess: e.target.checked })} />
                            <Label> Secure Shell (SSH) Access </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={accessSettings.adminPrivileges} onChange={(e) => setAccessSettings({ ...accessSettings, adminPrivileges: e.target.checked })} />
                            <Label> Administrative Privileges </Label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="gray" onClick={() => setOpenModalAccess(false)}
                        className='text-stone-600 border-stone-400 shadow-md 
                        transform hover:scale-105 active:scale-100 transition duration-300'>
                        Close
                    </Button>
                    <Button onClick={() => { handleSavePolicy('AccessControl', accessSettings); setOpenModalAccess(false); }}
                        gradientMonochrome='teal'
                        className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}