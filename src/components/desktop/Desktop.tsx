import { useEffect } from "react";
import { Window } from "../window/Window";
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {

    useEffect(() => {
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout />
        <CodeEditor />
        <Window id="rpgscriptspecs">
            <div>
                Wow such awesome and esoteric langage !
            </div>
        </Window>
        <NavigationBar />
    </DesktopWrapperLayout>);
}