import { useEffect } from "react";
import { Window } from "../window/Window";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {

    useEffect(() => {
        console.log("Desktop")
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout />
        <Window id="rpgscript">
            <div>
                Wow such awesome and esoteric langage !
            </div>
        </Window>
        <Window id="rpgscriptspecs">
            <div>
                Wow such awesome and esoteric langage !
            </div>
        </Window>
        <NavigationBar />
    </DesktopWrapperLayout>);
}