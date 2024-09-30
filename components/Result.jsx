"use client";

import { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import jsPDF from 'jspdf';
import { FaTrash, FaDownload } from 'react-icons/fa6';

export default function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log('Fetched Results:', data);
                setResults(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (index) => {
        setResults((prevResults) => prevResults.filter((_, i) => i !== index));
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
        doc.text(result.successMessages.join(', '), 10, 30);

        // Error Messages
        doc.setFontSize(14);
        doc.setTextColor('red');
        doc.text('Error Messages:', 10, 40);
        doc.setFontSize(12);
        doc.text(result.errorMessages.join(', '), 10, 50);

        // Timestamp
        doc.setFontSize(14);
        doc.setTextColor('gray');
        doc.text('Timestamp:', 10, 60);
        doc.setFontSize(12);
        doc.text(result.timestamp, 10, 70);

        // Save the PDF
        doc.save(`simulation-result-${index + 1}.pdf`);
    };

    return (
        <div className='font-montserrat text-stone-600'>
            <h1 className="text-2xl font-bold p-4">Simulation Results</h1>
            {loading ? (
                <p className='ml-4'>Loading...</p>
            ) : error ? (
                <p className='ml-4 text-red-600'>Error: {error}</p> // Show error if any
            ) : results.length === 0 ? (
                <p className='ml-4'>No results found.</p>
            ) : (
                results.map((result, index) => (
                    <Card key={index} className="w-[90%] mb-3 ml-3 shadow-lg">
                        <h2 className='text-xl font-semibold'>Result {index + 1}</h2>
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
                            <Button
                                color='gray'
                                className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                                onClick={() => handleDownloadPDF(result, index)}
                            >
                                <FaDownload />
                            </Button>
                            <Button
                                gradientMonochrome='failure'
                                className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                                onClick={() => handleDelete(index)}
                            >
                                <FaTrash />
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}
