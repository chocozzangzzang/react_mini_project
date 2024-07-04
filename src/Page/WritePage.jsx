import React, { useCallback, useEffect, useRef, useState } from 'react'
// import Button from '../ui/Button';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { getDoc, doc, updateDoc, increment, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, firebaseStorage } from '../firebase';
import { MuiFileInput } from "mui-file-input";

import uuid from 'react-uuid'

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

function WritePage() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    async function postArticle() {
        /*
        const data = {
            title : title,
            content : content,
        };

        const config = {
            "Content-Type" : "application/json",
        };*/

        const aa = collection(db, "ReactBoard");
        //console.log(aa);

        // const docRef = await addDoc(collection(db, "ReactBoard"), {
        //     tempVal : "temp",
        // });
        
       
        try {
            const loginNowId = sessionStorage.getItem("memberid");

            const today = new Date();
            const formattedDate = `${today.toLocaleString()}`;

            if(title !== "" && content !== "" && selectedFile) {

                const docRef = doc(db, "BoardCounter", "BoardCounter");
                const counterSnap = await getDoc(docRef);

                const data = counterSnap.data();
                const articleId = data.counter + 1;

                const file_uuid = uuid();

                const uploadfile = await(uploadBytes(ref(firebaseStorage, `images/${file_uuid}`), selectedFile));
                const file_url = await getDownloadURL(uploadfile.ref);
                
                const boardRef = await setDoc(doc(db, "ReactBoard", articleId.toString()), {
                    articleId : articleId,
                    title : title,
                    content : content,
                    comments : [],
                    writer : loginNowId,
                    writeDate : formattedDate,
                    modifyDate : formattedDate,
                    imageUrl : file_url,
                    fileName : file_uuid,
                    realfileName : selectedFile.name,
                });

                const counterRef = await updateDoc(doc(db, "BoardCounter", "BoardCounter"), {
                    counter : increment(1),
                });  
            } 
            // await axios.post("http://localhost:3001/article", {title, content, loginNowId, formattedDate})
            // .then(response => console.log(response))
            // .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }

        /*
        try {
            const response = await fetch("http://localhost:3001/article", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
                alert("데이터가 성공적으로 전송되었습니다.");
                // 성공적으로 데이터를 보냈다면, 필요한 후속 조치를 여기에 추가할 수 있습니다.
                setTitle("");
                setContent("");
            } else {
              alert("데이터 전송에 실패했습니다.");
            }
          } catch (error) {
            alert("라우터 접근에 문제가 있습니다.");
          }
        */
    }

    const handleFileChange = (newValue, info) => {
        setSelectedFile(newValue);
        // console.log(newValue);
    };

    const articleSubmit = (event) => {
        // alert(`${title} :: ${content}`)
        postArticle();
        navigate("/article");
        event.preventDefault();
    }

    return (
    <HomePage>
        <form onSubmit={articleSubmit}>
            <AllContainer>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    게시물 작성 페이지
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
                <MuiFileInput
                    inputProps={{ accept: '.png, .jpeg, .gif' }} 
                    placeholder="Insert a file"
                    value={selectedFile}
                    onChange={handleFileChange}
                    margin="normal"
                    fullWidth
                />
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
                    if(title === "" || content === "" || selectedFile === null) {
                        alert("제목이나 내용 및 첨부파일을 확인하시오!!");
                        event.preventDefault();
                    } else {
                        alert("게시물을 작성하였습니다!!");
                    }
                }}
            >작성 완료</Button>
        </form>
    </HomePage>
    
  )
}

export default WritePage;