import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";

const HomePage = styled.div`
        padding : 32px;
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

function TestModifyPage() {

    const [board, setBoard] = useState({});

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {articleId} = useParams();
    const location = useLocation();

    const articleSubmit = (event) => {
        putArticle();
        navigate(`/article/${articleId}`);
        // event.preventDefault();
    };

    const navigate = useNavigate();

    async function putArticle() {
        const today = new Date();
        const modifydate = `${today.toLocaleString()}`;
        
        const boardSnap = await updateDoc(doc(db, "ReactBoard", articleId.toString()), {
            title : title,
            content : content,
            modifyDate : modifydate,
        });
    };

    async function getArticle() {
        const docRef = doc(db, "ReactBoard", articleId.toString());
        const boardSnap = await getDoc(docRef);

        setBoard(boardSnap.data());
        setTitle(boardSnap.data().title);
        setContent(boardSnap.data().content);
    }

    useEffect(() => {
        getArticle();
    }, []);

    return (
    <HomePage>
         <form onSubmit={articleSubmit}>
            <AllContainer>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    게시물 수정 페이지
                </Typography>
                <TextField 
                    label="제목" 
                    variant='outlined' margin="normal" 
                    value={title} onChange={(event) => {setTitle(event.target.value)}}
                    required={true} />
                <TextField 
                    label="내용" 
                    multiline rows={5} 
                    variant='outlined' margin="normal"
                    value={content} onChange={(event) => {setContent(event.target.value)}}
                    required={true}/>
                {/* <Label>제목</Label>
                <TextInput type="text" height={20} value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                <Label>내용</Label>        
                <TextInput type="text" height={240} value={content} onChange={(event) => {setContent(event.target.value)}}></TextInput> */}
            </AllContainer>
            <Button
                type="submit"
                variant="outlined" 
                size="medium"
                onClick={(event) => {
                    if(title === "" || content === "") {
                        alert("제목이나 내용을 입력하시오!!");
                        event.preventDefault();
                    } else {
                        alert("게시물을 수정하였습니다!!");
                    }
                }}
            >수정 완료</Button>
        </form>
    </HomePage>
    
  )
}

export default TestModifyPage;