import { useEditor } from "../hooks/Editor.hook";
import { StatusBarCoordinatesLayout, StatusBarLayout } from "./style";

export const StatusBar = () => {
    const { currentLineIndex, cursorHorizontalPosition } = useEditor();

    return <StatusBarLayout>
        <StatusBarCoordinatesLayout>
            <div>
                Ln
            </div>
            <div>
                {currentLineIndex},
            </div>
            <div>
                Col
            </div>
            <div>
                {cursorHorizontalPosition}
            </div>
        </StatusBarCoordinatesLayout>
    </StatusBarLayout>
}