import styled, { css } from "styled-components";

export const WelcomeLayout = styled.div`
height: 100%;
width: 40dvw;
display: grid;
grid-template-rows: min-content min-content min-content;
place-items: end;
gap: 30px;
padding: 25px 0px;
`;

export const TextLayout = styled.div<{ $loadingDesktop: boolean }>(({ $loadingDesktop }) => `
color: white;
font-weight: 500;
font-size: ${$loadingDesktop ? "100px" : "xx-large"};
${$loadingDesktop ? css`text-shadow: 5px 5px #3155b5` : ""};
font-style: italic;
`);

const loadDesktopPropertiesForAccountWrapper = ($loadingDesktop: boolean) => {
    if ($loadingDesktop) {
        return css``;
    }
    return css`
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    background: linear-gradient(to right, white,  #5480e7);
    `;
}

export const AccountWrapperLayout = styled.div`
padding: 1px;
margin-top: 50px;
`;

const loadDesktopPropertiesForAccount = ($loadingDesktop: boolean) => {
    if ($loadingDesktop) {
        return css``;
    }
    return css`
    background: linear-gradient(to right, #00249d,  #5480e7);
    border-bottom-left-radius: 9px;
    border-top-left-radius: 9px;
    `;
}

export const AccountLayout = styled.div<{ $loadingDesktop: boolean }>(({ $loadingDesktop }) => css`
${loadDesktopPropertiesForAccount($loadingDesktop)}
cursor: pointer;
display: flex;
padding: 15px;
min-width: 650px;
> img {
    height: 90px;
    width: 90px;
    border: 3px ${$loadingDesktop ? "#bbcef1" : "#f3d146"} solid;
    border-radius: 10px;
}
> div {
    display: grid;
    grid-template-rows: min-content min-content;
}
> div > div:first-child {
    margin-left: 20px;
    font-size: x-large;
    font-weight: 500;
}
> div > div:nth-child(2) {
    margin-left: 20px;
    font-size: medium;
    font-weight: 700;
    color: #00249d;
}
`);

export const LogoLayout = styled.div`

`;

export const CompanyWrapperLayout = styled.div`
display: grid;
grid-template-columns: min-content min-content;
text-align: left;
align-items: end;
gap: 20px;
> div {
    font-size: 27px;
}
`;

export const ScreensWrapperLayout = styled.div`
font-size: 55px;
display: grid;
grid-template-columns: min-content min-content;
> div:first-child {
    font-weight: 600;
    font-style: italic;
}
> div:nth-child(2) {
    font-size: 30px;
    font-weight: 500;
    color: #cf5232;
}
`;
