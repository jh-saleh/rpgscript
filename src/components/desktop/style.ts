import styled from "styled-components";

export const DesktopWrapperLayout = styled.div`
height: 100dvh;
width: 100dvw;
display: grid;
grid-template-rows: auto 30px;
position: relative;
z-index: 0;
`;

export const BackgroundLayout = styled.div`
background-size: cover;
background-repeat: no-repeat;
background-image: url("./windowsBackground.jpeg");
width: 100dvw;
`;