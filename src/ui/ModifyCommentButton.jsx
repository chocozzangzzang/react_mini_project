import React, { useEffect, useState } from 'react'
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function ModifyCommentButton(props) {

    const {commentId, onClick, writer, isClicked} = props;
    const [isWriterSame, setIsWriterSame] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");
        console.log(writer, loginNowId);
        if(loginNowId === writer) setIsWriterSame(true);
        else setIsWriterSame(false);
    })

    return (
        isWriterSame ? (
            <BsPencil onClick={onClick}/>
        ) : null
    )
}

export default ModifyCommentButton;