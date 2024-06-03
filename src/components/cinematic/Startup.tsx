import { useEffect, useState } from "react";
import { Desktop } from "../desktop/Desktop";
import { useSystem } from "../hooks/System.hook";
import { Loading } from "./Loading/Loading";
import { LoggingOff } from "./LoggingOff/LoggingOff";
import { Welcome } from "./Welcome/Welcome";

export const Startup = () => {
    const [page, setPage] = useState<number>(0);
    const [intervalValue, setIntervalValue] = useState<NodeJS.Timeout>();
    const delay = Number(process.env.NEXT_PUBLIC_STARTUP_DELAY);
    const { shutdown, loggedIn } = useSystem();

    useEffect(() => {
        setIntervalValue(() => setInterval(() => {
            setPage((page) => page + 1);
        }, delay));
    }, []);

    useEffect(() => {
        if (page === 1) {
            clearInterval(intervalValue);
        }
    }, [page]);

    useEffect(() => {
        if (shutdown || loggedIn) {
            setPage((page) => page + 1);
        }
    }, [shutdown, loggedIn]);

    return (<>
        {page === 0 ? <Loading /> :
            page === 1 ? <Welcome /> :
                page === 2 ? <Desktop /> : <LoggingOff />
        }
    </>);
}