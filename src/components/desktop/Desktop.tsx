import { useEffect } from "react";
import { CodeEditor } from "./Editor/CodeEditor";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Specifications } from "./Specifications/Specifications";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {

    useEffect(() => {
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout />
        <CodeEditor />
        <Specifications />
        <NavigationBar />
    </DesktopWrapperLayout>);
}