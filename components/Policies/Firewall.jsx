'use client';

import { RiFireLine } from "react-icons/ri";
import PolicyCard from "../PolicyCard";
import { useState } from "react";
import { handleSavePolicy } from "@/app/lib/SavePolicy";
import PolicyModal from "./PolicyModal/PolicyModal";

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

            <PolicyModal
                title="Firewall Policy"
                description={"Firewalls are typically used to gate the borders of a private network or its host devices. As such, firewalls are one security tool in the broader category of user access control."}
                descriptionTwo={"Firewalls represent one component of a strategy to combat malicious activities and assaults on computing resources and network-accessible information."}
                settings={firewallSettings}
                setSettings={setFirewallSettings}
                openModal={openModalFirewall}
                setOpenModal={setOpenModalFirewall}
                handleSavePolicy={handleSavePolicy}
            />
        </>
    )
}