'use client';

import { RiFireLine } from "react-icons/ri";
import PolicyCard from "../PolicyCard";
import { useState } from "react";
import { Button, Checkbox, Modal, Label } from "flowbite-react";
import { handleSavePolicy } from "@/app/lib/SavePolicy";

export default function FirewallPolicy() {
    const [openModalFirewall, setOpenModalFirewall] = useState(false);

    const [firewallSettings, setFirewallSettings] = useState({
        blockUntrustedIPs: false,
        allowWebTraffic: false,
        blockPingRequest: false,
        restrictOutboundTraffic: false,
    });
    return (
        <>
            <PolicyCard
                icon={RiFireLine}
                title="Firewall Policy"
                description="Firewall policy is a set of rules and standards designed to control network traffic
                between an organization&apos;s internal network and the internet. It helps to guard against potential security threats."
                onViewDetailsClick={() => setOpenModalFirewall(true)}
            />

            <Modal className='font-montserrat' show={openModalFirewall} onClose={() => setOpenModalFirewall(false)}>
                <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Firewall Policy</Modal.Header>
                <Modal.Body>
                    <p className='text-stone-600 mb-3'> Firewalls are typically used to gate the borders of a private network or its host devices.
                        As such, firewalls are one security tool in the broader category of user access control. </p>

                    <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
                    <div className="space-y-3 ml-5">
                        <div className="flex items-center gap-2">
                            <Checkbox checked={firewallSettings.blockUntrustedIPs} onChange={(e) => setFirewallSettings({ ...firewallSettings, blockUntrustedIPs: e.target.checked })} />
                            <Label> Block Untrusted IP Addresses </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={firewallSettings.allowWebTraffic} onChange={(e) => setFirewallSettings({ ...firewallSettings, allowWebTraffic: e.target.checked })} />
                            <Label> Allow Web Traffic (HTTP/HTTPS) </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={firewallSettings.blockPingRequests} onChange={(e) => setFirewallSettings({ ...firewallSettings, blockPingRequests: e.target.checked })} />
                            <Label> Block Incoming Ping Requests </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={firewallSettings.restrictOutboundTraffic} onChange={(e) => setFirewallSettings({ ...firewallSettings, restrictOutboundTraffic: e.target.checked })} />
                            <Label> Restrict Outbound Traffic to Specific Ports </Label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="gray" onClick={() => setOpenModalFirewall(false)}
                        className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
                        Close
                    </Button>
                    <Button onClick={() => { handleSavePolicy('Firewall', firewallSettings); setOpenModalFirewall(false); }}
                        gradientMonochrome='teal'
                        className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}