import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface FocusAppsContextType {
    apps: Record<string, boolean>;
    focusApp(id: string): void;
    unfocusApps(): void;
}

const FocusAppsContext = createContext<FocusAppsContextType | null>(null);

interface FocusAppsContextProviderProps {
    ids: string[];
    children: ReactNode;
}

export const FocusAppsContextProvider = ({ ids, children }: FocusAppsContextProviderProps) => {
    const [apps, setApps] = useState<Record<string, boolean>>({});

    useEffect(() => {
        for (let id of ids) {
            apps[id] = false;
        }
        setApps(() => ({ ...apps }));
    }, []);

    const focusApp = (id: string) => {
        Object.keys(apps).forEach((nodeId) => {
            apps[nodeId] = nodeId === id;
        });
        setApps(() => ({ ...apps }));
    }

    const unfocusApps = () => {
        Object.keys(apps).forEach((nodeId) => {
            apps[nodeId] = false;
        });
        setApps(() => ({ ...apps }));
    }

    return <FocusAppsContext.Provider value={{ apps, focusApp, unfocusApps }}>
        {children}
    </FocusAppsContext.Provider>
}

export const useFocusApps = () => {
    const context = useContext<FocusAppsContextType | null>(FocusAppsContext);
    if (context === null) {
        throw Error("useFocusApps must be inside a FocusAppsContextProvider.");
    }
    return context;
}