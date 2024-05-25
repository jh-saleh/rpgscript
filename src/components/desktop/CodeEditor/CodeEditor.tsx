import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { Window } from "../../window/Window";
import { ConsoleLayout } from './style';

export const CodeEditor = () => {
    const [results, setResults] = useState<string[]>(["wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "hello world"])
    const code = `const car = 3;`
    const options = {
        selectOnLineNumbers: true,
        smoothScrolling: false,
        minimap: { enabled: false },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
    };
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef !== null && consoleRef.current !== null) {
            consoleRef.current?.scrollTo({ top: consoleRef.current?.scrollHeight });
        }
    }, [results.length]);

    return <Window id="rpgscript" menu={{
        "Run": {
            onClick: () => console.log("Code running.")
        }
    }}>
        <Editor
            height={400}
            width={800}
            language="javascript"
            theme="vs-light"
            value={code}
            options={options}
        />
        <ConsoleLayout ref={consoleRef}>
            <div>
                Output
            </div>
            <div>
                {results.map((result) => {
                    return (<div>
                        ${result}
                    </div>);
                })}
            </div>
        </ConsoleLayout>
    </Window>;
}