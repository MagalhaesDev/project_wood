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
    activesFiltered: Actives[],
    getUniqueActive: (id?: string) => Actives | undefined;
    createNewactive: (active: ActiveCreate) => void;
    removeActive: (id: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterActive: (data: any) => void;
}



export const ActivesContext = createContext({} as ActivesContext)

interface ActivesContextProviderProps {
    children: ReactNode
}

export function ActivesContextProvider({
    children,
}: ActivesContextProviderProps) {
    const [actives,setActives] = useState<Actives[]>([]);
    const [activesFiltered, setActivesFiltered] = useState<Actives[]>([])
    useEffect(() => {
        api.get("http://localhost:3000/actives").then((response) => setActives(response.data))
    },[]);

    function createNewactive(active: ActiveCreate) {
        const formattedActive: ActiveCreate = {
            ...active,
            category: active.category.toUpperCase(),
            locale: active.locale.toUpperCase(),
            description: active.description.toUpperCase(),
            provider: active.provider.toUpperCase(),
        }
        
        api.post("http://localhost:3000/actives", formattedActive)
    }

    


    function removeActive(id: string) {
        api.delete(`http://localhost:3000/actives/${id}`)
        window.location.reload()
    }

    function getUniqueActive(id?: string) {
        return actives.find(active => active.id === id); 
    }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
    function filterActive(data: any) {
        if (data.category && data.locale && data.provider) {
            const filterActive = actives.filter(active => active.category === data.category && active.provider === data.provider && active.locale === data.locale)
        
            setActivesFiltered(filterActive)
            return;
        }

        if(data.category && data.provider) {
            const filterActive = actives.filter(active => active.category === data.category && active.provider === data.provider)

            setActivesFiltered(filterActive)
            return;
        }

        if(data.category && data.locale) {
            const filterActive = actives.filter(active => active.category === data.category && active.locale === data.locale)

            setActivesFiltered(filterActive)
            return;
        }

        if(data.locale && data.provider) {
            const filterActive = actives.filter(active => active.locale === data.locale && active.provider === data.provider)

            setActivesFiltered(filterActive)
            return;
        }

        if(data.category) {
           const filterActive = actives.filter(active => active.category === data.category);

           setActivesFiltered(filterActive);
           return;
        }
        if (data.provider) {
            const filterActive = actives.filter(active => active.provider === data.provider);

            setActivesFiltered(filterActive);
            return;
        }
        if (data.locale) {
            const filterActive = actives.filter(active => active.locale === data.locale);

            setActivesFiltered(filterActive);
            return;
        }
    }

    return (
        <ActivesContext.Provider value={{actives,activesFiltered, getUniqueActive,createNewactive, removeActive, filterActive}}>
            {children}
        </ActivesContext.Provider>
    )
}