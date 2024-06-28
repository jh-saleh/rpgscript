import styled, { css, keyframes } from "styled-components";

export const navBarHeight = 30;

const systemModalAnimation = () => {
    const keyframeAnimation = keyframes`
        0%{
            filter: grayscale(0);
        }
        100%{
            filter: grayscale(1);
        }
    `;

    return css`animation: ${keyframeAnimation} 2s linear forwards;`;
}

export const DesktopWrapperLayout = styled.div<{ $grayscale?: boolean }>(({ $grayscale }) => css`
height: 100dvh;
width: 100dvw;
display: grid;
grid-template-rows: auto ${navBarHeight}px;
z-index: 0;
filter: grayscale(0);
${$grayscale && systemModalAnimation()}
`);

export const BackgroundLayout = styled.div`
background-size: cover;
background-repeat: no-repeat;
background-image: url("./windowsBackground.jpeg");
width: 100dvw;
padding: 10px;
> div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-wrap: wrap;
    width: min-content;
    height: calc(100dvh - 60px);
}
`;