import Image from "next/image";
import { useEffect, useState } from "react";
import { BlueScreen } from "../BlueLoading/BlueLoading";
import { CompanyWrapperLayout, LoggingOffLayout, LogoLayout, ScreensWrapperLayout, TextLayout } from "./style";

export const LoggingOff = () => {
    const [texts, _setTexts] = useState<string[]>(["Logging off...", "Saving your settings...", "Screens is shutting down."]);
    const [intervalValue, setIntervalValue] = useState<NodeJS.Timeout>();
    const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "";
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        setIntervalValue(() => setInterval(() => {
            setPage((page) => page + 1);
        }, 800));
    }, []);

    useEffect(() => {
        if (page === 0) {
            const startUpSound = new Audio("./shutdown.mp3");
            startUpSound.play();
        }
        if (page === 2) {
            setTimeout(() => {
                window.location.href = PORTFOLIO_URL;
            }, 800);
            clearInterval(intervalValue);
        }
    }, [page]);

    return <BlueScreen>
        <LoggingOffLayout>
            <div>
                <LogoLayout>
                    <CompanyWrapperLayout>
                        <div>
                            Nanosoft
                        </div>
                        <Image src={"./nanosoft.svg"} alt="Nanosoft image" width={110} height={100} />
                    </CompanyWrapperLayout>
                    <ScreensWrapperLayout>
                        <div>
                            Screens
                        </div>
                        <div>
                            xp
                        </div>
                    </ScreensWrapperLayout>
                </LogoLayout>
                <TextLayout>
                    {texts[page]}
                </TextLayout>
            </div>
        </LoggingOffLayout>
    </BlueScreen>
}