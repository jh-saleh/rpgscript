import { useEffect } from "react";
import { DesktopWrapperLayout } from "./style";

export const Desktop = () => {

    useEffect(() => {
        console.log("Desktop")
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>

    </DesktopWrapperLayout>);
}