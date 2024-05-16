import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CryptoJS from 'crypto-js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const secretKey = "cocozzang";

const WarnSpan = styled.span`
    font-size : 16px;
    color : red;
    font-weight : bold;
`

const GeneralSpan = styled.span`
    font-size : 16px;
    color : green;
    font-weight : bold;
`;

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [isPwSame, setIsPwSame] = useState(false);
    const [isPwValid, setIsPwValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*]).{1,10}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const navigate = useNavigate();

    useEffect(() => {
        if(pw === pwConfirm && pw !== "" && isPwValid) setIsPwSame(true);
        else setIsPwSame(false);
    }, [pw, pwConfirm, isPwValid]);

    useEffect(() => {
        const result = PWD_REGEX.test(pw);
        if(result) setIsPwValid(true);
        else setIsPwValid(false);
    },[pw]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        if(result) setIsEmailValid(true);
        else setIsEmailValid(false);
    }, [email]);

    async function register() {

        const data = {pw : pw};
        const cryptoPW = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
        const settingPW = cryptoPW.toString();

        console.log(settingPW);

        try {
            await axios.post("http://localhost:3001/member/register", {id, settingPW, email})
            .then(response => {console.log(response); alert("회원가입 되었습니다");})
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }
    }

    function clearAll() {
        setId("");
        setEmail("");
        setPw("");
        setPwConfirm("");
        setIsPwSame(false);
        setIsEmailValid(false);
        setIsPwValid(false);
    }

    const memberRegister = (event) => {

        if(isEmailValid && isPwValid && isPwSame && id !== "") {
            register();
            clearAll();
            navigate("/");
            event.preventDefault();
        } else {
            alert("입력하지 않은 칸이 있습니다!!");
            event.preventDefault();
        }

        
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={memberRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                {
                    isEmailValid? 
                    (<GeneralSpan>유효한 이메일입니다!!</GeneralSpan>) : 
                    (<WarnSpan>이메일 형식을 지켜주세요!!</WarnSpan>)
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                    value={id}
                    onChange={(event) => {setId(event.target.value)}}
                    autoComplete="given-name"
                    name="id"
                    required
                    fullWidth
                    id="id"
                    label="Id"
                    autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    value={pw}
                    onChange={(event) => {setPw(event.target.value)}}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                {
                    isPwValid ? 
                    (<GeneralSpan>유효한 비밀번호입니다!!</GeneralSpan>) : 
                    (<WarnSpan>비밀번호는 8~24자, 소문자, 숫자, 특수문자(#?!@$%^&*)를 포함해야합니다!!</WarnSpan>)
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                    value={pwConfirm}
                    onChange={(event) => {setPwConfirm(event.target.value)}}
                    required
                    fullWidth
                    name="passwordCheck"
                    label="Password Check"
                    type="password"
                    id="password check"
                    autoComplete="new-password"
                />
                {   
                    isPwSame ? 
                    (<GeneralSpan>password is same!!</GeneralSpan>) : 
                    (<WarnSpan>check your password</WarnSpan>)
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};