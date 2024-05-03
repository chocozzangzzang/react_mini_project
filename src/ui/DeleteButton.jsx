import axios from 'axios';
import React from 'react'
import { BsTrash } from "react-icons/bs";
// import { useNavigate } from 'react-router-dom';

function DeleteButton(props) {

    const {articleId} = props;
    // const navigate = useNavigate();

    return (            
        <BsTrash onClick={() => {
            axios.delete("http://localhost:3001/article", {params : {articleId : articleId}})
            .then(response => {alert(`${response.data}번 게시글을 삭제하였습니다.`); console.log(response)})
            .catch(error => console.log(error));
        }}/>
    )
}

export default DeleteButton;