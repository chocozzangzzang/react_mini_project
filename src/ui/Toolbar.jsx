import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const CustomToolbar = styled.div`
    padding : 16px;
    display : flex;
    flex-direction : row;
    border-bottom : 1px solid grey;
    background : #A3C6C4;
    max-width : 1440px;
`;

const LoginButton = styled.button`
    margin-left : auto;
`;

const RegisterButton = styled.button`

`;


const CustomA = styled.a`
    text-decoration : none;
    font-size : 16px;

    &:hover { color : red; }
`;

function Toolbar() {

    const navigate = useNavigate();

    return (
        <CustomToolbar>
            <CustomA href="/">==DB 연결==</CustomA>
            <LoginButton>로그인</LoginButton>
            <RegisterButton onClick={() => navigate("/member/register")}>회원가입</RegisterButton>
        </CustomToolbar>
    )
}

export default Toolbar;