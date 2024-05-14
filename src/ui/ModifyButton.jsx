// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { BsPencil } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';

function ModifyButton(props) {

    const {articleId, writer} = props;
    const navigate = useNavigate();
    const location = useLocation();

    const [isWriterSame, setIsWriterSame] = useState(false);

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");

        if(loginNowId === writer) setIsWriterSame(true);
        else setIsWriterSame(false);
    })

    return (
        isWriterSame ? (
            <BsPencil onClick={() => {
                navigate(`/article/modify/${articleId}`, {state : location.pathname});
            }}/>
        ) : null
    ) 
}

export default ModifyButton;