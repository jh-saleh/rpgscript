import { useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/Editor.hook";
import { LineInstructionLayout, LineNumberLayout, LineWrapperLayout } from "./style";

interface LineProps {
    line: number;
}

export const Line = ({ line }: LineProps) => {
    const { instructions, currentLineIndex, setCurrentLineIndex, updateCurrentLine,
        getInstruction, isCursorAtTheEndOfLine, setIsCursorAtTheEndOfLine, setCursorHorizontalPosition,
        cursorHorizontalPosition, setCursorHorizontalPositionDelta,
        setCouldGoToPreviousLineWithLeftArrow,
        setCouldGoToNextLineWithRightArrow,
        goToPreviousLineWithLeftArrow, setGoToPreviousLineWithLeftArrow,
        goToNextLineWithRightArrow, setGoToNextLineWithRightArrow,
        goToNextLineWithDownArrow, setGoToNextLineWithDownArrow,
        goToPreviousLineWithUpArrow, setGoToPreviousLineWithUpArrow } = useEditor();
    const ref = useRef<HTMLInputElement>(null);

    const [runFunctionUpdateEditorStatesHandler, setRunFonctionUpdateEditorStatesHandler] = useState<boolean>(false);

    useEffect(() => {
        if (currentLineIndex === line) {
            //console.log("useEffect called from currentLineIndex");
            ref.current?.focus();
            updateEditorStatesHandler();
        }
    }, [currentLineIndex]);

    useEffect(() => {
        if ((goToNextLineWithDownArrow || goToPreviousLineWithUpArrow || goToNextLineWithRightArrow || goToPreviousLineWithLeftArrow) && currentLineIndex === line) {
            //console.log("currentLineIndex,", currentLineIndex);
            //console.log(`goToNextLineWithDownArrow: ${goToNextLineWithDownArrow}`);
            //console.log(`goToPreviousLineWithUpArrow: ${goToPreviousLineWithUpArrow}`);
            //console.log(`goToNextLineWithRightArrow: ${goToNextLineWithRightArrow}`);
            //console.log(`goToPreviousLineWithLeftArrow: ${goToPreviousLineWithLeftArrow}`);
            ref.current?.focus();
            ref.current?.setSelectionRange(cursorHorizontalPosition, cursorHorizontalPosition);
            setGoToNextLineWithDownArrow(() => false);
            setGoToPreviousLineWithUpArrow(() => false);
            setGoToNextLineWithRightArrow(() => false);
            setGoToPreviousLineWithLeftArrow(() => false);
        }
    }, [goToNextLineWithDownArrow, goToPreviousLineWithUpArrow, goToNextLineWithRightArrow, goToPreviousLineWithLeftArrow, currentLineIndex]);

    useEffect(() => {
        if (currentLineIndex === line) {
            //console.log("useEffect called from runFunctionUpdateEditorStatesHandler");
            updateEditorStatesHandler();
        }
    }, [runFunctionUpdateEditorStatesHandler, currentLineIndex]);

    const updateEditorStatesHandler = (debug: boolean = false) => {
        if (debug) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(`keyHandler called with ${line}.`);
            console.log(`line: ${line}`);
            console.log(`currentLineIndex: ${line}`);
            console.log(`predicate: ${ref.current?.selectionStart === getInstruction(line)?.length}`);
            console.log(`ref.current?.selectionStart: ${ref.current?.selectionStart}`);
            console.log(`getInstruction(line)?.length: ${getInstruction(line)?.length}`);
        }
        setCouldGoToNextLineWithRightArrow(() => ref.current?.selectionStart === getInstruction(line)?.length);
        setCouldGoToPreviousLineWithLeftArrow(() => ref.current?.selectionStart === 0);
        setIsCursorAtTheEndOfLine(ref.current?.selectionStart === getInstruction(line)?.length);
        setCursorHorizontalPositionDelta(() => (ref.current?.selectionStart ?? 0) - cursorHorizontalPosition);
        setCursorHorizontalPosition(() => ref.current?.selectionStart ?? 0);
    };

    const preventUpDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "Tab") {
            event.preventDefault();
        }

        if (event.key === 'Escape' || event.key === 'Esc') {
            ref.current?.blur();
        }

        //if (event.repeat) {
        //    return;
        //}
    }

    return <LineWrapperLayout onClick={() => setCurrentLineIndex(() => line)}>
        <LineNumberLayout>
            {line}
        </LineNumberLayout>
        <LineInstructionLayout
            ref={ref}
            value={getInstruction(line)}
            onChange={(e) => { updateCurrentLine(e.currentTarget.value, line); }}
            onClick={() => setRunFonctionUpdateEditorStatesHandler((value) => !value)}
            onKeyUp={(event) => {
                event.preventDefault();
                console.log(event.code)
                setRunFonctionUpdateEditorStatesHandler((value) => !value)
            }}
            onKeyDown={preventUpDownHandler} />
    </LineWrapperLayout>
}