import React, { useState } from 'react'
import styled from 'styled-components';
import DeleteCommentButton from '../ui/DeleteCommentButton';
import ModifyCommentButton from '../ui/ModifyCommentButton';
import TextInput from '../ui/TextInput';
import axios from 'axios';

const CommentWrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    border : 1px solid grey;
    border-radius : 16px;
    max-width : 1440px;
    width : 100%;
    padding : 16px;
    margin-top : 8px;
    margin-bottom : 8px;
`;

const CommentWriter = styled.p`
    font-size : 16px;
    font-weight : bold;
`;

const CommentContent = styled.p`
    font-size : 16px;
`;

const Alls = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
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

function Comment(props) {

    const [comment, setComment] = useState(props.comment);
    const [preComment, setPreComment] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    async function modifyComment() {
        console.log(comment);
        try {
            await axios.put("http://localhost:3001/comment", {comment})
            .then(response => console.log(response))
            .catch(error => console.log(error))
        } catch (e) {
            console.log(e.message);
        }
    }

    const today = new Date();
    const nowdate = `${today.toLocaleString()}`;

    return (
        <Alls>
            {isClicked ? (
                <TextInput height={20} value={comment.comment} onChange={(event) => {setComment({
                    id : comment.id, articleid : comment.articleid, comment : event.target.value, 
                    writerid : comment.writerid, writedate : comment.writedate, modifydate : nowdate
                })}}></TextInput>
            ) : (
                <CommentWrapper>
                    <CommentWriter>댓글 작성자 : {comment.writerid}</CommentWriter>
                    <CommentContent>댓글 : {comment.comment}</CommentContent>
                    <DateDiv>
                        <ArticleDate>작성일자 : {comment.writedate}</ArticleDate>
                        <ArticleDate>수정일자 : {comment.modifydate}</ArticleDate>
                    </DateDiv>
                </CommentWrapper>
            )}
            <DeleteCommentButton commentId={comment.id} writer={comment.writerid} isClicked={isClicked}/>
            {isClicked ? (
                <ModifyCommentButton 
                commentId={comment.id} 
                onClick={(event) => {
                    if(comment.comment === "" || comment.comment === preComment) {
                        setComment(preComment);
                        event.preventDefault();
                    }
                    else {
                        modifyComment();
                    }
                    setIsClicked(!isClicked);
                }}
                writer={comment.writerid}
                isClicked={isClicked}
                />
            ) : (
                <ModifyCommentButton 
                commentId={comment.id} 
                onClick={() => {
                    setPreComment(comment);
                    setIsClicked(!isClicked);
                }}
                writer={comment.writerid}
                isClicked={isClicked}/>
            )}
            
        </Alls>
    )
}

export default Comment;