import { ReactNode } from "react";
import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useWindows } from "../hooks/Windows.hook";
import { CloseButton, MainSection, MaximizeButton, MinimizeButton, TopLeftSection, TopRightSection, TopSection, WindowLayout, navbarHeight } from "./style";

interface WindowProps {
    id: string;
    children: ReactNode;
}

export const Window = ({ id, children }: WindowProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, clickWindow } = useWindows();
    const { state, position: { top, left }, size: { height, width }, label, path, zIndex } = windows[id];

    const [{ x, y }, api] = useSpring(() => ({
        from: {
            x: top,
            y: left
        },
    }));

    const bind = useDrag(({ down, offset: [ox, oy] }) => {

        api.start({
            x: Math.min(Math.max(0, ox), window.innerWidth - width),
            y: Math.min(Math.max(0, oy), window.innerHeight - height - navbarHeight),
            immediate: down,
        });
    });

    return (<>
        {(state === "open" || state === "normal" || state === "maximized") &&
            <WindowLayout onMouseDown={() => { clickWindow(id); }}
                $width={width} $height={height}
                $state={state}
                style={{
                    zIndex,
                    x: state === "maximized" ? 0 : x,
                    y: state === "maximized" ? 0 : y
                }}>
                <TopSection {...bind()}>
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