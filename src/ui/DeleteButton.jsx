import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function DeleteButton(props) {

    const {articleId, writer} = props;
    const navigate = useNavigate();
    const [isWriterSame, setIsWriterSame] = useState(false);

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");

        if(loginNowId === writer) setIsWriterSame(true);
        else setIsWriterSame(false);
    })

    return (            
        isWriterSame ? (
                <BsTrash onClick={() => {
                    axios.delete("http://localhost:3001/article", {params : {articleId : articleId}})
                    .then(response => {alert(`${response.data}번 게시글을 삭제하였습니다.`); navigate("/");})
                    .catch(error => console.log(error));
                }}/>
        ) : null
    )
}

export default DeleteButton;