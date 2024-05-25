import styled from "styled-components";

export const ConsoleLayout = styled.div`
border: 1px #d0d0d0 solid;
background-color: #f4f4f4;
width: 100%;
height: 249px;
gap: 5px;
> div:first-child {
    padding: 5px 3px;
    font-size: small;
}
> div:nth-child(2) {
    height: 220px;
    border: 1px #d0d0d0 solid;
    padding: 5px;
    background-color: #f4f4f4;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
> div:nth-child(2) > div {
    font-size: smaller;
    user-select: text;
}
`;