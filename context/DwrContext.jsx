"use client";
import { createContext, useState } from "react";

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prev) => !prev)
    };

    return <DrawerContext.Provider value={{ open, toggle }}> {children} </DrawerContext.Provider>
};

export default DrawerContextProvider;