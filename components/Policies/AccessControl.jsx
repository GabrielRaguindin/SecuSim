'use client';

import { useState } from "react";
import PolicyCard from "../PolicyCard";
import { SiOpenaccess } from "react-icons/si";
import { handleSavePolicy } from "@/app/lib/SavePolicy";
import PolicyModal from "./PolicyModal/PolicyModal";

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

            <PolicyModal
                title="Access Control Policy"
                description={"Considered a key component in a security plan, access control policies refer to rules or policies that limit unauthorized physical or logical access to sensitive data."}
                settings={accessSettings}
                setSettings={setAccessSettings}
                openModal={openModalAccess}
                setOpenModal={setOpenModalAccess}
                handleSavePolicy={handleSavePolicy}
            />
        </>
    )
}