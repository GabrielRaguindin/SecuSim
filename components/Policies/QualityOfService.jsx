'use client';

import { TbCloudDataConnection } from "react-icons/tb";
import PolicyCard from "../PolicyCard";
import { useState } from "react";
import { Button, Label, Modal, Checkbox } from "flowbite-react";
import { handleSavePolicy } from "@/app/lib/SavePolicy";

export default function QualityOfService() {
    const [openModalQuality, setOpenModalQuality] = useState(false);
    const [qualitySettings, setQualitySettings] = useState({
        voip: false,
        limitP2P: false,
        throttleBulkData: false,
        prioritizeStreaming: false,
    });

    return (
        <>
            <PolicyCard
                icon={TbCloudDataConnection}
                title="Quality of Service Policy"
                description="Quality of service policy is the use of mechanisms or technologies that work on a network
                to control traffic and ensure the performance of critical applications with limited network capacity."
                onViewDetailsClick={() => setOpenModalQuality(true)}
            />

            <Modal className='font-montserrat' show={openModalQuality} onClose={() => setOpenModalQuality(false)}>
                <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Quality of Service Policy</Modal.Header>
                <Modal.Body>
                    <p className='text-stone-600 mb-3'> QoS is typically applied to networks that carry traffic for resource-intensive systems.
                        Common services for which it is required include data transmission, online gaming, streaming media, and Voice over IP. </p>

                    <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
                    <div className="space-y-3 ml-5">
                        <div className="flex items-center gap-2">
                            <Checkbox checked={qualitySettings.voip} onChange={(e) => setQualitySettings({ ...qualitySettings, voip: e.target.checked })} />
                            <Label> Voice over Internet Protocol (VoiP) </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={qualitySettings.limitP2P} onChange={(e) => setQualitySettings({ ...qualitySettings, limitP2P: e.target.checked })} />
                            <Label> Limit Peer-to-Peer (P2P) Traffic </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={qualitySettings.throttleBulkData} onChange={(e) => setQualitySettings({ ...qualitySettings, throttleBulkData: e.target.checked })} />
                            <Label> Throttle Bulk Data Transfers </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={qualitySettings.prioritizeStreaming} onChange={(e) => setQualitySettings({ ...qualitySettings, prioritizeStreaming: e.target.checked })} />
                            <Label> Prioritize Streaming Services & Limit Online Gaming Traffic </Label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="gray" onClick={() => setOpenModalQuality(false)}
                        className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
                        Close
                    </Button>
                    <Button onClick={() => { handleSavePolicy('QoS', qualitySettings); setOpenModalQuality(false); }}
                        gradientMonochrome='teal'
                        className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}