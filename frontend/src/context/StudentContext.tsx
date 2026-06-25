import { createContext } from "react";
import type { ReactNode } from 'react';


export const StudentContext = createContext(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
    return (
        <StudentContext.Provider
            value={{
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}