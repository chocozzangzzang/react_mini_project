import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import PwInput from '../ui/PwInput';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const RegiPage = styled.div`
    max-width : 1280px;
    padding : 128px;
`;

const InputBoxes = styled.div`
    max-width : 360px;
    text-align : center;
    display : flex;
    flex-direction : column;
    justify-content : center;
    margin : 0 auto;
`;  

const Label = styled.label`
    font-size : 16px;
    margin-bottom : 8px;
    padding : 8px;
`;

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

const secretKey = "cocozzang";

function LoginPage() {

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
                        if(prevUrl === "/member/login") navigate("/");
                        else navigate(prevUrl);
                    }
                    else alert("비밀번호가 다릅니다.");
                }
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }
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
        <RegiPage>
            <form onSubmit={memberLogin}>
                <InputBoxes>
                    <Label>Email</Label>
                    <TextInput type="text" height={20} value={email} onChange={(event) => {setEmail(event.target.value)}}></TextInput>
                    <Label>PW</Label> 
                    <PwInput type="password" height={20} value={pw} onChange={(event) => {setPw(event.target.value)}}></PwInput>
                    <Button buttonTitle="로그인" onClick={null}></Button>
                </InputBoxes>
            </form>          
        </RegiPage>
    )
}

export default LoginPage;