import { WindowState } from "@/components/hooks/Windows.hook";
import styled, { css } from "styled-components";

export const NavigationBarWrapper = styled.div`
    height: 30px;
    width: 100dvw;
    display: grid;
    grid-template-columns: min-content auto 115px;
    user-select: none;
`;

export const StartButtonLayout = styled.div`
    cursor: pointer;
    width: 106px;
    background-color: transparent;
    background: linear-gradient(#2c4007 0px, #367f32 3%, #4c974c 6%, #77b476 10%, #77b577 15%, #63aa63 17%, #499d49 23%, #45a945 38%, #45a945 54%, #45a244 86%, #40a440 89%, #3d933e 92%, #3a8a3b 95%, #2f7545 98%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 12px;
    display: grid;
    grid-template-columns: 50px 35px;
    place-items: center;
    > div {
        font-style: italic;
        font-weight: 600;
        color: white;
        text-shadow: 1px 1px black;
        font-size: medium;
    }
    > img {
        width: 23px;
        height: 23px;
    }
    &:hover{
        filter: brightness(115%);
    }
`;

export const BarLayout = styled.div`
    display: flex;
    height: inherit;
    width: 100%;
    background: linear-gradient(rgb(31, 47, 134) 0px, rgb(49, 101, 196) 3%, rgb(54, 130, 229) 6%, rgb(68, 144, 230) 10%, rgb(56, 131, 229) 12%, rgb(43, 113, 224) 15%, rgb(38, 99, 218) 18%, rgb(35, 91, 214) 20%, rgb(34, 88, 213) 23%, rgb(33, 87, 214) 38%, rgb(36, 93, 219) 54%, rgb(37, 98, 223) 86%, rgb(36, 95, 220) 89%, rgb(33, 88, 212) 92%, rgb(29, 78, 192) 95%, rgb(25, 65, 165) 98%);
`;

export const AppsBarLayout = styled(BarLayout)`
    gap: 3px;
    place-items: center;
    padding-left: 5px;
    padding-top: 1px;
`;

const appColor = ($state: WindowState) => {
    if ($state === "open" || $state === "normal" || $state === "maximized") {
        return css`
            background-color: rgb(30, 82, 183);
            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.7) 1px 0px 1px inset;
        `
    } else if ($state === "minimized") {
        return css`
            background-color: rgb(60, 129, 243);
            box-shadow: rgba(0, 0, 0, 0.3) -1px 0px inset, rgba(255, 255, 255, 0.2) 1px 1px 1px inset;
        `
    }
    return "";
};

export const AppLayout = styled.div<{ $state: WindowState }>(({ $state }) => css`
    cursor: pointer;
    max-width: 170px;
    width: 170px;
    height: 80%;
    ${appColor($state)}
    display: grid;
    grid-template-columns: 12px auto;
    align-items: center;
    padding-left: 8px;
    gap: 12px;
    border-radius: 2px;
    > div {
        color: white;
        font-size: small;
    }
    > img {
        height: 18px;
        width: 18px;
    }
    &:hover {
        filter: brightness(120%);
    }
`);

export const StatusLayout = styled.div`
    height: inherit;
    width: 115px;
    background: linear-gradient(rgb(12, 89, 185) 1%, rgb(19, 158, 233) 6%, rgb(24, 181, 242) 10%, rgb(19, 155, 235) 14%, rgb(18, 144, 232) 19%, rgb(13, 141, 234) 63%, rgb(13, 159, 241) 81%, rgb(15, 158, 237) 88%, rgb(17, 155, 233) 91%, rgb(19, 146, 226) 94%, rgb(19, 126, 215) 97%, rgb(9, 91, 201) 100%);
    display: grid;
    grid-template-columns: repeat(3, 11px) auto;
    place-items: center;
    gap: 7px;
    > div {
        font-size: x-small;
    }
    > img {
        cursor: pointer;
        margin-left: 15px;
    }
    > img:first-child {
        width: 10px;
    }
    > img:nth-child(2) {
        width: 14px;
    }
    > img:nth-child(3) {
        width: 12px;
    }
`;