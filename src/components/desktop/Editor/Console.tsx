import { useEffect, useRef } from "react";
import { ConsoleLayout } from "./style";

interface ConsoleProps {
    outputs: string[];
}

export const Console = ({ outputs }: ConsoleProps) => {
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef !== null && consoleRef.current !== null) {
            consoleRef.current?.scrollTo({ top: consoleRef.current?.scrollHeight });
            console.log(consoleRef.current?.scrollHeight);
        }
    }, [outputs.length]);


    return <ConsoleLayout>
        <div>
            Output
        </div>
        <div ref={consoleRef}>
            {outputs.map((output, index) => {
                return (<div key={`output_n°${index}`}>
                    {`C:\\rpgscript> ${output}`}
                </div>);
            })}
        </div>
    </ConsoleLayout>;
} 