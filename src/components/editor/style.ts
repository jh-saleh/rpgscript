import styled from "styled-components";

export const EditorLayout = styled.div`
    display: grid;
`;

export const LineWrapperLayout = styled.div`
    display: grid;
    grid-template-columns: 2.5rem auto;
`;

export const LineNumberLayout = styled.div`
color: white;
margin-right: 7px;
text-align: right;
`;

export const LineInstructionLayout = styled.input`
color: white;
border: none;
&:focus {
    outline: none;
    border: 1px solid gray;
    margin-left: -1px;    
}
&::selection {
    background-color: blue;
}
`;

export const StatusBarLayout = styled.div`
display: flex;
justify-content: space-between;
`;

export const StatusBarCoordinatesLayout = styled.div`
display: grid;
grid-template-columns: 1.3rem min-content 1.9rem min-content;
gap: 2px;
`;