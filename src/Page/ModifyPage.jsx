import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';

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

function ModifyPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [writeDate, setWriteDate] = useState("");
    const [modifyDate, setModifyDate] = useState("");

    const {articleId} = useParams();
    const location = useLocation();

    const articleSubmit = (event) => {
        // alert(`${title} :: ${content}`)
        const prevUrl = location.state;
        putArticle();
        navigate(prevUrl);
        event.preventDefault();
    };

    const navigate = useNavigate();

    async function putArticle() {
        try {
            const today = new Date();
            const modifyDate = `${today.toLocaleString()}`;

            await axios.put("http://localhost:3001/article", {articleId, title, content, writeDate, modifyDate})
            .then(response => {
                setTitle("");
                setContent("");
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e.message);
        }
    };

    async function getArticle() {
        try {
            await axios.get(`http://localhost:3001/article/${articleId}`)
                .then(response => {
                    setTitle((response.data)[0].title);
                    setContent((response.data)[0].content);
                    setWriteDate((response.data)[0].writedate);
                    setModifyDate((response.data)[0].modifydate);
                })
                .catch(error => console.log(error));
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getArticle();
    }, []);

    return (
    <HomePage>
        <form onSubmit={articleSubmit}>
            <Button
                buttonTitle="수정 완료"
                onClick={() => {
                    if(title === "" && content === "") alert("제목이나 내용을 입력하시오!!");
                }}
            />
            <AllContainer>
                <Label>제목</Label>
                <TextInput height={20} value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                <Label>내용</Label>        
                <TextInput height={240} value={content} onChange={(event) => {setContent(event.target.value)}}></TextInput>
            </AllContainer>
        </form>
    </HomePage>
    
  )
}

export default ModifyPage;