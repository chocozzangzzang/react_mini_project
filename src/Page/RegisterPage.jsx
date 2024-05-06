import React, { useState } from 'react'
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import PwInput from '../ui/PwInput';

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

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    return (
        <RegiPage>
            <InputBoxes>
                <Label>Email</Label>
                <TextInput type="text" height={20} value={email} onChange={(event) => {setEmail(event.target.value)}}></TextInput>
                <Label>ID</Label>
                <TextInput type="text" height={20} value={id} onChange={(event) => {setId(event.target.value)}}></TextInput>
                <Label>PW</Label>
                <PwInput type="password" height={20} value={pw} onChange={(event) => {setPw(event.target.value)}}></PwInput>
                <Label>PW Confirm</Label>
                <PwInput type="password" height={20} value={pwConfirm} onChange={(event) => {setPwConfirm(event.target.value)}}></PwInput>
                <Button buttonTitle="회원가입" onClick={() => alert(`id : ${id}, email : ${email}, pw : ${pw}, pwconfirm : ${pwConfirm}`)}></Button>
            </InputBoxes>
        </RegiPage>
    )
}

export default RegisterPage;