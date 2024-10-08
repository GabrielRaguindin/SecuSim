"use client";

import { useEffect, useState } from 'react';
import { Card, Button, Tooltip, Modal } from 'flowbite-react';
import jsPDF from 'jspdf';
import { FaTrash, FaDownload } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Toast from './Toast/Toast';

export default function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteRecords, setShowDeleteRecords] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch('/api/saveResults');
            if (res.ok) {
                const data = await res.json();
                setResults(data);
            } else {
                console.error('Failed to fetch results:', res.statusText);
            }
        };

        fetchResults();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/saveResults');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setResults(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch('/api/saveResults', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setToastMessage('Deleted successfully');
                setToastType('success');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setResults((prevResults) => prevResults.filter((result) => result.id !== id));
            } else {
                setToastMessage('Failed to delete');
                setToastType('failure');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                console.error('Failed to delete');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    const handleDownloadPDF = (result, index) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [320, 90],
        });

        // Title
        doc.setFontSize(18);
        doc.text(`Simulation Result ${index + 1}`, 10, 10);

        // Success Messages
        doc.setFontSize(14);
        doc.setTextColor('green');
        doc.text('Success Messages:', 10, 20);
        doc.setFontSize(12);
        doc.text(result.successMessages.length > 0 ? result.successMessages.join(', ') : 'N/A', 10, 30);

        // Error Messages
        doc.setFontSize(14);
        doc.setTextColor('red');
        doc.text('Error Messages:', 10, 40);
        doc.setFontSize(12);
        doc.text(result.errorMessages.length > 0 ? result.errorMessages.join(', ') : 'N/A', 10, 50);

        // Timestamp
        const formattedTimestamp = new Date(result.timestamp).toLocaleString();
        doc.setFontSize(14);
        doc.setTextColor('gray');
        doc.text('Timestamp:', 10, 60);
        doc.setFontSize(12);
        doc.text(formattedTimestamp, 10, 70);

        // Save the PDF
        doc.save(`simulation-result-${index + 1}.pdf`);
    };

    return (
        <div className='font-montserrat text-stone-600'>
            <h1 className="text-2xl font-bold p-4">Simulation Results</h1>
            {showToast && <Toast message={toastMessage} type={toastType} setShowToast={setShowToast} />}
            {loading ? (
                <p className='ml-4'>Loading...</p>
            ) : error ? (
                <p className='ml-4 text-red-600'>Error: {error}</p> // Show error if any
            ) : results.length === 0 ? (
                <p className='ml-4'>No results found.</p>
            ) : (
                results.map((result, index) => (
                    <Card key={result.id} className="w-[90%] mb-3 ml-3 shadow-lg">
                        <h2 className='text-xl font-semibold'>Result {result.resultNumber} - {result.id}</h2>
                        <p className='text-green-600'>
                            <strong>Success Messages:</strong> {result.successMessages.length > 0 ? result.successMessages.join(', ') : 'N/A'}
                        </p>
                        <p className='text-red-600'>
                            <strong>Error Messages:</strong> {result.errorMessages.join(', ')}
                        </p>
                        <p className='text-sm text-gray-500'>
                            <strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}
                        </p>

                        <div className='flex justify-end gap-3'>
                            <Tooltip content='Download Records' style='light' placement='top' animation='duration=500'>
                                <Button
                                    color='gray'
                                    className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                                    onClick={() => handleDownloadPDF(result, index)}
                                >
                                    <FaDownload />
                                </Button>
                            </Tooltip>

                            <Tooltip content='Delete Records' style='light' placement='top' animation='duration=500'>
                                <Button
                                    gradientMonochrome='failure'
                                    className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                                    onClick={() => {
                                        setDeletingId(result.id);
                                        setShowDeleteRecords(true);
                                    }}
                                >
                                    <FaTrash />
                                </Button>
                            </Tooltip>
                        </div>
                    </Card>
                ))
            )}
            <Modal className='font-montserrat' size='md' show={showDeleteRecords} onClose={() => setShowDeleteRecords(false)} popup>
                <Modal.Header />
                <Modal.Body className='text-stone-600'>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 text-red-500' />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this record?
                        </h3>
                        <p className='text-red-600 mb-5'>
                            <strong>Warning:</strong> This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => {handleDelete(deletingId); setShowDeleteRecords(false);}} gradientMonochrome='failure'
                            className='text-stone-100 border-stone-400 shadow-md 
                                transform hover:scale-105 active:scale-100 transition duration-300'>
                            Yes, Delete
                        </Button>
                        <Button onClick={() => setShowDeleteRecords(false)} color="gray"
                            className='text-stone-600 border-stone-400 shadow-md 
                            transform hover:scale-105 active:scale-100 transition duration-300'>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
