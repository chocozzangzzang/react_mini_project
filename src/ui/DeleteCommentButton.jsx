import axios from 'axios';
import { BsTrash } from "react-icons/bs";
import React, { useState, useEffect } from 'react';

function DeleteCommentButton(props) {

    const [isWriterSame, setIsWriterSame] = useState(false);
    const {commentId, writer, isClicked} = props;
    // const navigate = useNavigate();

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");

        if(loginNowId === writer) setIsWriterSame(true);
        else setIsWriterSame(false);
    })

    return (
        isWriterSame ? (
            <BsTrash onClick={() => {
                axios.delete("http://localhost:3001/comment", {params : {commentId : commentId}})
                .then(response => {alert("댓글을 삭제하였습니다.");})
                .catch(error => console.log(error));
            }}/>   
        ) : null           
    )    
}

export default DeleteCommentButton;