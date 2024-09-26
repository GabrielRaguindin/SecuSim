"use client"

import { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';

export default function Results() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch('/api/saveResults');
            if (res.ok) {
                const data = await res.json();
                console.log('Fetched Results:', data); // Check what we got
                setResults(data);
            } else {
                console.error('Failed to fetch results:', res.statusText);
            }
        };

        fetchResults();
    }, []);

    const handleDelete = (index) => {
        setResults((prevResults) => prevResults.filter((_, i) => i !== index));
    };

    return (
        <div className='font-montserrat text-stone-600'>
            <h1 className="text-2xl font-bold p-4">Simulation Results</h1>
            {results.length === 0 ? (
                <p className='ml-4'>No results found.</p>
            ) : (
                results.map((result, index) => (
                    <Card key={index} className="w-[60%] mb-3 ml-3 shadow-lg">
                        <h2 className='text-xl font-semibold'>Result {index + 1}</h2>
                        <p className='text-green-600'>
                            <strong>Success Messages:</strong> {result.successMessages.join(', ')}
                        </p>
                        <p className='text-red-600'>
                            <strong>Error Messages:</strong> {result.errorMessages.join(', ')}
                        </p>
                        <p className='text-sm text-gray-500'>
                            <strong>Timestamp:</strong> {result.timestamp}
                        </p>

                        <div className='flex justify-end'>
                            <Button gradientMonochrome='failure' 
                            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                            onClick={() => handleDelete(index)}>
                                Delete Record
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
};