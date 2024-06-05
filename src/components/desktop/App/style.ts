import styled, { css } from "styled-components";

export const AppLayout = styled.a<{ $clicked: boolean }>(({ $clicked }) => `
user-select: none;
width: min-content;
display: grid;
grid-template-rows: 50px 30px;
cursor: pointer;
place-items: center;
color: white;
> img {
    width: 40px;
    height: 40px;
    ${$clicked && css`filter: grayscale(32%); opacity: 0.8;`}
}
> div {
    width: 100px;
    text-align: center;
    font-size: small;
    text-shadow: 1px 1px black;
    background-color: ${$clicked ? "#0b61ff" : "transparent"};
    padding: 3px;
}
`);