import React from 'react'
import styled from 'styled-components';

const ContentWrapper = styled.input`
        display : flex;
        flex-direction : column;
        align-items : flex-start;
        justify-content : center;
        border : 1px solid grey;
        border-radius : 16px;
        max-width : 1440px;
        width : calc(100% - 32px);
        padding : 16px;
        font-size : 16px;
        resize : none;
        line-height : 20px;
        margin-bottom : 8px;

        ${(props) =>
            props.height &&
            `height : ${props.height}px;`
        }
    `;

function PwInput(props) {
    
    const {type, height, value, onChange} = props;
    
    return (
        <ContentWrapper type={type} height={height} value={value} onChange={onChange}></ContentWrapper>
    )
}

export default PwInput;