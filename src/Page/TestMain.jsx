import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import ArticleList from "../article/ArticleList";
// import Button from "../ui/Button";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// firebase.js에서 db를 import
import { db, firebaseStorage } from '../firebase';
// firestore의 메서드 import
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const HomePage = styled.div`
  padding : 16px;
`;

const AllContainer = styled.div`
  display : flex;
  width : (100% - 32px);
  flex-direction : column;
  align-items : center;
  justify-content : center;

  & > * {
    :not(:last-child) {
        margin-bottom : 24px;
    }
  }
`;

const Demo = styled.div``;

const ButtonDiv = styled.div`
    width : 100%;
    display : flex;
    justify-content : right;
    padding-top : 16px;
`;

function TestMain() {

    const [article, setArticle] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const [test, setTest] = useState();

    async function fetchArticle() {

        const docRef = doc(db, "ReactBoard", "TEST");
        // 참조에 대한 Snapshot 쿼리

        const boardSnap = await getDoc(docRef);

        if(!boardSnap.exists()) {
            return null;
        } else {
            setTest(boardSnap.data());
        }
    }

    useEffect(() => {
        fetchArticle();
    }, []);


    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");
        
        if(loginNowId) setLoggedIn(true);
        else setLoggedIn(false);
    })

    const navigate = useNavigate();

    return (
        <HomePage>
            {/* <Button 
                buttonTitle="글 작성하기!!!"
                onClick={() => {
                    if(loggedIn) navigate("/article/write");
                    else {
                        alert("로그인한 유저만 게시글을 작성할 수 있습니다.");
                        navigate("/member/login");
                    }
                }}
            /> */}
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                작성 게시물
            </Typography>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>작성자</TableCell>
                    <TableCell>작성일자</TableCell>
                    <TableCell>수정일자</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {test !== undefined && 
                    <TableRow key={test.articleId}>
                    <TableCell 
                    // onClick={() => {navigate(`/article/${test.articleId}`);}}
                    >{test.articleId}</TableCell>
                    <TableCell>{test.title}</TableCell>
                    <TableCell>{test.writer}</TableCell>
                    <TableCell>{test.writeDate}</TableCell>
                    <TableCell>{test.modifyDate}</TableCell>
                    </TableRow>
                }
                </TableBody>
            </Table>
        </React.Fragment>

        {/* <AllContainer>
            <ArticleList articles={article}/>
        </AllContainer> */}
        <ButtonDiv>
            <Button 
                variant="contained"
                onClick={() => {
                    if(loggedIn) navigate("/article/write");
                    else {
                        alert("로그인한 유저만 게시글을 작성할 수 있습니다.");
                        navigate("/member/login");
                    }
                }}>글 작성하기
            </Button>
        </ButtonDiv>
        </HomePage>
    )
}

export default TestMain;