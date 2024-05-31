import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface FocusWindowsContextType {
    nodes: Record<string, boolean>;
    getInFocus(id: string): void;
}

const FocusWindowsContext = createContext<FocusWindowsContextType | null>(null);

interface FocusWindowsContextProviderProps {
    ids: string[];
    children: ReactNode;
}

export const FocusWindowsContextProvider = ({ ids, children }: FocusWindowsContextProviderProps) => {
    const [nodes, setNodes] = useState<Record<string, boolean>>({});

    useEffect(() => {
        for (let id of ids) {
            nodes[id] = false;
        }
        setNodes(() => ({ ...nodes }));
    }, []);

    const getInFocus = (id: string) => {
        Object.keys(nodes).forEach((nodeId) => {
            nodes[nodeId] = nodeId === id;
        });
        setNodes(() => ({ ...nodes }));
    }

    return <FocusWindowsContext.Provider value={{ nodes, getInFocus }}>
        {children}
    </FocusWindowsContext.Provider>
}

export const useFocusWindows = () => {
    const context = useContext<FocusWindowsContextType | null>(FocusWindowsContext);
    if (context === null) {
        throw Error("useFocusWindows must be inside a FocusWindowsProvider.");
    }
    return context;
}