import { useEffect, useState } from "react";
import { Desktop } from "../desktop/Desktop";
import { useSystem } from "../hooks/System.hook";
import { Loading } from "./loading/Loading";
import { BlueScreen } from "./welcome/Welcome";

export const Startup = () => {
    const [page, setPage] = useState<number>(0);
    const [intervalValue, setIntervalValue] = useState<NodeJS.Timeout>();
    const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "";
    const delay = Number(process.env.NEXT_PUBLIC_STARTUP_DELAY);
    const { shutdown } = useSystem();

    useEffect(() => {
        setIntervalValue(() => setInterval(() => {
            setPage((page) => page + 1);
        }, delay));
    }, []);

    useEffect(() => {
        console.log("page updated");
        if (page === 2) {
            clearInterval(intervalValue);
        }
        if (page === 5) {
            clearInterval(intervalValue);
            setTimeout(() => {
                window.location.href = PORTFOLIO_URL;
            }, 1000);
        }
    }, [page]);

    useEffect(() => {
        if (shutdown) {
            setIntervalValue(() => setInterval(() => {
                setPage((page) => page + 1);
            }, 1050));
            const startUpSound = new Audio("./shutdown.mp3");
            startUpSound.play();
        }
    }, [shutdown]);

    return (<>
        {page === 0 ? <Loading /> :
            page === 1 ? <BlueScreen label="welcome" /> :
                page === 2 ? <Desktop /> :
                    page === 3 ? <BlueScreen label="Logging off..." /> :
                        page === 4 ? <BlueScreen label="Saving your settings..." /> :
                            <BlueScreen label="Screens is shutting down." />
        }
    </>);
}