import styled, { css } from "styled-components";

const height = 22;

export const SelectionLayout = styled.div`
    cursor: pointer;
    background-color: inherit;
    font-size: x-small;
    color: black;
    padding: 5px 7px;
    position: relative;
    &:hover {
        color: white;
        background-color: #1660e8;
        > div {
            display: block;
        }
    }
    `;

export const ModalSelectionLayout = styled(SelectionLayout)`

`;

export const ModalSelectionsLayout = styled.div(() => css`
    z-index: 2;
    position: absolute;
    top: ${height}px;
    left: 0px;
    height: min-content;
    width: max-content;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: rgb(100, 100, 100) 2px 2px 1px;
    display: none;
`);

export const BarLayout = styled.div`
    z-index: 1;
    background-color: #edebda;
    height: ${height}px;
    width: 100%;
    display: flex;
    gap: 5px;
    place-items: center;
    padding: 2px 0px;
    border-left: 2px #0831d9 solid;
    border-right: 2px #0831d9 solid;
`;
