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


export default function MemberDetail() {

    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({});

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [nowPw, setNowPw] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
      setModalOpen(true);
    }

    const closeModal = (result) => {
      if(result) {
       
        const memberRef = doc(db, "ReactMember", email);
        var input = window.confirm("정말 탈퇴하시겠습니까?");
        if(input) {
          setModalOpen(false);
          const profileImgRef = ref(firebaseStorage, `profile_images/${fileName}`);
          deleteObject(profileImgRef).then(() => {
            deleteDoc(memberRef);
            sessionStorage.clear();
            alert("탈퇴되었습니다!");
            navigate("/");
          })
        } else {
          setModalOpen(false);
        }
        /*
        if(input){
          const profileImgRef = ref(firebaseStorage, `profile_images/${fileName}`);
          deleteObject(profileImgRef).then(() => {
            deleteDoc(memberRef);
            sessionStorage.clear();
            alert("회원탈퇴되었습니다!!");
            // closeOnlyModal();
            navigate("/");
          })
        }*/
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        closeOnlyModal();
      }
    }

    const closeOnlyModal = () => {
      setModalOpen(false);
    }

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
            setImgUrl(data.imageUrl);
            setFileName(data.fileName);
            setNowPw(data.pw);
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
              <InputLabel id="demo-simple-select-required-label">PROFILE</InputLabel>
              <Avatar
                  src={imgUrl}
                  sx={{m:1, width:128, height:128}}
                  alt="NO PROFILE"
              />
              </Grid>
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
                <Button
                    onClick={openModal}
                    /*onClick={() => {
                        openModal
                        var input = window.confirm("정말 탈퇴하시겠습니까?");
                        const memberRef = doc(db, "ReactMember", email);
                        if(input){
                          const profileImgRef = ref(firebaseStorage, `profile_images/${fileName}`);
                          deleteObject(profileImgRef).then(() => {
                            deleteDoc(memberRef);
                            sessionStorage.clear();
                            alert("회원탈퇴되었습니다!!");
                            navigate("/");
                          })
                        }
                    }}*/
                    fullWidth
                    color="warning"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                회원탈퇴
                </Button>
                <Modal open={modalOpen} close={closeModal} header="회원 탈퇴" nowPw={nowPw} com={closeOnlyModal}>
                    비밀번호를 입력해주세요.
                </Modal>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};