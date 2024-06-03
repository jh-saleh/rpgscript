import { useEffect } from "react";
import { useFocusApps } from "../hooks/FocusApps.hook";
import { useFocusWindows } from "../hooks/FocusWindows.hook";
import { useSystem } from "../hooks/System.hook";
import { useSystemModal } from "../hooks/SystemModal.hook";
import { useWindows } from "../hooks/Windows.hook";
import { App } from "./App/App";
import { CodeEditor } from "./Editor/CodeEditor";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Specifications } from "./Specifications/Specifications";
import { SystemModal } from "./SystemModal/SystemModal";
import { SystemButtonLayout } from "./SystemModal/style";
import { BackgroundLayout, DesktopWrapperLayout } from "./style";

export const Desktop = () => {
    const { clickWindow, openWindow } = useWindows();
    const { focusWindow } = useFocusWindows();
    const { unfocusApps } = useFocusApps();
    const { loggedIn, setShutdown } = useSystem();
    const { isLogOffModalOpen, closeLogOffModal, isShutOffModalOpen, closeShutOffModal } = useSystemModal();
    const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;
    const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;

    useEffect(() => {
        if (loggedIn) {
            const startUpSound = new Audio("./startup.mp3");
            startUpSound.play();
        }
    }, [loggedIn]);

    const clickAppHandler = (id: string) => {
        clickWindow(id);
        focusWindow(id);
        openWindow(id);
    }

    return (
        <>
            <DesktopWrapperLayout $grayscale={isLogOffModalOpen || isShutOffModalOpen}>
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
                        <App id="portfolio" onDoubleClick={() => { window.open(PORTFOLIO_URL, '_blank') }}>
                            <img src="./portfolio.png" alt="portfolio logo" />
                            <div>
                                Portfolio
                            </div>
                        </App>
                        <App id="linkedin" onDoubleClick={() => { window.open(LINKEDIN_URL, '_blank') }}>
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
            </DesktopWrapperLayout>
            <SystemModal label="Log Off Screens" open={isLogOffModalOpen} closeModal={closeLogOffModal} >
                <>
                    <SystemButtonLayout>
                        <img src="./switchuser.png" alt="switchuser logo" />
                        <div>
                            Switch User
                        </div>
                    </SystemButtonLayout>
                    <SystemButtonLayout>
                        <img src="./logoff.png" alt="logoff logo" />
                        <div>
                            Log Off
                        </div>
                    </SystemButtonLayout>
                </>
            </SystemModal>
            <SystemModal label="Shut Off Screens" open={isShutOffModalOpen} closeModal={closeShutOffModal} >
                <>
                    <SystemButtonLayout>
                        <img src="./standby.png" alt="stand by logo" />
                        <div>
                            Stand By
                        </div>
                    </SystemButtonLayout>
                    <SystemButtonLayout onClick={() => setShutdown(true)}>
                        <img src="./turnoff.png" alt="turn off logo" />
                        <div>
                            Turn Off
                        </div>
                    </SystemButtonLayout>
                    <SystemButtonLayout>
                        <img src="./restart.png" alt="restart logo" />
                        <div>
                            Restart
                        </div>
                    </SystemButtonLayout>
                </>
            </SystemModal>
        </>
    );
}