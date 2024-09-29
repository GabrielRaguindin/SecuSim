'use client';

import { TbCloudDataConnection } from "react-icons/tb";
import PolicyCard from "../PolicyCard";
import { useState } from "react";
import { handleSavePolicy } from "@/app/lib/SavePolicy";
import PolicyModal from "./PolicyModal/PolicyModal";
import Toast from "../Toast/Toast";

export default function QualityOfService() {
    const [openModalQuality, setOpenModalQuality] = useState(false);



    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSave = async () => {
        const { status, message } = await handleSavePolicy('Quality of Service Policy', qualitySettings);
        setToastMessage(message);
        setToastType(status);
        setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);
    };

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

            <PolicyModal
                title="Quality of Service Policy"
                description={"Quality of Service is typically applied to networks that carry traffic for resource-intensive systems. Common services for which it is required include data transmission, online gaming, streaming media, and Voice over IP."}
                descriptionTwo={"This enables an organization to prioritize traffic and resources to guarantee the promised performance of a specific application or service."}
                settings={qualitySettings}
                setSettings={setQualitySettings}
                openModal={openModalQuality}
                setOpenModal={setOpenModalQuality}
                handleSavePolicy={handleSave}
            />

            {showToast && <Toast message={toastMessage} type={toastType} setShowToast={setShowToast} />}
        </>
    )
}