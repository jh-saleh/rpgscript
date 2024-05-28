import { ReactNode } from "react";
import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useWindows } from "../hooks/Windows.hook";
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

    const [{ x, y }, api] = useSpring(() => ({}));

    const bind = useDrag(({ down, offset: [ox, oy] }) => {
        console.log(ox, oy);
        api.start({
            x: ox,
            y: oy,
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
                    x: state === "maximized" ? left : x,
                    y: state === "maximized" ? top : y
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
                {menu && <Bar menu={menu} />}
                <MainSection>
                    {children}
                </MainSection>
            </WindowLayout>
        }
    </>)
}