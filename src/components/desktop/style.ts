import styled from "styled-components";

export const navBarHeight = 30;

export const DesktopWrapperLayout = styled.div`
height: 100dvh;
width: 100dvw;
display: grid;
grid-template-rows: auto ${navBarHeight}px;
z-index: 0;
`;

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
}
`;