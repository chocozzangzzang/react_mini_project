import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DesignedComment from '../comment/DesignedComment';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

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

function DesignedArticleDetail() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writeDate, setWriteDate] = useState("");
    const [modifyDate, setModifyDate] = useState("");
    const [writer, setWriter] = useState("");

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
  
    const {articleId} = useParams();

    async function getArticle() {
        try {
            await axios.get(`http://localhost:3001/article/${articleId}`)
                .then(response => {
                    setTitle((response.data)[0].title);
                    setContent((response.data)[0].content);
                    setWriter((response.data)[0].writer);
                    setWriteDate((response.data)[0].writedate);
                    setModifyDate((response.data)[0].modifydate);
                })
                .catch(error => console.log(error));
        } catch (e) {
            console.log(e.message);
        }
    }

    async function getComments() {
        try {
          await axios.get(`http://localhost:3001/comment/${articleId}`)
          .then(response => {
            setComments(response.data);
          })
          .catch(error => console.log(error))
        } catch (e) {
          console.log(e.message);
        }
      }

      async function postComment() {
        const writerid = sessionStorage.getItem("memberid");
        const today = new Date();
        const writedate = `${today.toLocaleString()}`;
        const modifydate = `${today.toLocaleString()}`;
        
        try {
            await axios.post(`http://localhost:3001/comment`, {articleId, comment, writerid, writedate, modifydate})
            .then(setComment(""))
            .catch(error => console.log(error))
            } catch (e) {
             console.log(e.message);
            }
        }
    
      const commentSubmit = (event) => {
        postComment();
        event.preventDefault();
      }

    useEffect(() => {
        getArticle();
    }, []);

    useEffect(() => {
        getComments();
      }, [comments]);


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
                        제목 : {title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                        작성자 : {writer}
                        </Typography>
                        <Typography component="h2" variant="h5" paragraph>
                        {content}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        수정일자 : {modifyDate} 작성일자 : {writeDate} 
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            </TotalDiv>
            <TotalDiv>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    댓글    
                </Typography>
                <DesignedComment comments={comments}/>
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

DesignedArticleDetail.propTypes = {
    post: PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };


export default DesignedArticleDetail;