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
import dayjs from "dayjs";

import InputLabel from '@mui/material/InputLabel';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// TODO remove, this demo shouldn't need to reset the theme.

const datePickerFormat = "YYYY년 MM월 DD일";
const datePickerUtils = {
  format : datePickerFormat,
  parse : (value) => dayjs(value, datePickerFormat, true).toDate(),
};

const defaultTheme = createTheme();

export default function MemberDetail() {

    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({});

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        getMember();
    }, []); 
    
    async function getMember() {

        const email = sessionStorage.getItem("email");
        const docRef = doc(db, "ReactMember", email);
        const docSnap = await getDoc(docRef);

        try {
          if(docSnap.exists()) {
            const data = docSnap.data();
            setId(data.id);
            setEmail(data.email);
            setBirth(data.birth);
            setGender(data.gender);
          } else {
            alert("회원정보를 불러올 수 없습니다!!");
            navigate("/");
          }

        } catch(e) {
          console.log(e.message);
        }

        /*
        try {
            await axios.post("http://localhost:3001/member/getDetail", {email})
                    .then(response => {
                        setMemberData(response.data);
                    })
                    .catch(error => {console.log(error);})
        } catch(e) {
            console.log(e.message);
        }*/

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
            Member Detail
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">EMAIL</InputLabel>
                <TextField
                    id="outlined-read-only-input"
                    value={email}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">ID</InputLabel>
                <TextField
                    id="outlined-read-only-input"
                    value={id}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">BIRTH</InputLabel>
                <TextField
                    id="outlined-read-only-input"
                    value={birth}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">GENDER</InputLabel>
                <TextField
                    id="outlined-read-only-input"
                    value={gender}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                돌아가기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};