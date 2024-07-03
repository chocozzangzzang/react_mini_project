import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { MuiFileInput } from 'mui-file-input';

import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, firebaseStorage } from "../firebase";

import uuid from 'react-uuid';

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

    const [selectedFile, setSelectedFile] = useState(null);

    const {articleId} = useParams();

    const articleSubmit = (event) => {
        putArticle();
        navigate(`/article/${articleId}`);
        // event.preventDefault();
    };

    const navigate = useNavigate();

    async function updateArticle(modifydate) {

        const file_uuid = uuid();
        const uploadfile = await(uploadBytes(ref(firebaseStorage, `images/${file_uuid}`), selectedFile));
        const file_url = await getDownloadURL(uploadfile.ref);
        
        const boardSnap = await updateDoc(doc(db, "ReactBoard", articleId.toString()), {
            modifydate : modifydate,
            imageUrl : file_url,
            fileName : file_uuid,
            realfileName : selectedFile.name,
        });
    }

    async function putArticle() {
        const today = new Date();
        const modifydate = `${today.toLocaleString()}`;
        
        const comparefile = (selectedFile.name === board.realfileName);
        
        // console.log(comparefile);
        
        if(!comparefile) {
            
            const imageRef = ref(firebaseStorage, `images/${board.fileName}`);
            
            deleteObject(imageRef).then(() => {
                updateArticle(modifydate);
            })
            
        }

        // const boardSnap = await updateDoc(doc(db, "ReactBoard", articleId.toString()), {
        //     title : title,
        //     content : content,
        //     modifyDate : modifydate,
        // });
    };

    async function getArticle() {
        const docRef = doc(db, "ReactBoard", articleId.toString());
        const boardSnap = await getDoc(docRef);

        setBoard(boardSnap.data());
        setTitle(boardSnap.data().title);
        setContent(boardSnap.data().content);
    }

    const handleFileChange = (newValue, info) => {
        setSelectedFile(newValue);
    };

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
                {
                    board.imageUrl && (
                        <img src={board.imageUrl} alt="이미지 파일이 없습니다." width="50%" height="50%"></img>
                    )
                }
                <MuiFileInput
                    inputProps={{ accept: '.png, .jpeg, .gif' }} 
                    placeholder={board.realfileName}
                    value={selectedFile}
                    onChange={handleFileChange}
                    margin="normal"
                    fullWidth
                />
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