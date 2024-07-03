import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DesignedComment from '../comment/DesignedComment';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

// firebase.js에서 db를 import
import { db, firebaseStorage } from '../firebase';
// firestore의 메서드 import
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const TotalDiv = styled.div`
    display : flex;
    flex-direction : column;
    padding-top : 32px;
    padding-left : 72px;
    padding-right : 72px;
    padding-bottom : 32px;
`;

const ButtonDiv = styled.div`
    display : flex;
    justify-content : right;
`;

function TestDesignedArticleDetail() {
  
    const {articleId} = useParams();
    const [board, setBoard] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [nowWriter, setNowWriter] = useState(false);

    const navigate = useNavigate();
    
    async function getArticle() {
        const docRef = doc(db, "ReactBoard", articleId.toString());
        const boardSnap = await getDoc(docRef);

        setBoard(boardSnap.data());
        setComments(boardSnap.data().comments);
        
        const nowId = sessionStorage.getItem("memberid");

        if(nowId === boardSnap.data().writer) {
            setNowWriter(true);
        }
    }

    async function postComment() {
        const writerid = sessionStorage.getItem("memberid");
        const today = new Date();
        const writedate = `${today.toLocaleString()}`;
        const modifydate = `${today.toLocaleString()}`;
        
        const newComment = {
            articleId : articleId,
            writer : writerid,
            comment : comment,
            writeDate : writedate,
            modifyDate : modifydate,
        }

        const counterRef = await updateDoc(doc(db, "ReactBoard", articleId.toString()), {
            comments : [...comments, newComment]
        });

        setComments([...comments, newComment]);
    }
    
    const commentSubmit = (event) => {
        postComment();
        event.preventDefault();
    }

    useEffect(() => {
        getArticle();
    }, []);

    return (
        <div>
            <TotalDiv>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    게시물 상세    
                </Typography>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', padding: 2 }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                            제목 : {board.title}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                            작성자 : {board.writer}
                            </Typography>
                            <Typography component="h2" variant="h5" paragraph>
                            {board.content}
                            </Typography>
                            {
                                board.imageUrl && (
                                    <img src={board.imageUrl} alt="이미지 파일이 없습니다." width="50%" height="50%"></img>
                                )
                            }
                            <Typography variant="subtitle1" color="text.secondary">
                            작성일자 : {board.writeDate} 수정일자 : {board.modifyDate} 
                            </Typography>
                        </CardContent>
                    </Card>
                    {
                        nowWriter && (
                            <ButtonDiv>
                                <Button
                                    onClick={() => {
                                        navigate(`/article/modify/${articleId}`);
                                    }}
                                >
                                    글 수정
                                </Button>
                                <Button
                                    onClick={() => {              
                                        if(window.confirm("삭제하시겠습니까?")) {
                                            const docRef = doc(db, "ReactBoard", articleId.toString());
                                            if(board.fileName !== "") {
                                                const imageRef = ref(firebaseStorage, `images/${board.fileName}`);
                                                deleteObject(imageRef).then(() => {
                                                    deleteDoc(docRef);
                                                    alert("삭제되었습니다!!");
                                                    navigate("/");
                                                }).catch((error) => {
                                                    console.log(error);
                                                })
                                            }
                                        }  
                                        //console.log(board.fileName);
                                        //deleteDoc(docRef);
                                        //navigate("/");
                                    }}
                                >
                                    글 삭제
                                </Button>
                            </ButtonDiv>
                        )
                    }
                </Grid>
            </TotalDiv>
            <TotalDiv>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    댓글    
                </Typography>
                {   
                    (comments.length > 0) && 
                    <DesignedComment comments={comments}/>
                }
            </TotalDiv>
            <TotalDiv>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    댓글 작성    
                </Typography>
                <FormControl component="form" onSubmit={commentSubmit}>
                    <TextField 
                        label="댓글 작성하기" 
                        variant='outlined' margin="normal" 
                        value={comment} 
                        onChange={(event) => {setComment(event.target.value)}}
                    />
                    <ButtonDiv>
                        <Button
                            type="submit"
                            onClick={(event) => {
                                const nowId = sessionStorage.getItem("memberid");
                                if(nowId != null) {
                                    if(comment === "") {
                                      alert("댓글을 작성하세요");
                                      event.preventDefault();
                                    }
                                } else {
                                  alert("로그인한 사용자만 댓글을 달 수 있습니다!!");
                                  setComment("");
                                  event.preventDefault();
                                }          
                              }}
                        >댓글 작성
                        </Button>
                    </ButtonDiv>
                </FormControl>
            </TotalDiv>
        </div>        
      );
}

TestDesignedArticleDetail.propTypes = {
    post: PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };


export default TestDesignedArticleDetail;