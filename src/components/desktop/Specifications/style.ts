import { WindowState } from "@/components/hooks/Windows.hook";
import styled, { css } from "styled-components";

export const TitleLayout = styled.h3`
font-size: large;
margin-bottom: 5px;
&::after{
    background: linear-gradient(to right, rgb(112, 191, 255) 0px, rgb(255, 255, 255) 100%);
    bottom: 0px;
    left: -12px;
    height: 1px;
    width: 330px;
    content: ' ';
    display: block;
}
`;

export const MotivationLayout = styled.div`
font-size: medium;
display: flex;
flex-wrap: wrap;
> p  > a {
    display: contents;
    font-weight: 600;
}
margin-bottom: 20px;
`;

const setSpecificationsLayoutSize = ($state: WindowState) => {
    if ($state === "maximized") {
        return css`
            min-height: calc(100dvh - 330px);
            max-height: calc(100dvh - 60px);
        `;
    } else {
        return css`
            height: 400px;
            @media(max-width: 400px) {
                width: 100dvw;
            }
            @media(max-height: 450px) {
                height: calc(100dvh - 60px);
            }
        `;
    }
}

export const SpecificationsLayout = styled.div<{ $state: WindowState }>(({ $state }) => css`
    ${setSpecificationsLayoutSize($state)}
    width: inherit;
    overflow-y: auto;
`);

export const InstructionsWrapperLayout = styled.table`
`;

export const InstructionLayout = styled.tr`
> td {
    font-size: x-small;
}
`;