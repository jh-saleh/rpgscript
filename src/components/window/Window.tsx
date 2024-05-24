import { ReactNode } from "react";
import { useWindows } from "../hooks/Windows.hook";
import { CloseButton, MainSection, MaximizeButton, MinimizeButton, TopLeftSection, TopRightSection, TopSection, WindowLayout } from "./style";



interface WindowProps {
    id: string;
    children: ReactNode;
}

export const Window = ({ id, children }: WindowProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow } = useWindows();
    const { state, position: { top, left }, size: { height, width }, label, path } = windows[id];

    return (<>
        {(state === "open" || state === "normal" || state === "maximized") &&
            <WindowLayout $left={left} $top={top} $width={width} $height={height} $state={state}>
                <TopSection>
                    <TopLeftSection>
                        <img src={path} alt={`${id} logo`} />
                        <div>
                            {label}
                        </div>
                    </TopLeftSection>
                    <TopRightSection>
                        <MinimizeButton onClick={() => minimizeWindow(id)} />
                        <MaximizeButton onClick={() => maximizeWindow(id)} />
                        <CloseButton onClick={() => closeWindow(id)} />
                    </TopRightSection>
                </TopSection>
                <MainSection>
                    {children}
                </MainSection>
            </WindowLayout>
        }
    </>)
}