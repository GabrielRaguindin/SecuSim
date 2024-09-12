'use client';

import { Button, Card } from "flowbite-react";

export default function PolicyCard({
    icon: Icon, title, description, onViewDetailsClick }) {
    return (
        <Card className='w-[100%] shadow-xl'>
            {Icon && <Icon className='text-6xl text-stone-600' />}
            <h5 className='text-2xl font-medium text-stone-600'>
                {title}
            </h5>
            <p className='text-stone-600'>
                {description}
            </p>

            <div className='flex justify-end'>
                <Button
                    gradientMonochrome='teal'
                    className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
                    onClick={onViewDetailsClick}
                >
                    View Details
                </Button>
            </div>
        </Card>
    )
}