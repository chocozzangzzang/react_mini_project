import React from 'react'
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function ModifyCommentButton(props) {

    const {commentId, onClick} = props;
    const navigate = useNavigate();

    return (
        <BsPencil onClick={onClick}
        />
    )
}

export default ModifyCommentButton;