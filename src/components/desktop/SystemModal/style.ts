import styled, { css } from "styled-components";

export const ModalWrapperLayout = styled.div(() => css`
width: 100dvw;
height: 100dvh;
display: grid;
place-items: center;
position: absolute;
top: 0px;
left: 0px;
z-index: 2;
user-select: none;
`);

export const ModalLayout = styled.div`
filter: grayscale(0);
width: 300px;
display: grid;
grid-template-rows: 50px 120px 50px;
border: 1px black solid;
filter: grayscale(0) !important;
`;

export const TopSectionLayout = styled.div`
background-color: rgb(9, 33, 120);
width: 100%;
display: flex;
justify-content: space-between;
place-items: center;
padding: 10px;
> div {
    color: white;
    font-size: large;
}
> img {
    width: 35px;
    height: 35px;
}
`;

export const BodySectionLayout = styled.div`
background: linear-gradient(to right, rgb(51, 73, 224) 0%, rgb(97, 126, 230) 47%, rgb(97, 126, 230) 53%, rgb(51, 73, 224) 100%);
display: flex;
place-items: center;
justify-content: space-evenly;
&::before {
    background: linear-gradient(to right, transparent 0px, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.3) 60%, transparent 100%);
    position: absolute;
    display: block;
    content: "";
    top: 0px;
    left: 0px;
    right: 0px;
}
`;

export const BottomSectionLayout = styled.div`
width: 100%;
height: 100%;
background-color: rgb(9, 33, 120);
display: flex;
align-items: center;
flex-direction: row-reverse;
`;

export const ButtonLayout = styled.button`
background-color: white;
color: black;
padding: 2px 7px ;
margin-right: 10px;
height: min-content;
font-size: 11px;
border: none;
box-shadow: rgb(0, 5, 176) 2px 2px 4px 1px, white 2px 2px 2px 0px, skyblue 0px 0px 0px 1px inset, skyblue 2px -2px inset;
&:hover {
    box-shadow: black 1px 1px, white 1px 1px 2px 0px, orange 0px 0px 0px 1px inset, orange 2px -2px inset;
}
`;

export const SystemButtonLayout = styled.div`
cursor: pointer;
display: grid;
grid-template-rows: min-content max-content;
gap: 7px;
place-items: center;
> img {
    height: 30px;
    width: 30px;
}
> div {
    font-size: small;
    font-weight: 500;
}

`;