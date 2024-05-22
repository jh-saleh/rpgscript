import styled, { css, keyframes } from "styled-components";

export const WindowsStartupWrapperLayout = styled.div`
height: 100dvh;
width: 100dvw;
background-color: black;
display: grid;
grid-template-rows: auto min-content;
font-size: xx-large;
user-select: none;
`;

export const WindowsStartupLayout = styled.div`
width: 100dvw;
background-color: black;
display: grid;
place-items: center;
`;

export const WindowsStartupCopyrightLayout = styled.div`
display: flex;
justify-content: space-between;
font-size: large;
padding: 7px;
> div:nth-child(2){
    font-weight: 700;
    font-style: italic;
}
`;

export const CompanyWrapperLayout = styled.div`
display: grid;
grid-template-columns: min-content min-content;
text-align: left;
align-items: end;
gap: 20px;
> div {
    font-size: 55px;
}
`;

export const ScreensWrapperLayout = styled.div`
font-size: 100px;
display: grid;
grid-template-columns: min-content min-content;
> div:first-child {
    font-weight: 600;
    font-style: italic;
}
> div:nth-child(2) {
    font-size: 60px;
    font-weight: 500;
    color: #cf5232;
}
`;

export const LoadingBarWrapperLayout = styled.div`
    display: grid;
    place-items: center;
    height: 20px;
    > div {
        height: 20px;
        width: 230px;
        position: relative;
        z-index: 0;
    }
`;

export const LoadingBarLayout = styled.div`
position: absolute;
top: 0px;
left: 0px;
z-index: 1;
border-radius: 5px;
border: 1px white solid;
background-color: transparent;
width: 230px;
height: 20px;
`;

export const blocAnimation = ($delay: number) => {
    const keyFrames = keyframes`
        0%{
            top: 0px;
            left: 1.5px;
        }
        100%{
            top: 0px;
            left: 210px;
        }
    `;

    return css`animation: ${keyFrames} 2s linear infinite; animation-delay: ${$delay}ms;`;
}

export const LoadingBlocs = styled.div<{ $delay: number }>(({ $delay }) => css`
${blocAnimation($delay)};
position: absolute;
z-index: 0;
border-radius: 2px;
top: 0px;
left: 1.5px;
width: 20px;
height: 20px;
background-color: #00b4f1;
`);