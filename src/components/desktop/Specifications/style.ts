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

export const SpecificationsLayout = styled.div<{ $state: WindowState }>(({ $state }) => css`
    min-height: ${$state === "maximized" ? css`calc(100dvh - 330px)` : '100%'};
    max-height: ${$state === "maximized" ? css`calc(100dvh - 60px)` : css`calc(100dvh - 330px)`};
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