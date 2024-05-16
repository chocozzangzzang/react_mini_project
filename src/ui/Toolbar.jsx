import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Button from "@mui/material/Button";

const CustomToolbar = styled.div`
    padding : 16px;
    display : flex;
    flex-direction : row;
    border-bottom : 1px solid grey;
    background : #A3C6C4;
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
    const location = useLocation();

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
            <Button href="/" size="large" color="secondary">REACT MINI PROJECT</Button>
            {
                nowLoggedIn ? (
                    <ButtonDiv>
                        <NowSpan>{nowId} 님 환영합니다!!  </NowSpan>
                        <Button variant="contained" size="medium" onClick={() => logout()}>로그아웃</Button>
                    </ButtonDiv>
                ) : (
                    <ButtonDiv>
                        <Button variant="outlined" size="medium" onClick={() => {
                            navigate("/member/login", {state : location.pathname});
                        }}>로그인</Button>
                        <Button variant="contained" size="medium" onClick={() => navigate("/member/register")}>회원가입</Button>
                    </ButtonDiv>
                    
                )
            }
            
        </CustomToolbar>
    )
}

export default Toolbar;