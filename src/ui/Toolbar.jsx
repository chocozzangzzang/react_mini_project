import React, { useEffect, useState } from 'react'
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

const ButtonDiv = styled.div`
    margin-left : auto;
`;

const LoginButton = styled.button`
`;

const RegisterButton = styled.button`

`;

const LogoutButton = styled.button`
    margin-left : auto;
`;

const NowSpan = styled.span`
    font-size : 16px;
    font-weight : bold;
    color : #6495ed;
`;


const CustomA = styled.a`
    text-decoration : none;
    font-size : 16px;

    &:hover { color : red; }
`;

function Toolbar() {

    const [nowLoggedIn, setNowLoggedIn] = useState(false);
    const [nowId, setNowId] = useState("");

    const navigate = useNavigate();    

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");
        if(loginNowId !== null) {
            setNowLoggedIn(true);
            setNowId(loginNowId);
        } 
    });

    const logout = () => {
        sessionStorage.clear();
        setNowLoggedIn(false);
    }

    return (
        <CustomToolbar>
            <CustomA href="/">==DB 연결==</CustomA>
            {
                nowLoggedIn ? (
                    <ButtonDiv>
                        <NowSpan>{nowId} 님 환영합니다!!  </NowSpan>
                        <LogoutButton onClick={() => logout()}>로그아웃</LogoutButton>
                    </ButtonDiv>
                    
                ) : (
                    <ButtonDiv>
                        <LoginButton onClick={() => navigate("/member/login")}>로그인</LoginButton>
                        <RegisterButton onClick={() => navigate("/member/register")}>회원가입</RegisterButton>
                    </ButtonDiv>
                    
                )
            }
            
        </CustomToolbar>
    )
}

export default Toolbar;