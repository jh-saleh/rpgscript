import { useCallback, useEffect, useRef } from "react";
import { useEditor } from "../hooks/Editor.hook";
import { LineInstructionLayout, LineNumberLayout, LineWrapperLayout } from "./style";

interface LineProps {
    line: number;
}

export const Line = ({ line }: LineProps) => {
    const { instructions, currentLineIndex, setCurrentLineIndex, updateCurrentLine, getInstruction, isCursorAtTheEndOfLine, setIsCursorAtTheEndOfLine, setCursorHorizontalPosition, cursorHorizontalPosition, setCursorHorizontalPositionDelta, setGoToNextLine } = useEditor();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(currentLineIndex);
        if (currentLineIndex === line) {
            ref.current?.focus();
            ref.current?.setSelectionRange(cursorHorizontalPosition, cursorHorizontalPosition);
        }
    }, [currentLineIndex, instructions.length]);

    const keyHandler = useCallback(() => {
        if (ref.current?.selectionStart === getInstruction(currentLineIndex ?? 0)?.length) {
            setGoToNextLine(() => isCursorAtTheEndOfLine);
        } else {
            setGoToNextLine(() => false);
        }
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(`line: ${line}`);
        console.log(`currentLineIndex: ${currentLineIndex ?? 0}`);
        console.log(`predicate: ${ref.current?.selectionStart === getInstruction(currentLineIndex ?? 0)?.length}`);
        console.log(`ref.current?.selectionStart: ${ref.current?.selectionStart}`);
        console.log(`getInstruction(currentLineIndex ?? 0)?.length: ${getInstruction(currentLineIndex ?? 0)?.length}`);
        setIsCursorAtTheEndOfLine(ref.current?.selectionStart === getInstruction(currentLineIndex ?? 0)?.length);
        setCursorHorizontalPositionDelta(() => (ref.current?.selectionStart ?? 0) - cursorHorizontalPosition);
        setCursorHorizontalPosition(() => ref.current?.selectionStart ?? 0);
    }, [currentLineIndex]);

    const preventUpDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "Tab") {
            event.preventDefault();
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
            ref.current?.blur();
        }
    }

    return <LineWrapperLayout onClick={() => setCurrentLineIndex(() => line)}>
        <LineNumberLayout>
            {line}
        </LineNumberLayout>
        <LineInstructionLayout
            ref={ref}
            value={getInstruction(line)}
            onChange={(e) => { updateCurrentLine(e.currentTarget.value, line); }}
            onClick={keyHandler}
            onKeyUp={keyHandler}
            onKeyDown={preventUpDownHandler} />
    </LineWrapperLayout>
}