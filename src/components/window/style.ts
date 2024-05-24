import { animated } from "react-spring";
import styled, { css, keyframes } from "styled-components";
import { WindowState } from "../hooks/Windows.hook";

export const navbarHeight = 54;

const windowAnimation = ($width: number, $height: number, $state: WindowState) => {
    if ($state === "normal" || $state === "maximized") {

        const keyframe = keyframes`
        0%{
            width: ${$width}px;
            height: ${$height}px;
        }
        100%{
            width: 100dvw;
            height: calc(100dvh - ${navbarHeight}px);
        }
        `;

        return css`animation: ${keyframe} 0s linear forwards ${$state === "normal" ? "reverse" : ""};`;
    }
    return css``;
}

export const WindowLayout = styled(animated.div)<{ $width: number, $height: number, $state: WindowState }>(({ $width, $height, $state }) => css`
    ${windowAnimation($width, $height, $state)}
    z-index: 1;
    min-width: ${$width}px;
    height: ${$height}px;
    position: absolute;
    user-select: none;
`);

export const TopSection = styled(animated.div)`
    display: flex;
    justify-content: space-between;
    cursor: grab;
    background: linear-gradient(rgb(0, 88, 238) 0%, rgb(53, 147, 255) 4%, rgb(40, 142, 255) 6%, rgb(18, 125, 255) 8%, rgb(3, 111, 252) 10%, rgb(2, 98, 238) 14%, rgb(0, 87, 229) 20%, rgb(0, 84, 227) 24%, rgb(0, 85, 235) 56%, rgb(0, 91, 245) 66%, rgb(2, 106, 254) 76%, rgb(0, 98, 239) 86%, rgb(0, 82, 214) 92%, rgb(0, 64, 171) 94%, rgb(0, 48, 146) 100%);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`;

export const TopLeftSection = styled.div`
display: grid;
grid-template-columns: repeat(2, max-content);
gap: 2px;
padding: 3px;
align-items: center;
> div {
    font-size: small;
    text-shadow: 1px 1px black;
    color: white;
}
> img {
    height: 20px;
    width: 20px;
}
`;

export const TopRightSection = styled.div`
padding: 3px;
display: grid;
grid-template-columns: repeat(3, max-content);
gap: 2px;
align-items: center;
`;

export const TopButton = styled.div`
cursor: pointer;
height: 20px;
width: 20px;
border: 1px white solid;
box-shadow: rgb(70, 70, 255) 0px -1px 2px 1px inset;
background-image: radial-gradient(circle at 90% 90%, rgb(0, 84, 233) 0%, rgb(34, 99, 213) 55%, rgb(68, 121, 228) 70%, rgb(163, 187, 236) 90%, white 100%);
border-radius: 2px;
position: relative;
&:hover {
    filter: brightness(115%);
}
`;

export const MinimizeButton = styled(TopButton)`
&:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 4px;
    height: 2.5px;
    width: 8px;
    background-color: white;
}
`;

export const MaximizeButton = styled(TopButton)`
&:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    height: 8px;
    width: 10px;
    background-color: transparent;
    border: 3px white solid;
    border-right: 1px white solid;
    border-left: 1px white solid;
    border-bottom: 1px white solid;
}
`;

export const CloseButton = styled.div`
cursor: pointer;
height: 20px;
width: 20px;
border: 1px white solid;
box-shadow: rgb(218, 70, 0) 0px -1px 2px 1px inset;
background-image: radial-gradient(circle at 90% 90%, rgb(204, 70, 0) 0%, rgb(220, 101, 39) 55%, rgb(205, 117, 70) 70%, rgb(255, 204, 178) 90%, white 100%);
border-radius: 2px;
position: relative;
&:hover {
    filter: brightness(115%);
}
&:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 1px;
    height: 2px;
    width: 16px;
    transform: rotate(45deg);
    background-color: white;
}
&:after {
    content: '';
    position: absolute;
    top: 8px;
    left: 1px;
    height: 2px;
    width: 16px;
    transform: rotate(-45deg);
    background-color: white;
}
`;

export const MainSection = styled.div`
    background-color: white;
    color: black;
    height: 100%;
    width: 100%;
    border-left: 2px #0831d9 solid;
    border-right: 2px #0831d9 solid;
    border-bottom: 2px #0831d9 solid;
`;