import styled from "styled-components";

export const AppLayout = styled.a<{ $clicked: boolean }>(({ $clicked }) => `
user-select: none;
width: min-content;
display: grid;
grid-template-rows: 50px 30px;
cursor: pointer;
place-items: center;
> img {
    width: 40px;
    height: 40px;
    opacity: ${$clicked ? "0.5" : "1"};
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