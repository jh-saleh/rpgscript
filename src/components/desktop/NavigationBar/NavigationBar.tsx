import { useWindows } from "@/components/hooks/Windows.hook";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { StartUpMenu } from "../StartUpMenu/StartUpMenu";
import { AppLayout, AppsBarLayout, BarLayout, NavigationBarWrapper, StartButtonLayout, StatusLayout } from "./style";

export const NavigationBar = () => {
    const [time, setTime] = useState<string>("");
    const [openStartMenu, setOpenStartMenu] = useState<boolean>(false);
    const { windows, minimizeWindow } = useWindows();

    useEffect(() => {
        setTime(dayjs().format("HH:mm"));
        const intervalValue = setInterval(() => {
            setTime(dayjs().format("HH:mm"));
        }, 20 * 1000);

        return () => clearInterval(intervalValue);
    }, []);

    return (<>
        <NavigationBarWrapper>
            <BarLayout >
                <StartButtonLayout onClick={() => setOpenStartMenu((value) => !value)}>
                    <img src="./navbar_nanosoft.svg" alt="start up logo" />
                    <div>
                        Start
                    </div>
                </StartButtonLayout>
                <div />
            </BarLayout>
            <AppsBarLayout>
                {Object.keys(windows).filter((id) => windows[id].state !== "closed").map((id, index) => <AppLayout key={`app_bar_${index}`} $state={windows[id].state} onClick={() => minimizeWindow(id)}>
                    <img src={windows[id].path} alt={`${id} logo`} />
                    <div>
                        {windows[id].label}
                    </div>
                </AppLayout>)}
            </AppsBarLayout>
            <StatusLayout>
                <img src={"./bluetooth.png"} alt={"danger icon"} />
                <img src={"./sound.png"} alt={"danger icon"} />
                <img src={"./danger.png"} alt={"danger icon"} />
                <div>
                    {time}
                </div>
            </StatusLayout>
        </NavigationBarWrapper>
        <StartUpMenu open={openStartMenu} closeMenu={() => setOpenStartMenu(false)} />
    </>);
}