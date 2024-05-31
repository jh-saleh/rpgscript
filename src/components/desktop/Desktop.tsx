import { useEffect } from "react";
import { useFocusWindows } from "../hooks/FocusWindows.hook";
import { CodeEditor } from "./Editor/CodeEditor";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Specifications } from "./Specifications/Specifications";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {
    const { getInFocus } = useFocusWindows();

    useEffect(() => {
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout onMouseDown={() => getInFocus("background")} />
        <CodeEditor />
        <Specifications />
        <NavigationBar />
    </DesktopWrapperLayout>);
}