import { ReactNode, createContext, useContext, useState } from "react";

interface SystemModalContextType {
    isLogOffModalOpen?: boolean;
    closeLogOffModal(): void;
    openLogOffModal(): void;
    isShutOffModalOpen?: boolean;
    closeShutOffModal(): void;
    openShutOffModal(): void;
}

const SystemModalContext = createContext<SystemModalContextType | null>(null);

interface SystemModalContextProviderProps {
    children: ReactNode;
}

export const SystemModalContextProvider = ({ children }: SystemModalContextProviderProps) => {
    const [isLogOffModalOpen, setIsLogOffModalOpen] = useState<boolean | undefined>(undefined);
    const [isShutOffModalOpen, setIsShutOffModalOpen] = useState<boolean | undefined>(undefined);

    const closeLogOffModal = (): void => {
        setIsLogOffModalOpen(() => false);
    };

    const openLogOffModal = (): void => {
        setIsLogOffModalOpen(() => true);
    };

    const closeShutOffModal = (): void => {
        setIsShutOffModalOpen(() => false);
    };

    const openShutOffModal = (): void => {
        setIsShutOffModalOpen(() => true);
    };

    return <SystemModalContext.Provider value={
        {
            isLogOffModalOpen, closeLogOffModal, openLogOffModal,
            isShutOffModalOpen, closeShutOffModal, openShutOffModal
        }
    }>
        {children}
    </SystemModalContext.Provider>
}

export const useSystemModal = (): SystemModalContextType => {
    const context = useContext<SystemModalContextType | null>(SystemModalContext);
    if (context === null) {
        throw Error("useSystemModal must be inside SystemModalContextProvider.");
    }

    return context;
}