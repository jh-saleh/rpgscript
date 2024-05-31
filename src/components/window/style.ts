import { animated } from "react-spring";
import styled, { css } from "styled-components";
import { WindowState } from "../hooks/Windows.hook";

export const navbarHeight = 30;

const setWindowSize = ($width: number, $height: number, $left: number, $top: number, $state: WindowState) => {
    if ($state === "maximized") {
        return css`
            min-width: 100dvw;
            min-height: calc(100dvh - ${navbarHeight}px);`;
    } else {
        return css`
            top: ${$top}px;
            left: ${$left}px;
            min-width: ${$width}px;
            width: ${$width}px;
            min-height: ${$height}px;`
    }
}

export const WindowLayout = styled(animated.div)<{ $width: number, $height: number, $left: number, $top: number, $state: WindowState }>(({ $width, $height, $left, $top, $state }) => css`
    ${setWindowSize($width, $height, $left, $top, $state)}
    z-index: 1;
    position: absolute;
    user-select: none;
    display: ${$state === "open" || $state === "normal" || $state === "maximized" ? "flex" : "none"};
    flex-direction: column;
    touch-action: 'none';
`);

const backgroundGradientTopSection = ($isFocused: boolean) => {
    if ($isFocused) {
        return css`background: linear-gradient(rgb(0, 88, 238) 0%, rgb(53, 147, 255) 4%, rgb(40, 142, 255) 6%, rgb(18, 125, 255) 8%, rgb(3, 111, 252) 10%, rgb(2, 98, 238) 14%, rgb(0, 87, 229) 20%, rgb(0, 84, 227) 24%, rgb(0, 85, 235) 56%, rgb(0, 91, 245) 66%, rgb(2, 106, 254) 76%, rgb(0, 98, 239) 86%, rgb(0, 82, 214) 92%, rgb(0, 64, 171) 94%, rgb(0, 48, 146) 100%);`;
    } else {
        return css`background: linear-gradient(rgb(118, 151, 231) 0%, rgb(126, 158, 227) 3%, rgb(148, 175, 232) 6%, rgb(151, 180, 233) 8%, rgb(130, 165, 228) 14%, rgb(124, 159, 226) 17%, rgb(121, 150, 222) 25%, rgb(123, 153, 225) 56%, rgb(130, 169, 233) 81%, rgb(128, 165, 231) 89%, rgb(123, 150, 225) 94%, rgb(122, 147, 223) 97%, rgb(171, 186, 227) 100%);`;
    };
}

export const TopSection = styled.div<{ $isFocused: boolean }>(({ $isFocused }) => `
    display: flex;
    justify-content: space-between;
    cursor: grab;
    ${backgroundGradientTopSection($isFocused)}
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    touch-action: 'none';
`);

export const TopLeftSection = styled(animated.div)`
display: grid;
grid-template-columns: repeat(2, max-content);
gap: 2px;
padding: 3px;
align-items: center;
width: 100%;
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

export const MinimizeButton = styled(TopButton)<{ $isFocused: boolean }>(({ $isFocused }) => `
${$isFocused ? css`opacity: 1;` : css`opacity: 0.6;`}
&:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 4px;
    height: 2.5px;
    width: 8px;
    background-color: white;
}
`);

export const MaximizeButton = styled(TopButton)<{ $isFocused: boolean }>(({ $isFocused }) => `
${$isFocused ? css`opacity: 1;` : css`opacity: 0.6;`}
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
`);

export const CloseButton = styled.div<{ $isFocused: boolean }>(({ $isFocused }) => `
${$isFocused ? css`opacity: 1;` : css`opacity: 0.6;`}
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
`);

export const MainSection = styled.div<{ $isFocused: boolean }>(({ $isFocused }) => `
    flex-grow: 1;
    z-index: 0;
    background-color: white;
    color: black;
    width: 100%;
    border-left: 2px ${$isFocused ? "#0831d9" : "#6582f5"} solid;
    border-right: 2px ${$isFocused ? "#0831d9" : "#6582f5"} solid;
    border-bottom: 2px ${$isFocused ? "#0831d9" : "#6582f5"} solid;
`);