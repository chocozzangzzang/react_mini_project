import React, { useEffect, useState } from "react";
import "./modal.css";
import { TextField } from "@mui/material";

const CommentModal = (props) => {

    const { open, close, header, nowComment, idx, com} = props;

    const [beforeComment, setBeforeComment] = useState("");
    const [comment, setComment] = useState("");

    const closeOnlyModal = () => {
        com();
    }

    const returnResult = () => {
        props.close(beforeComment, comment, idx);        
    }

    useEffect(() => {
        setComment(nowComment);
        setBeforeComment(nowComment);
    }, [])

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {
                open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={closeOnlyModal}>
                                &times;
                            </button>
                        </header>
                        <main>
                            {props.children}
                            <br />
                            <br />
                            <TextField
                                value={comment}
                                onChange={(event) => {setComment(event.target.value)}}
                                required
                                fullWidth
                                name="newComment"
                                label="newComment"
                                type="newComment"
                                id="newComment"
                                autoComplete="newComment"
                            />
                        </main>
                        <footer>
                            <button className="close" onClick={returnResult}>
                                댓글수정
                            </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    )
};

export default CommentModal;