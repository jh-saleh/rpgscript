import styled from "styled-components";

export const LoggingOffLayout = styled.div`
height: 100%;
width: 40dvw;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
place-items: end;
gap: 30px;
`;

export const LogoLayout = styled.div`

`;

export const TextLayout = styled.div`
font-size: xx-large;
font-weight: 500;
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
