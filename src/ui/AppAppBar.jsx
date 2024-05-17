import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ButtonGroup } from '@mui/material';

const ButtonDiv = styled.div`
    margin-left : auto;
`;

const NowSpan = styled.span`
    font-size : 16px;
    font-weight : bold;
    color : #6495ed;
`;

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function AppAppBar() {

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
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                <Toolbar>
                    <Button href="/" size="large" color="secondary">REACT MINI PROJECT</Button>
                    {
                        nowLoggedIn ? (
                            <ButtonDiv>
                                <NowSpan>{nowId} 님 환영합니다!!  </NowSpan>
                                <Button variant="contained" size="medium" onClick={() => logout()}>로그아웃</Button>
                            </ButtonDiv>
                        ) : (
                            <ButtonDiv>
                                <ButtonGroup variant='contained' aria-label="Basic button group">
                                    <Button size="medium" onClick={() => {
                                        navigate("/member/login", {state : location.pathname});
                                    }}>로그인</Button>
                                    <Button size="medium" onClick={() => 
                                        navigate("/member/register")}>회원가입</Button>
                                </ButtonGroup>
                                
                            </ButtonDiv>
                        )
                    }
                </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
      
    );
}