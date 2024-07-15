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
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
    const [pw, setPw] = useState("");
    const [isPwValid, setIsPwValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*]).{1,10}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const navigate = useNavigate();
    const location = useLocation();

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

    async function login() {

        const prevUrl = location.state;
        
        // const aa = collection(db, "ReactMember");

        const docRef = doc(db, "ReactMember", email);
        const docSnap = await getDoc(docRef);

        try {
            if(docSnap.exists()) {
                const data = docSnap.data();
                const decryptPW = CryptoJS.AES.decrypt(data.pw, secretKey);
                const settingPW = JSON.parse(decryptPW.toString(CryptoJS.enc.Utf8)).pw;
                if(settingPW === pw) {
                    clearAll();
                    alert("로그인 하였습니다.");
                    sessionStorage.setItem("email", data.email);
                    sessionStorage.setItem("memberid", data.id);
                    sessionStorage.setItem("login", true);
                    sessionStorage.setItem("role", data.role);
                    navigate("/");
                } else {
                    alert("비밀번호가 다릅니다!!");
                }
            } else {
                alert("존재하지 않는 회원입니다!!");
            }
        } catch (e) {
            console.log(e.message);
        }
        
        /*
        try {
            await axios.post("http://localhost:3001/member/login", {email})
            .then(response => {
                if(response.data === "NOT FOUND") {
                    alert("없는 회원입니다.");
                } else {
                    const dbPW = response.data.memberpw;
                    const decryptPW = CryptoJS.AES.decrypt(dbPW, secretKey);
                    const settingPW = JSON.parse(decryptPW.toString(CryptoJS.enc.Utf8)).pw;
                    if(settingPW === pw) {
                        clearAll();
                        alert("로그인 하였습니다.");
                        sessionStorage.setItem("email", response.data.email);
                        sessionStorage.setItem("memberid", response.data.memberid);
                        // console.log(prevUrl);
                        navigate("/");
                    }
                    else alert("비밀번호가 다릅니다.");
                }
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }*/
    }

    function clearAll() {
        setEmail("");
        setPw("");
        setIsEmailValid(false);
        setIsPwValid(false);
    }

    const memberLogin = (event) => {

        if(email !== "" && pw !== "" && isEmailValid && isPwValid) {
            login();
            event.preventDefault();
        } else {
            if (email === "" || pw === "") alert("입력하지 않은 칸이 있는지 확인하십시오.");
            else if(!isEmailValid || !isPwValid) alert("입력 정보를 다시 확인하십시오.");
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
                LogIn
            </Typography>
            <Box component="form" noValidate onSubmit={memberLogin} sx={{ mt: 3 }}>
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
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                로그인
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    )};