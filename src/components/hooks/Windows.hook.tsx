import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface WindowPosition {
    top: number;
    left: number;
}

export interface WindowSize {
    width: number;
    height: number;
}

export type WindowState = "open" | "normal" | "maximized" | "closed" | "minimized";

interface WindowData {
    position: WindowPosition;
    size: WindowSize;
    zIndex: number;
    lastState: WindowState;
    state: WindowState;
    label: string;
    path: string;
}

type WindowsType = Record<string, WindowData>;

interface WindowsContextType {
    windows: WindowsType;
    clickWindow: (id: string) => void;
    openWindow: (id: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
}

const WindowsContext = createContext<WindowsContextType | null>(null);

interface WindowsContextProviderProps {
    initialData: { id: string, size: WindowSize, label: string, path: string }[];
    children: ReactNode;
}

export const WindowsContextProvider = ({ initialData, children }: WindowsContextProviderProps): ReactNode => {
    const [windows, setWindows] = useState<WindowsType>({});

    useEffect(() => {
        let initWindows: WindowsType = {};
        initialData.forEach(({ id, size, label, path }) => {
            initWindows[id] = {
                position: {
                    left: 0,
                    top: 0
                },
                size,
                label,
                path,
                lastState: "closed",
                state: "closed",
                zIndex: 0
            };
        });

        setWindows(() => initWindows);
    }, []);

    const clickWindow = (id: string): void => {
        Object.keys(windows).forEach((windowId) => {
            if (id === windowId) {
                windows[id].zIndex = 1
            } else {
                windows[id].zIndex = 0;
            }
        });
        setWindows(() => ({ ...windows }));
    };

    const openWindow = (id: string): void => {
        windows[id].lastState = windows[id].state;
        windows[id].state = "open";
        setWindows(() => ({ ...windows }));
    };

    const closeWindow = (id: string): void => {
        windows[id].lastState = windows[id].state;
        windows[id].state = "closed";
        setWindows(() => ({ ...windows }));
    };

    const minimizeWindow = (id: string): void => {
        if (windows[id].state === "open" || windows[id].state === "normal" || windows[id].state === "maximized") {
            windows[id].lastState = windows[id].state;
            windows[id].state = "minimized";
        } else if (windows[id].state === "minimized") {
            windows[id].state = windows[id].lastState;
            windows[id].lastState = "minimized";
        }

        setWindows(() => ({ ...windows }));
    };

    const maximizeWindow = (id: string): void => {
        if (windows[id].state === "maximized") {
            windows[id].lastState = "maximized";
            windows[id].state = "normal";
        } else {
            windows[id].lastState = windows[id].state;
            windows[id].state = "maximized";
        }
        setWindows(() => ({ ...windows }));
    };

    return <WindowsContext.Provider value={{ windows, clickWindow, openWindow, closeWindow, minimizeWindow, maximizeWindow }}>
        {children}
    </WindowsContext.Provider>
}

export const useWindows = (): WindowsContextType => {
    const context = useContext<WindowsContextType | null>(WindowsContext);

    if (context === null) {
        throw Error("useWindows must be inside a WindowsContextProvider.");
    }

    return context;
}