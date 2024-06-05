import styled from "styled-components";

const breakPointMaxHeight = "(max-height: 500px)";
const breakPointMaxWidth = "(max-width: 450px)";

export const LoggingOffLayout = styled.div`
display: grid;
place-items: center;
> div {
    min-width: 290px;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    place-items: end;
    gap: 30px;
}
`;

export const LogoLayout = styled.div`

`;

export const TextLayout = styled.div`
font-size: xx-large;
@media ${breakPointMaxHeight}, ${breakPointMaxWidth} {
    font-size: x-large;
}
font-weight: 500;
width: max-content;
`;

export const CompanyWrapperLayout = styled.div`
display: grid;
grid-template-columns: min-content min-content;
text-align: left;
align-items: end;
gap: 20px;
> div {
    font-size: 27px;
    @media ${breakPointMaxHeight} {
        font-size: 20px;
    }
}
> img {
    width:110px;
    height:100px;
    @media ${breakPointMaxHeight} {
        width:80px;
        height:70px;
    }
}
`;

export const ScreensWrapperLayout = styled.div`
display: grid;
grid-template-columns: min-content min-content;
> div:first-child {
    font-size: 55px;
    font-weight: 600;
    font-style: italic;
    @media ${breakPointMaxHeight} {
        font-size: 40px;
    }
}
> div:nth-child(2) {
    font-size: 30px;
    font-weight: 500;
    color: #cf5232;
    @media ${breakPointMaxHeight} {
        font-size: 20px;
    }
}
`;
