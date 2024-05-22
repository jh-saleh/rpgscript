import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { BarLayout, NavigationBarWrapper, StartButtonLayout, StatusLayout } from "./NavigationBar/NavigationBar";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        console.log("Desktop")
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    useEffect(() => {
        setTime(dayjs().format("HH:mm"));
        const intervalValue = setInterval(() => {
            setTime(dayjs().format("HH:mm"));
        }, 20 * 1000);

        return () => clearInterval(intervalValue);
    }, []);

    return (<DesktopWrapperLayout>
        <BackgroundLayout />
        <NavigationBarWrapper>
            <BarLayout >
                <StartButtonLayout >
                    <img src="./navbar_nanosoft.svg" alt="start up logo" />
                    <div>
                        Start
                    </div>
                </StartButtonLayout>
                <div />
            </BarLayout>
            <StatusLayout>
                <img src={"./bluetooth.png"} alt={"danger icon"} />
                <img src={"./sound.png"} alt={"danger icon"} />
                <img src={"./danger.png"} alt={"danger icon"} />
                <div>
                    {time}
                </div>
            </StatusLayout>
        </NavigationBarWrapper>
    </DesktopWrapperLayout>);
}