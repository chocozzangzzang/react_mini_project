import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../comment/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

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

const ArticleTitle = styled.p`
    font-size : 32px;
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

function ArticleDetail() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const {articleId} = useParams();

  async function getArticle() {
    try {
        await axios.get(`http://localhost:3001/article/${articleId}`)
            .then(response => {
                setTitle((response.data)[0].title);
                setContent((response.data)[0].content);
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
    try {
      await axios.post(`http://localhost:3001/comment`, {articleId, comment})
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
        <ArticleTitle>
          #{articleId}.. {title}
        </ArticleTitle>
        <ContentWrapper>
          <ArticleContent>{content}</ArticleContent>
        </ContentWrapper>
      </WrapperA>
      <CommentList comments={comments}></CommentList>
      <CommentContent>==댓글 작성==</CommentContent>
      <form onSubmit={commentSubmit}>
        <TextInput height={20} value={comment} onChange={(event) => {setComment(event.target.value)}}></TextInput>
        <br />
        <Button buttonTitle="작성하기" onClick={(event) => {
          if(comment === "") {
            alert("댓글을 작성하세요");
            event.preventDefault();
          }
        }}></Button>
      </form>
      
    </DetailContainer>
  )
}

export default ArticleDetail;