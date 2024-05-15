import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../comment/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import DeleteButton from '../ui/DeleteButton';
import ModifyButton from '../ui/ModifyButton';

const DetailContainer = styled.div`
    display : flex;
    width : (100% - 32px);
    flex-direction : column;
    justify-content : center;
    padding : 24px;
`;

const WrapperA = styled.div`
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
    border : 1px solid grey;
    border-radius : 16px;
    max-width : 1440px;
    padding : 24px;
    margin-bottom : 16px;
`;

const ArticleWriter = styled.p`
  font-size : 32px;
  font-weight : bold;
`;

const ArticleTitle = styled.p`
    font-size : 24px;
    font-weight : bold;
`;

const ArticleContent = styled.p`
    font-size : 24px;
    padding-right : 8px;
`;

const CommentContent = styled.p`
    font-size : 24px;
    padding-right : 8px;
`;

const ContentWrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items : baseline;
    justify-content : center;
`;

const ArticleDate = styled.p`
    font-size : 12px;
    text-align : right;
`;

const DateDiv = styled.div`
    display : inline-block;
    width : 100%;
    justify-content : right;
`;

function ArticleDetail() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [writeDate, setWriteDate] = useState("");
  const [modifyDate, setModifyDate] = useState("");

  const [writer, setWriter] = useState("");

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
  }, [title, content]);

  useEffect(() => {
    getComments();
  }, [comments]);

  return (
    <DetailContainer>
      <WrapperA>
        <ArticleWriter>작성자 : {writer}</ArticleWriter>
        <ArticleTitle>
          #{articleId}. {title}
        </ArticleTitle>
        <ContentWrapper>
          <ArticleContent>{content}</ArticleContent>
          <DeleteButton articleId={articleId} writer={writer}/>
          <ModifyButton articleId={articleId} writer={writer}/>
        </ContentWrapper>
        <DateDiv>
                <ArticleDate>작성일자 : {writeDate}</ArticleDate>
                <ArticleDate>수정일자 : {modifyDate}</ArticleDate>
            </DateDiv>
      </WrapperA>
      <CommentList comments={comments}></CommentList>
      <CommentContent>==댓글 작성==</CommentContent>
      <form onSubmit={commentSubmit}>
        <TextInput height={20} value={comment} onChange={(event) => {setComment(event.target.value)}}></TextInput>
        <br />
        <Button buttonTitle="작성하기" onClick={(event) => {
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
        }}></Button>
      </form>
      
    </DetailContainer>
  )
}

export default ArticleDetail;