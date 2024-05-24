import { useEffect } from "react";
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
        <NavigationBar />
    </DesktopWrapperLayout>);
}