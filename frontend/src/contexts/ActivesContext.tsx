import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface Actives {
    id: string,
    category: string,
    locale: string,
    date_buy: string,
    value_buy: number,
    nf: string,
    rate: number,
    description: string,
    provider: string,
    life_util: number,
}

interface ActiveCreate {
    category: string,
    locale: string,
    date_buy: Date,
    value_buy: number,
    nf: string,
    rate: number,
    description: string,
    provider: string,
    life_util: Date,
}

interface ActivesContext {
    actives: Actives[],
    getUniqueActive: (id?: string) => Actives | undefined;
    createNewactive: (active: ActiveCreate) => void;
    removeActive: (id: string) => void;
}

export const ActivesContext = createContext({} as ActivesContext)

interface ActivesContextProviderProps {
    children: ReactNode
}

export function ActivesContextProvider({
    children,
}: ActivesContextProviderProps) {
    const [actives,setActives] = useState<Actives[]>([]);
    useEffect(() => {
        api.get("http://localhost:3000/actives").then((response) => setActives(response.data))
    },[]);

    function createNewactive(active: ActiveCreate) {
        api.post("http://localhost:3000/actives", active)
        console.log
    }

    function removeActive(id: string) {
        api.delete(`http://localhost:3000/actives/${id}`)
        window.location.reload()
    }

    function getUniqueActive(id?: string) {
        return actives.find(active => active.id === id); 
    }

    return (
        <ActivesContext.Provider value={{actives, getUniqueActive,createNewactive, removeActive}}>
            {children}
        </ActivesContext.Provider>
    )
}