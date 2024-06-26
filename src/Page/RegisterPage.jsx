import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import PwInput from '../ui/PwInput';
import { useNavigate } from 'react-router-dom';
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

function RegisterPage() {

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
        <RegiPage>
            <form onSubmit={memberRegister}>
                <InputBoxes>
                    <Label>Email</Label>
                    <TextInput type="text" height={20} value={email} onChange={(event) => {setEmail(event.target.value)}}></TextInput>
                    {isEmailValid? (<GeneralSpan>유효한 이메일입니다!!</GeneralSpan>) : (<WarnSpan>이메일 형식을 지켜주세요!!</WarnSpan>)}
                    <Label>ID</Label>
                    <TextInput type="text" height={20} value={id} onChange={(event) => {setId(event.target.value)}}></TextInput>
                    <Label>PW</Label> 
                    <PwInput type="password" height={20} value={pw} onChange={(event) => {setPw(event.target.value)}}></PwInput>
                    {isPwValid ? (<GeneralSpan>유효한 비밀번호입니다!!</GeneralSpan>) : (<WarnSpan>비밀번호는 8~24자, 소문자, 숫자, 특수문자(#?!@$%^&*)를 포함해야합니다!!</WarnSpan>)}
                    <Label>PW Confirm</Label> 
                    <PwInput type="password" height={20} value={pwConfirm} onChange={(event) => {setPwConfirm(event.target.value)}}></PwInput>
                    {isPwSame ? (<GeneralSpan>password is same!!</GeneralSpan>) : (<WarnSpan>check your password</WarnSpan>)}
                    <br/>
                    <Button buttonTitle="회원가입" onClick={null}></Button>
                </InputBoxes>
            </form>          
        </RegiPage>
    )
}

export default RegisterPage;