// import axios from 'axios';
import React from 'react'
import { BsPencil } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function ModifyButton(props) {

    const {articleId} = props;
    const navigate = useNavigate();

    return (
        <BsPencil onClick={() => {
            navigate(`/article/modify/${articleId}`);
        }}/>
    ) 
}

export default ModifyButton;