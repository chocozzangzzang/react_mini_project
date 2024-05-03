import React from 'react'
import Comment from './Comment';
import styled from 'styled-components';

const CommentContainer = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
`;

function CommentList(props) {

    const {comments} = props;

    return (
        <CommentContainer>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                >   
                </Comment>
            ))}
        </CommentContainer>
    )
}

export default CommentList;