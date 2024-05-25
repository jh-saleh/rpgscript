import styled from "styled-components";

export const BarLayout = styled.div`
    background-color: #edebda;
    height: 21px;
    width: 100%;
    position: relative;
    display: flex;
    gap: 5px;
    place-items: center;
    padding: 2px 0px;
    border-left: 2px #0831d9 solid;
    border-right: 2px #0831d9 solid;
`;

export const SelectionLayout = styled.div`
    cursor: pointer;
    background-color: inherit;
    font-size: x-small;
    color: black;
    padding: 3px 5px;
    &:hover {
        color: white;
        background-color: #1660e8;
    }
`;