import { useFocusApps } from "@/components/hooks/FocusApps.hook";
import { useFocusWindows } from "@/components/hooks/FocusWindows.hook";
import { ReactNode } from "react";
import { AppLayout } from "./style";

interface AppProps {
    id: string;
    href?: string;
    onDoubleClick: () => void;
    children: ReactNode;
}

export const App = ({ id, href, onDoubleClick, children }: AppProps) => {
    const { apps, focusApp, unfocusApps } = useFocusApps();
    const { unfocusWindows } = useFocusWindows();

    return (<AppLayout
        href={href}
        target="_blank"
        onDoubleClick={() => {
            onDoubleClick();
            unfocusApps();
        }}
        onMouseDown={(e) => {
            e.stopPropagation();
            focusApp(id);
            unfocusWindows();
        }} $clicked={apps[id]}>
        {children}
    </AppLayout>);
}