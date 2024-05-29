import { useEffect, useState } from "react";
import { Desktop } from "../desktop/Desktop";
import { Loading } from "./loading/Loading";
import { Welcome } from "./welcome/Welcome";

export const Startup = () => {
    const [page, setPage] = useState<number>(0);
    const [intervalValue, setIntervalValue] = useState<NodeJS.Timeout>();

    useEffect(() => {
        setIntervalValue(() => setInterval(() => {
            setPage((page) => page + 1);
        }, 100));
    }, []);

    useEffect(() => {
        if (page === 2) {
            clearInterval(intervalValue);
        }
    }, [page]);

    return (<>
        {page === 0 ? <Loading /> :
            page === 1 ? <Welcome /> : <Desktop />
        }
    </>);
}