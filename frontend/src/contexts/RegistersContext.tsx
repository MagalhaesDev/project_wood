import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface Registers {
    id: string,
    name: string,
    type: string,
    date: Date,
}

interface RegistersCreate {
    name: string,
    type: string
}


interface RegistersContext {
   registers: Registers[],
   createNewRegister: (data: RegistersCreate) => void
}

export const RegistersContext = createContext({} as RegistersContext)

interface RegistersContextProviderProps {
    children: ReactNode
}

export function RegistersContextProvider({
    children,
}: RegistersContextProviderProps) {
    const [registers,setRegisters] = useState<Registers[]>([]);
    useEffect(() => {
        api.get("http://localhost:3000/register").then((response) => setRegisters(response.data))
    },[]);

    function createNewRegister(data: RegistersCreate) {
        api.post("http://localhost:3000/register", data)
        window.location.reload()
    }

    return (
        <RegistersContext.Provider value={{registers,createNewRegister}}>
            {children}
        </RegistersContext.Provider>
    )
}