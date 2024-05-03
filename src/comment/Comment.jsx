import React, { useState } from 'react'
import styled from 'styled-components';
import DeleteCommentButton from '../ui/DeleteCommentButton';
import ModifyCommentButton from '../ui/ModifyCommentButton';
import TextInput from '../ui/TextInput';
import axios from 'axios';

const CommentWrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items : flex-start;
    border : 1px solid grey;
    border-radius : 16px;
    max-width : 1440px;
    width : 100%;
    padding : 16px;
    margin-top : 8px;
    margin-bottom : 8px;
`;

const Alls = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
`;

function Comment(props) {

    const [comment, setComment] = useState(props.comment);
    const [preComment, setPreComment] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    async function modifyComment() {
        try {
            await axios.put("http://localhost:3001/comment", {comment})
            .then(response => console.log(response))
            .catch(error => console.log(error))
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Alls>
            {isClicked ? (
                <TextInput height={20} value={comment.comment} onChange={(event) => {setComment({
                    id : comment.id, articleid : comment.articleid, comment : event.target.value
                })}}></TextInput>
            ) : (
                <CommentWrapper>
                    {comment.comment}
                </CommentWrapper>
            )}
            <DeleteCommentButton commentId={comment.id}/>
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
                }}/>
            ) : (
                <ModifyCommentButton 
                commentId={comment.id} 
                onClick={() => {
                    setPreComment(comment);
                    setIsClicked(!isClicked);
                }}/>
            )}
            
        </Alls>
    )
}

export default Comment;