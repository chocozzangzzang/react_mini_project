import axios from 'axios';
import { BsTrash } from "react-icons/bs";
import React from 'react'

function DeleteCommentButton(props) {

    const {commentId} = props;
    // const navigate = useNavigate();

    return (            
        <BsTrash onClick={() => {
            axios.delete("http://localhost:3001/comment", {params : {commentId : commentId}})
            .then(response => {alert("댓글을 삭제하였습니다.");})
            .catch(error => console.log(error));
        }}/>
    )    
}

export default DeleteCommentButton;