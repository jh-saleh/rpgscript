import styled from "styled-components";

export const WrapperLayout = styled.div`
position: absolute;
left: 0px;
bottom: 30px;
z-index: 1;
min-height: 150px;
min-width: 385px;
box-shadow: rgba(0, 0, 0, 0.5) 2px 4px 2px;
display: grid;
grid-template-rows: repeat(3, min-content);
user-select: none;
`;

export const TopSection = styled.div`
min-height: 50px;
border-top: 0.5px rgb(24, 104, 206) solid;
border-top-right-radius: 5px; 
border-top-left-radius: 5px; 
background: linear-gradient(rgb(24, 104, 206) 0%, rgb(14, 96, 203) 12%, rgb(14, 96, 203) 20%, rgb(17, 100, 207) 32%, rgb(22, 103, 207) 33%, rgb(27, 108, 211) 47%, rgb(30, 112, 217) 54%, rgb(36, 118, 220) 60%, rgb(41, 122, 224) 65%, rgb(52, 130, 227) 77%, rgb(55, 134, 229) 79%, rgb(66, 142, 233) 90%, rgb(71, 145, 235) 100%);
display: flex;
gap: 10px;
padding: 5px;
align-items: center;
position: relative;
width: 100%;
&:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    box-shadow: rgb(14, 96, 203) 0px -1px 1px inset;
    background: linear-gradient(to right, transparent 0px, rgba(255, 255, 255, 0.3) 1%, rgba(255, 255, 255, 0.5) 2%, rgba(255, 255, 255, 0.5) 95%, rgba(255, 255, 255, 0.3) 98%, rgba(255, 255, 255, 0.2) 99%, transparent 100%);
    height: 3px;
    width: 100%;
    border-top-right-radius: 5px; 
    border-top-left-radius: 5px; 
}
`;

export const UserIconLayout = styled.img`
border: 2px #becddf solid;
border-radius: 5px;
width: 45px;
height: 45px;
`;

export const UserNameLayout = styled.div`
font-size: small;
text-shadow: 1px 1px black;
`;

export const ProgrammsSectionLayout = styled.div`
min-height: 375px;
width: min-content;
background-color: #4791eb;
position: relative;
padding: 0px 2px;
&:before{
    position: absolute;
    content: '';
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(218, 136, 74) 50%, rgba(0, 0, 0, 0) 100%);
    height: 2px;
    width: 100%;
    top: 0px;
    left: 0px;
}
> div {
    display: grid;
    grid-template-columns: repeat(2, 191px);
    border-bottom: 1px #385de7 solid;
}
`;

export const AppSectionLayout = styled.div`
background-color: white;
height: 100%;
display: flex;
flex-direction: column;
gap: 5px;
padding: 5px;
`;

export const ShorcutSectionLayout = styled.div`
background-color: #cbe3ff;
height: 100%;
border-left: 1px #a4b7ff solid;
display: flex;
flex-direction: column;
gap: 2px;
padding: 5px;
`;

export const AppIconLayout = styled.a`
cursor: pointer;
display: grid;
grid-template-columns: min-content max-content;
padding: 5px;
gap: 5px;
align-items: center;
height: min-content;
> img {
    width: 30px;
    height: 30px;
}
> div {
    color: black;
    font-size: small;
}
&:hover {
    background-color: rgb(47, 113, 205);
    > div {
        color: white;
    }
}
`;

export const ShortcutIconLayout = styled.a`
cursor: pointer;
display: grid;
grid-template-columns: min-content 140px;
padding: 5px;
gap: 5px;
align-items: center;
height: min-content;
> img {
    width: 22px;
    height: 22px;
}
> div {
    color: rgb(0, 19, 107);
    font-size: 12px;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
}
&:hover {
    background-color: rgb(47, 113, 205);
    > div {
        color: white;
    }
}
`;

export const Separator = styled.div`
height: 7.5px;
background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%) padding-box content-box;
border-top: 3px solid transparent;
border-bottom: 3px solid transparent;
`;

export const BottomSectionLayout = styled.div`
min-height: 36px;
background: linear-gradient(#4791eb 0%, rgb(59, 133, 224) 3%, rgb(65, 138, 227) 5%, rgb(65, 138, 227) 17%, rgb(60, 135, 226) 21%, rgb(55, 134, 228) 26%, rgb(52, 130, 227) 29%, rgb(46, 126, 225) 39%, rgb(35, 116, 223) 49%, rgb(32, 114, 219) 57%, rgb(25, 110, 219) 62%, rgb(23, 107, 216) 72%, rgb(20, 104, 213) 75%, rgb(17, 101, 210) 83%, rgb(15, 97, 203) 88%);
display: flex;
flex-direction: row-reverse;
align-items: center;
gap: 5px;
padding: 2px;
`;

export const BottomIconLayout = styled.div`
cursor: pointer;
display: grid;
grid-template-columns: repeat(2, max-content);
gap: 2px;
place-items: center;
padding: 5px;
> div {
    color: white;
    font-size: small;
    font-weight: 400;
    text-align: center;
}
> img {
    width: 22px;
    height: 22px;
    border: 0.5px #becddf solid;
    border-radius: 5px;
}
&:hover {
    background-color: rgba(60, 80, 210, 0.5);
}
`; 