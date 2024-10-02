'use client';

import { useState } from "react";
import PolicyCard from "../PolicyCard";
import { MdOutlineEnhancedEncryption } from "react-icons/md";
import { handleSavePolicy } from "@/app/lib/SavePolicy";
import PolicyModal from "./PolicyModal/PolicyModal";
import Toast from "../Toast/Toast";

export default function Encryption() {
    const [openModalEncryption, setOpenModalEncryption] = useState(false);

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSave = async () => {
        const { status, message } = await handleSavePolicy('Encryption Policy', encryptionSettings);
        setToastMessage(message);
        setToastType(status);
        setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);
    };

    const [encryptionSettings, setEncryptionSettings] = useState({
        enableDataEncryption: false,
        requireEncryptedFileSharing: false,
        enableEndToEndEncryption: false,
        encryptVoip: false,
    });

    return (
        <>
            <PolicyCard
                icon={MdOutlineEnhancedEncryption}
                title="Encryption Policy"
                description="Encryption policies define how the organization encrypts and decrypts its network data and communications. It is the process of transforming plain text into unreadable cipher text using a secret key."
                onViewDetailsClick={() => setOpenModalEncryption(true)}
            />

            <PolicyModal
                title="Encryption Policy"
                description={"Encryption policies should specify the encryption standards, algorithms, protocols, and keys to be used for different types of data and scenarios, such as data at rest, data in transit, or data in use."}
                descriptionTwo={"Encryption policies should also address the key management, distribution, storage, and recovery practices, as well as the legal and regulatory compliance requirements."}
                settings={encryptionSettings}
                setSettings={setEncryptionSettings}
                openModal={openModalEncryption}
                setOpenModal={setOpenModalEncryption}
                handleSavePolicy={handleSave}
            />

            {showToast && <Toast message={toastMessage} type={toastType} setShowToast={setShowToast} />}
        </>
    )
}