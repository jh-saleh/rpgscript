import { useEditor } from "../hooks/Editor.hook";
import { Line } from "./Line";
import { StatusBar } from "./StatusBar";
import { EditorLayout } from "./style";

interface EditorProps {
    maxNbLines?: number;
}

export const Editor = ({ maxNbLines = 300 }: EditorProps) => {
    const { currentLineIndex, setCurrentLineIndex, instructions, cursorHorizontalPositionDelta, setCurrentLine, updateCurrentLine, deleteCurrentLine, isCursorAtTheEndOfLine, cursorHorizontalPosition, setCursorHorizontalPosition, getInstruction, goToNextLine, setGoToNextLine } = useEditor();

    const keystrokeHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (currentLineIndex !== undefined && event.key === 'Enter') {
            if (maxNbLines > instructions.length) {
                const currentInstruction = getInstruction(currentLineIndex);
                if (isCursorAtTheEndOfLine) {
                    setCurrentLine("", currentLineIndex + 1);
                } else {
                    updateCurrentLine(currentInstruction?.slice(0, cursorHorizontalPosition) ?? "", currentLineIndex);
                    setCurrentLine(currentInstruction?.slice(cursorHorizontalPosition, currentInstruction.length) ?? "", currentLineIndex + 1);
                }
                setCursorHorizontalPosition(0);
                setCurrentLineIndex((currentLineIndex) => (currentLineIndex ?? 0) + 1);
            }
        }
        if (currentLineIndex !== undefined && event.key === 'ArrowUp') {
            if (currentLineIndex > 0) {
                setCurrentLineIndex((currentLineIndex) => (currentLineIndex ?? 0) - 1);
            }
        }
        if (currentLineIndex !== undefined && event.key === 'ArrowDown') {
            if (currentLineIndex < instructions.length - 1) {
                setCurrentLineIndex((currentLineIndex) => (currentLineIndex ?? 0) + 1);
            }
        }
        if (currentLineIndex !== undefined && event.key === 'ArrowRight') {
            if (goToNextLine && currentLineIndex < instructions.length - 1) {
                setGoToNextLine(() => false);
                setCurrentLineIndex((currentLineIndex) => (currentLineIndex ?? 0) + 1);
                setCursorHorizontalPosition(() => 0);
            }
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
            setCurrentLineIndex(undefined);
        }
        if (currentLineIndex !== undefined && event.key === 'Backspace') {
            if (cursorHorizontalPositionDelta === 0 && cursorHorizontalPosition === 0 && currentLineIndex > 0) {
                const newLine: string = (getInstruction(currentLineIndex - 1) ?? "") + (getInstruction(currentLineIndex) ?? "");
                setCursorHorizontalPosition(() => (getInstruction(currentLineIndex - 1) ?? "").length);
                updateCurrentLine(newLine, currentLineIndex - 1);
                deleteCurrentLine(currentLineIndex);
                setCurrentLineIndex((currentLineIndex) => (currentLineIndex ?? 0) - 1);
            }
        }
        if (currentLineIndex !== undefined && event.key === 'Delete') {
            if (cursorHorizontalPosition === (getInstruction(currentLineIndex) ?? "").length && currentLineIndex < instructions.length - 1) {
                const cursorPosition = (getInstruction(currentLineIndex) ?? "").length;
                const newLine: string = (getInstruction(currentLineIndex) ?? "") + (getInstruction(currentLineIndex + 1) ?? "");
                setCursorHorizontalPosition(() => cursorPosition);
                updateCurrentLine(newLine, currentLineIndex);
                deleteCurrentLine(currentLineIndex + 1);
            }
        }
    }

    return (
        <EditorLayout onKeyUp={keystrokeHandler}>
            {instructions.map((_, index) => <Line key={`editor_line_${index}`} line={index} />)}
            {/*instructions.join(" / ")*/}
            <StatusBar />
            <div>
                {`goToNextLine : ${goToNextLine}`}
            </div>
            {`isCursorAtTheEndOfLine : ${isCursorAtTheEndOfLine.toString()}`}
        </EditorLayout>
    );
}