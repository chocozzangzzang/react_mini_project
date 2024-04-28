import React, { useState } from 'react'
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';

const HomePage = styled.div`
        padding : 16px;
    `;

const AllContainer = styled.div`
    display : flex;
    width : (100% - 32px);
    flex-direction : column;
    justify-content : center;
`;

const Label = styled.label`
    font-size : 16px;
    margin-bottom : 8px;
    padding : 8px;
`;

function WritePage() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
    const navigate = useNavigate();

    return (
    <HomePage>
        <Button
            buttonTitle="작성 완료"
            onClick={() => {
                if(title !== "" && content !== "") navigate("/article");
                else alert("제목이나 내용을 입력하시오!!");
            }}
        />
        <AllContainer>
            <Label>제목</Label>
            <TextInput height={20} value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            <Label>내용</Label>        
            <TextInput height={240} value={content} onChange={(event) => {setContent(event.target.value)}}></TextInput>
        </AllContainer>
    </HomePage>
    
  )
}

export default WritePage;