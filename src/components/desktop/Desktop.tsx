import { useEffect } from "react";
import { BarLayout, NavigationBarWrapper, StartButtonLayout, StatusLayout } from "./NavigationBar/NavigationBar";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {

    useEffect(() => {
        console.log("Desktop")
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout />
        <NavigationBarWrapper>
            <StartButtonLayout />
            <BarLayout >
                <div />
                <div />
            </BarLayout>
            <StatusLayout />
        </NavigationBarWrapper>
    </DesktopWrapperLayout>);
}