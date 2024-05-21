import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface EditorContextType {
    currentLineIndex: number | undefined;
    setCurrentLineIndex: Dispatch<SetStateAction<number | undefined>>;
    instructions: string[];
    setInstructions: Dispatch<SetStateAction<string[]>>;
    isCursorAtTheEndOfLine: boolean;
    setIsCursorAtTheEndOfLine: Dispatch<SetStateAction<boolean>>;
    cursorHorizontalPosition: number;
    setCursorHorizontalPosition: Dispatch<SetStateAction<number>>;
    cursorHorizontalPositionDelta: number;
    setCursorHorizontalPositionDelta: Dispatch<SetStateAction<number>>;
    couldGoToPreviousLineWithLeftArrow: boolean;
    setCouldGoToPreviousLineWithLeftArrow: Dispatch<SetStateAction<boolean>>;
    goToPreviousLineWithLeftArrow: boolean;
    setGoToPreviousLineWithLeftArrow: Dispatch<SetStateAction<boolean>>;
    couldGoToNextLineWithRightArrow: boolean;
    setCouldGoToNextLineWithRightArrow: Dispatch<SetStateAction<boolean>>;
    goToNextLineWithRightArrow: boolean;
    setGoToNextLineWithRightArrow: Dispatch<SetStateAction<boolean>>;
    goToNextLineWithDownArrow: boolean;
    setGoToNextLineWithDownArrow: Dispatch<SetStateAction<boolean>>;
    goToPreviousLineWithUpArrow: boolean;
    setGoToPreviousLineWithUpArrow: Dispatch<SetStateAction<boolean>>;
    setCurrentLine: (instruction: string, index: number) => void;
    updateCurrentLine: (instruction: string, index: number) => void;
    deleteCurrentLine: (line: number) => void;
    getInstruction: (line: number) => string | undefined;
}

const EditorContext = createContext<EditorContextType | null>(null);

interface EditorContextProviderProps {
    children: ReactNode;
}

export const EditorContextProvider = ({ children }: EditorContextProviderProps) => {
    const [currentLineIndex, setCurrentLineIndex] = useState<number | undefined>(undefined);
    const [instructions, setInstructions] = useState<string[]>([""]);
    const [isCursorAtTheEndOfLine, setIsCursorAtTheEndOfLine] = useState<boolean>(true);
    const [cursorHorizontalPosition, setCursorHorizontalPosition] = useState<number>(0);
    const [cursorHorizontalPositionDelta, setCursorHorizontalPositionDelta] = useState<number>(0);
    const [couldGoToPreviousLineWithLeftArrow, setCouldGoToPreviousLineWithLeftArrow] = useState<boolean>(false);
    const [goToPreviousLineWithLeftArrow, setGoToPreviousLineWithLeftArrow] = useState<boolean>(false);
    const [goToNextLineWithRightArrow, setGoToNextLineWithRightArrow] = useState<boolean>(false);
    const [couldGoToNextLineWithRightArrow, setCouldGoToNextLineWithRightArrow] = useState<boolean>(false);
    const [goToNextLineWithDownArrow, setGoToNextLineWithDownArrow] = useState<boolean>(false);
    const [goToPreviousLineWithUpArrow, setGoToPreviousLineWithUpArrow] = useState<boolean>(false);

    const setCurrentLine = (instruction: string, line: number): void => {
        instructions.splice(line, 0, instruction);
        setInstructions(() => [...instructions]);
    }

    const updateCurrentLine = (instruction: string, line: number): void => {
        instructions[line] = instruction;
        setInstructions(() => [...instructions]);
    }

    const getInstruction = (line: number): string | undefined => {
        return instructions.find((_, index) => index === line);
    }

    const deleteCurrentLine = (line: number): void => {
        instructions.splice(line, 1);
        setInstructions(() => [...instructions]);
    }

    return (<EditorContext.Provider value={{
        currentLineIndex, setCurrentLineIndex,
        instructions, setInstructions,
        isCursorAtTheEndOfLine, setIsCursorAtTheEndOfLine,
        cursorHorizontalPosition, setCursorHorizontalPosition,
        cursorHorizontalPositionDelta, setCursorHorizontalPositionDelta,
        couldGoToPreviousLineWithLeftArrow, setCouldGoToPreviousLineWithLeftArrow,
        goToPreviousLineWithLeftArrow, setGoToPreviousLineWithLeftArrow,
        couldGoToNextLineWithRightArrow, setCouldGoToNextLineWithRightArrow,
        goToNextLineWithRightArrow, setGoToNextLineWithRightArrow,
        goToNextLineWithDownArrow, setGoToNextLineWithDownArrow,
        goToPreviousLineWithUpArrow, setGoToPreviousLineWithUpArrow,
        setCurrentLine, updateCurrentLine, deleteCurrentLine,
        getInstruction
    }}>
        {children}
    </EditorContext.Provider>);
}

export const useEditor = (): EditorContextType => {
    const context = useContext(EditorContext);

    if (context === null) {
        throw Error("useEditor should be used inside a EditorContextProvider.");
    }

    return context;
}