import { useFocusApps } from "@/components/hooks/FocusApps.hook";
import { useFocusWindows } from "@/components/hooks/FocusWindows.hook";
import { useWindows } from "@/components/hooks/Windows.hook";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { StartUpMenu } from "../StartUpMenu/StartUpMenu";
import { AppLayout, AppsBarLayout, BarLayout, NavigationBarWrapper, StartButtonLayout, StatusLayout } from "./style";

export const NavigationBar = () => {
    const [time, setTime] = useState<string>("");
    const { windows, minimizeWindow } = useWindows();
    const { nodes, focusWindow } = useFocusWindows();
    const { unfocusApps } = useFocusApps();

    useEffect(() => {
        setTime(dayjs().format("HH:mm"));
        const intervalValue = setInterval(() => {
            setTime(dayjs().format("HH:mm"));
        }, 20 * 1000);

        return () => clearInterval(intervalValue);
    }, []);

    return (<>
        <NavigationBarWrapper onMouseDown={() => {
            focusWindow("navbar");
            unfocusApps();
        }}>
            <BarLayout >
                <StartButtonLayout onMouseDown={(event) => {
                    event.stopPropagation();
                    unfocusApps();
                    if (!nodes["startupmenu"]) {
                        focusWindow("startupmenu");
                    } else {
                        focusWindow("navbar");
                    }
                }}>
                    <img src="./navbar_nanosoft.svg" alt="start up logo" />
                    <div>
                        Start
                    </div>
                </StartButtonLayout>
                <div />
            </BarLayout>
            <AppsBarLayout>
                {Object.keys(windows).filter((id) => windows[id].state !== "closed")
                    .sort((id1, id2) => windows[id1].order - windows[id2].order)
                    .map((id, index) => <AppLayout key={`app_bar_${index}`} $state={windows[id].state} onClick={() => minimizeWindow(id)}>
                        <img src={windows[id].path} alt={`${id} logo`} />
                        <div>
                            {windows[id].label.length > 10 ? windows[id].label.slice(0, 19) + "..." : windows[id].label}
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
        <StartUpMenu />
    </>);
}