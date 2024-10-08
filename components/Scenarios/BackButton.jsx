"use client";

import { Button } from "flowbite-react";
import { ImExit } from "react-icons/im";
import Link from "next/link";

export default function BackButton() {
    return (
        <Button
            color="gray"
            className='text-stone-600 border-stone-400 shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
            as={Link}
            href="/simulation"
        >
            <ImExit />
        </Button>
    );
}