import styled from "styled-components";

export const WelcomeWrapperLayout = styled.div`
height: 100dvh;
width: 100dvw;
display: grid;
grid-template-rows: 1fr 3fr 1fr;
user-select: none;
> div:first-child {
    background-color: #00249d;
}
> div:nth-child(3) {
    background-color: #00249d;
}
`;

export const WelcomeContentLayout = styled.div`
display: flex;
width: 100dvw;
justify-content: space-between;
flex-direction: column;
background-color: #5480e7;
`;

export const BodyLayout = styled.div`
display: grid;
place-items: center;
`;

export const TopLineDecorationLayout = styled.div`
display: flex;
> div:first-child {
background-color: white;
width: 15dvw;
height: 0.5dvh;
border-bottom-left-radius: 100%;
}
> div:nth-child(2) {
background-color: white;
width: 80dvw;
height: 0.5dvh;
border-bottom-right-radius: 100%;
}
`;

export const BottomLineDecorationLayout = styled.div`
display: flex;
justify-content: end;
> div:first-child {
background-color: #e18a5b;
width: 15dvw;
height: 0.5dvh;
border-top-left-radius: 100%;
}
> div:nth-child(2) {
background-color: #e18a5b;
width: 80dvw;
height: 0.5dvh;
border-top-right-radius: 100%;
}
`;