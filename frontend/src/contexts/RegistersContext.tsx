import { api } from "@/services/api";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "vm";


interface Registers {
    name: string,
    date: Date
}

interface RegistersContext {
    registers: Registers[],
    createNewRegister: (name: Registers) => void;
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
        api.get("http://localhost:3000/actives").then((response) => setRegisters(response.data))
    },[]);


    function createNewRegister(name: Registers) {
        api.post("http://localhost:3000/register", name)
    }

    return (
        <RegistersContext.Provider value={{registers, createNewRegister}}>
            {children}
        </RegistersContext.Provider>
    )
}