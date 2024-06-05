import { WindowState } from "@/components/hooks/Windows.hook";
import styled, { css } from "styled-components";

const consoleHeight = 249;
const breakPointMaxHeight = "(max-height: 660px)";

export const EditorWrapperLayout = styled.div`
display: grid;
grid-template-rows: 1fr ${consoleHeight}px;
@media ${breakPointMaxHeight} {
    grid-template-rows: 1fr 100px;
}
`;

export const EditorLayout = styled.div<{ $state: WindowState }>(({ $state }) => css`
    height: ${$state === "maximized" ? css`calc(100dvh - 330px)` : '330px'};
    @media ${breakPointMaxHeight} {
        height: calc(100dvh - 180px);
    }
`);

export const ConsoleLayout = styled.div`
border: 1px #d0d0d0 solid;
background-color: #edebda;
width: 100%;
height: ${consoleHeight}px;
@media ${breakPointMaxHeight} {
    height: 100px;
}
gap: 5px;
> div:first-child {
    padding: 5px 3px;
    font-size: small;
}
> div:nth-child(2) {
    height: 220px;
    @media ${breakPointMaxHeight} {
        height: 72px;
    }
    border: 1px #d0d0d0 solid;
    padding: 5px;
    background-color: #edebda;
    overflow-y: auto;
    display: flex;
    flex-direction: column;    
    gap: 5px;
}
> div:nth-child(2) > div {
    font-size: smaller;
    user-select: text;
    line-break: anywhere;
}
`;