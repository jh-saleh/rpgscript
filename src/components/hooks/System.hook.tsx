import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface SystemContextType {
    shutdown: boolean;
    setShutdown: Dispatch<SetStateAction<boolean>>;
}

const SystemContext = createContext<SystemContextType | null>(null);

interface SystemContextProviderProps {
    children: ReactNode;
}

export const SystemContextProvider = ({ children }: SystemContextProviderProps) => {
    const [shutdown, setShutdown] = useState<boolean>(false);

    return <SystemContext.Provider value={
        {
            shutdown, setShutdown
        }
    }>
        {children}
    </SystemContext.Provider>
}

export const useSystem = (): SystemContextType => {
    const context = useContext<SystemContextType | null>(SystemContext);
    if (context === null) {
        throw Error("useSystem must be inside SystemContextProvider.");
    }

    return context;
}