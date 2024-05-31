import { useDrag } from "@use-gesture/react";
import { ReactNode, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { navBarHeight } from "../desktop/style";
import { useFocusWindows } from "../hooks/FocusWindows.hook";
import { WindowPosition, useWindows } from "../hooks/Windows.hook";
import { Bar, Menu } from "./bar/Bar";
import { CloseButton, MainSection, MaximizeButton, MinimizeButton, TopLeftSection, TopRightSection, TopSection, WindowLayout } from "./style";

interface WindowProps {
    id: string;
    menu?: Menu;
    children: ReactNode;
}

export const Window = ({ id, menu, children }: WindowProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, clickWindow } = useWindows();
    const { state, position: { top, left }, size: { height, width }, label, path, zIndex } = windows[id];
    const [windowPos, setWindowPos] = useState<WindowPosition>({ top, left });
    const windowRef = useRef<HTMLDivElement>(null);
    const { nodes, getInFocus } = useFocusWindows();

    const [{ x, y }, api] = useSpring(() => ({
        x: 0,
        y: 0,
    }));

    const bind = useDrag(({ down, offset: [ox, oy] }) => {
        if (windowRef.current !== null) {
            const { width: windowWidth, height: windowHeight } = windowRef.current.getBoundingClientRect();
            if (down && state !== "maximized") {
                const leftWindow = Math.max(-left, Math.min(window.innerWidth - windowWidth - left, ox));
                const topWindow = Math.max(-top, Math.min(window.innerHeight - windowHeight - navBarHeight - top, oy));
                api.start({
                    x: leftWindow,
                    y: topWindow,
                    immediate: down,
                });
            }
        }
    }, { enabled: state !== "maximized" });

    return (
        <WindowLayout ref={windowRef}
            onMouseDown={() => {
                clickWindow(id);
                getInFocus(id);
            }}
            $width={width} $height={height}
            $top={top} $left={left}
            $state={state}
            style={{
                zIndex,
                x: x,
                y: y
            }}>
            <TopSection $isFocused={nodes[id]}>
                <TopLeftSection {...bind()}>
                    <img src={path} alt={`${id} logo`} />
                    <div>
                        {label}
                    </div>
                </TopLeftSection>
                <TopRightSection>
                    <MinimizeButton $isFocused={nodes[id]} onClick={() => minimizeWindow(id)} />
                    <MaximizeButton $isFocused={nodes[id]} onClick={() => {
                        if (state === "open" || state === "normal") {
                            setWindowPos({
                                top: y.get(),
                                left: x.get()
                            });
                            api.set({
                                x: 0,
                                y: 0
                            });
                        } else {
                            api.set({
                                x: windowPos.left,
                                y: windowPos.top
                            });
                        }
                        maximizeWindow(id);
                    }} />
                    <CloseButton $isFocused={nodes[id]} onClick={() => closeWindow(id)} />
                </TopRightSection>
            </TopSection>
            {menu && <Bar windowId={id} menu={menu} />}
            <MainSection $isFocused={nodes[id]}>
                {children}
            </MainSection>
        </WindowLayout>
    )
}