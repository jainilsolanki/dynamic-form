"use client";
import { Grid2 } from "@mui/material";
import SideBar from "../components/sidebar.component";
import { createContext, useState } from "react";
import dynamic from "next/dynamic";
const FormComponent = dynamic(() => import('../components/form.component'), { ssr: false })
interface FormContextProps {
    selectedForm: number;
    setSelectedForm: (formIndex: number) => void;
}

export const FormContext = createContext<FormContextProps>({
    selectedForm: 0,
    setSelectedForm: () => { },
});

export default function FormLayoutWrapper() {
    const [selectedForm, setSelectedForm] = useState(0);

    return (
        <div>
            <FormContext.Provider
                value={{ selectedForm: selectedForm, setSelectedForm: setSelectedForm }}
            >
                <Grid2 container className="h-screen">
                    <Grid2 size={{ xs: 2 }}>
                        <SideBar />
                    </Grid2>

                    <Grid2 size={{ xs: 10 }}><FormComponent /></Grid2>
                </Grid2>
            </FormContext.Provider>
        </div>
    );
}
