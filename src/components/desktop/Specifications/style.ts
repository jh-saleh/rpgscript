import { WindowState } from "@/components/hooks/Windows.hook";
import styled, { css } from "styled-components";

export const TitleLayout = styled.h3`
font-size: large;
`;

export const MotivationLayout = styled.p`
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

export const InstructionsWrapperLayout = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

export const InstructionLayout = styled.div`
display: grid;
grid-template-columns: 2fr 1fr 150px 50px;
place-items: center;
> div {
    font-size: x-small;
}
`;