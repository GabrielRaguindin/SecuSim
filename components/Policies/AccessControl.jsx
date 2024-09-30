'use client';

import { useState } from "react";
import PolicyCard from "../PolicyCard";
import { SiOpenaccess } from "react-icons/si";
import { handleSavePolicy } from "@/app/lib/SavePolicy";
import PolicyModal from "./PolicyModal/PolicyModal";
import Toast from "../Toast/Toast";

export default function AccessControl() {
    const [openModalAccess, setOpenModalAccess] = useState(false);

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSave = async () => {
        const { status, message } = await handleSavePolicy('Access Control Policy', accessSettings);
        setToastMessage(message);
        setToastType(status);
        setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);
    };

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
                description="Access control policy function by authenticating user credentials, proving their identity, 
                and allowing the pre-approved permissions associated with their username and IP address."
                onViewDetailsClick={() => setOpenModalAccess(true)}
            />

            <PolicyModal
                title="Access Control Policy"
                description={"Considered a key component in a security plan, access control policies refer to rules or policies that limit unauthorized physical or logical access to sensitive data."}
                descriptionTwo={"These are sets of policies, instructions, and restrictions that are in place which specify who can access your data, when they can do so, and up to which level."}
                settings={accessSettings}
                setSettings={setAccessSettings}
                openModal={openModalAccess}
                setOpenModal={setOpenModalAccess}
                handleSavePolicy={handleSave}
            />

            {showToast && <Toast message={toastMessage} type={toastType} setShowToast={setShowToast} />}
        </>
    )
}