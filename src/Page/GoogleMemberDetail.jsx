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
import Modal from "../ui/Modal.jsx";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, firebaseStorage } from '../firebase';
import { deleteObject, ref } from 'firebase/storage';

// TODO remove, this demo shouldn't need to reset the theme.

const datePickerFormat = "YYYY년 MM월 DD일";
const datePickerUtils = {
  format : datePickerFormat,
  parse : (value) => dayjs(value, datePickerFormat, true).toDate(),
};

const defaultTheme = createTheme();


export default function GoogleMemberDetail() {

    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({});

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
        getMember();
    }, []); 
    
    async function getMember() {

        const email = sessionStorage.getItem("email");
        const nickname = sessionStorage.getItem("memberid");

        setId(nickname);
        setEmail(email);
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
            Google Member Detail
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
                {/* <Button
                    onClick={() => {alert("구글 탈퇴!!");}}
                    fullWidth
                    color="warning"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                회원탈퇴
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};