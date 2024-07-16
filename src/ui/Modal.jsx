import React, { useState } from "react";
import "./modal.css";
import { TextField } from "@mui/material";
import CryptoJS from 'crypto-js';

const secretKey = "cocozzang";

const Modal = (props) => {

    const { open, close, header, nowPw, com } = props;

    const [pw, setPw] = useState("");

    const closeOnlyModal = () => {
        setPw("");

        com();
    }

    const returnResult = () => {
        
        const rawPW = CryptoJS.AES.decrypt(nowPw, secretKey);
        const inputPW = JSON.parse(rawPW.toString(CryptoJS.enc.Utf8)).pw;
        
        setPw("");

        if(inputPW === pw) props.close(true);
        else props.close(false);
        
    }

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
                                value={pw}
                                onChange={(event) => {setPw(event.target.value)}}
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </main>
                        <footer>
                            <button className="close" onClick={returnResult}>
                                회원탈퇴
                            </button>
                        </footer>
                    </section>
                ) : null
            }
        </div>
    )
};

export default Modal;