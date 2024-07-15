import React, {useState, useEffect, useRef} from 'react';
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

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { db, firebaseStorage } from '../firebase';
import { doc, collection, setDoc } from 'firebase/firestore';
import { MuiFileInput } from 'mui-file-input';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuid from 'react-uuid';

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

const datePickerFormat = "YYYY년 MM월 DD일";
const datePickerUtils = {
  format : datePickerFormat,
  parse : (value) => dayjs(value, datePickerFormat, true).toDate(),
};

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [isPwSame, setIsPwSame] = useState(false);
    const [isPwValid, setIsPwValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [birth, setBirth] = useState(dayjs(new Date()).format(datePickerFormat));
    const [gender, setGender] = useState("");
    const [birthIsSelected, setBirthIsSelected] = useState(false);

    const [profileImage, setProfileImage] = useState(null);
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const imgRef = useRef(null);

    const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*]).{1,10}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const navigate = useNavigate();
    
    const dateMax = dayjs().add(-1, 'day');

    const onProfileChange = () => {
      // console.log(newValue.target.files[0]);

      if (imgRef.current && imgRef.current.files) {
        const img = imgRef.current.files[0];
        setProfileImage(img);
        // console.log(img);

        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          setImage(reader.result.toString());
        }
      }
    }

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

        const file_uuid = uuid();
        // console.log(settingPW);

        const aa = collection(db, "ReactMember");
        const profileImageUpload = await(uploadBytes(ref(firebaseStorage, `profile_images/${file_uuid}`), profileImage));
        const profile_url = await getDownloadURL(profileImageUpload.ref);
        // console.log(aa);

        try {
          const registerRef = await setDoc(doc(db, "ReactMember", email), {
            id : id,
            pw : settingPW,
            email : email,
            birth : birth,
            gender : gender,
            imageUrl : profile_url,
            fileName : file_uuid,
            role : "MEMBER",
          });
        } catch (e) {
          console.log(e.message);
        }
        
        /*
        try {
            await axios.post("http://localhost:3001/member/register", {id, settingPW, email, birth, gender})
            .then(response => {console.log(response); alert("회원가입 되었습니다");})
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }*/
    }

    function clearAll() {
        setId("");
        setEmail("");
        setPw("");
        setPwConfirm("");
        setBirth(dayjs(new Date()).format(datePickerFormat));
        setGender("");
        setIsPwSame(false);
        setIsEmailValid(false);
        setIsPwValid(false);
        setBirthIsSelected(false);
    }

    const memberRegister = (event) => {
      
      // console.log(dayjs(birth));

      if(isEmailValid && isPwValid && isPwSame && id !== "" && gender !== "" && birthIsSelected && profileImage !== null) {
          register();
          clearAll();
          navigate("/");
          event.preventDefault();
      } else {
          alert("입력하지 않은 칸이 있습니다!!");
          event.preventDefault();
      }
    }

  const birthChangeHandler = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setBirth(formattedDate);
    setBirthIsSelected(true);
  }

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <br></br>
          <Typography component="h2" variant="h5">
            Profile
          </Typography>
          <Avatar
            src={image}
            sx={{width:128, height:128}}
          >
          </Avatar>
          <input 
              type='file' 
              // style={{display:'none'}}
              inputProps={{ accept: '.png, .jpeg, .gif' }} 
              name='profile_img'
              onChange={onProfileChange}
              // value={profileImage}
              ref={imgRef}/>
          <Box component="form" noValidate onSubmit={memberRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">EMAIL</InputLabel>
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
              <InputLabel id="demo-simple-select-required-label">ID</InputLabel>
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
                <InputLabel id="demo-simple-select-required-label">BIRTH</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }} 
                    label="생년월일을 입력하세요."
                    format="YYYY년 MM월 DD일"
                    onChange={(date) => {birthChangeHandler(date);}}
                    maxDate={dateMax}
                    // disableFuture
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">GENDER</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={gender}
                  label="Gender *"
                  onChange={genderChangeHandler}
                >
                  <MenuItem  value="남자">남자</MenuItem>
                  <MenuItem  value="여자">여자</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">PASSWORD</InputLabel>
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
                <InputLabel id="demo-simple-select-required-label">PASSWORD CONFIRM</InputLabel>
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