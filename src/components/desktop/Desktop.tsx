import { useEffect } from "react";
import { useFocusApps } from "../hooks/FocusApps.hook";
import { useFocusWindows } from "../hooks/FocusWindows.hook";
import { useWindows } from "../hooks/Windows.hook";
import { App } from "./App/App";
import { CodeEditor } from "./Editor/CodeEditor";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Specifications } from "./Specifications/Specifications";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {
    const { clickWindow, openWindow } = useWindows();
    const { focusWindow } = useFocusWindows();
    const { unfocusApps } = useFocusApps();
    const portfolioURL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;
    const linkedinURL = process.env.NEXT_PUBLIC_LINKEDIN_URL;

    useEffect(() => {
        const startUpSound = new Audio("./windowsXP.mp3");
        startUpSound.play();
    }, []);

    const clickAppHandler = (id: string) => {
        clickWindow(id);
        focusWindow(id);
        openWindow(id);
    }

    return (<DesktopWrapperLayout>
        <BackgroundLayout onMouseDown={() => {
            focusWindow("background");
            unfocusApps();
        }}>
            <div>
                <App id="rpgscript" onDoubleClick={() => clickAppHandler("rpgscript")} >
                    <img src="./rpgscript.png" alt="rpgscript logo" />
                    <div>
                        RPG Script
                    </div>
                </App>
                <App id="rpgscriptspecs" onDoubleClick={() => clickAppHandler("rpgscriptspecs")} >
                    <img src="./rpgscriptspecs.png" alt="rpgscript specs logo" />
                    <div>
                        RPG Script Specs
                    </div>
                </App>
                <App id="portfolio" onDoubleClick={() => { window.open(portfolioURL, '_blank') }}>
                    <img src="./portfolio.png" alt="portfolio logo" />
                    <div>
                        Portfolio
                    </div>
                </App>
                <App id="linkedin" onDoubleClick={() => { window.open(linkedinURL, '_blank') }}>
                    <img src="./linkedin.png" alt="linkedin logo" />
                    <div>
                        LinkedIn
                    </div>
                </App>
            </div>
        </BackgroundLayout>
        <CodeEditor />
        <Specifications />
        <NavigationBar />
    </DesktopWrapperLayout>);
}