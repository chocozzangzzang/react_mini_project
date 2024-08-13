import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import CommentModal from './../ui/CommentModal';


const ButtonDiv = styled.div`
    display : flex;
    justify-content : right;
`;


function DesignedComment(props) {

    const {comments, commentChange} = props;
    const [allComment, setAllComment] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalOpenIndex, setModalOpenIndex] = useState(null);
    
    const openModal = (index) => {
      setModalOpenIndex(index);
    }

    useEffect(() => {
        setAllComment(comments)
    }, []);

  
    const closeModal = (before, after, idx) => {

        if(after !== "" && before !== after) {
            
            const tempComments = [...allComment];

            tempComments[idx] = { ...tempComments[idx], comment : after};

            setAllComment(tempComments);

            handleChange(tempComments);

            alert("댓글이 수정되었습니다.");
        } else {
            alert("댓글이 수정되지 않았습니다.")
        }
        setModalOpenIndex(null);
    }
    
    const closeOnlyModal = () => {
        setModalOpenIndex(null);
    }

    const handleChange = (comments) => {
        commentChange(comments);
    }

    const nowId = sessionStorage.getItem("memberid");

    return (
        <div>
            {
                allComment.length == 0 ? (
                    <Typography variant="h5">작성된 댓글이 없습니다.</Typography>
                ) : (
                        allComment.map((comment, index) => (
                            <Grid item xs={12} md={6}>
                                <Card sx={{ display: 'flex', padding: 2 }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5" paragraph>
                                        {comment.comment}
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                        작성자 : {comment.writer}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                        작성일자 : {comment.writeDate} 수정일자 : {comment.modifyDate}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            {
                                nowId === comment.writer && (
                                        <ButtonDiv>
                                            <Button
                                                onClick={() => openModal(index)}
                                            >
                                            댓글 수정
                                            </Button>
                                            <CommentModal 
                                                open={modalOpenIndex === index} close={closeModal} 
                                                header="댓글 수정" nowComment={comment.comment} idx={index} com={closeOnlyModal}
                                            >
                                                수정할 댓글을 입력해주세요.
                                            </CommentModal>
                                            <Button
                                            type="submit"
                                            onClick={(event) => {
                                                const newComment = JSON.parse(JSON.stringify(allComment))
                                                newComment.splice(index, 1);
                                                // console.log(newComment);
                                                setAllComment(newComment);
                                            }}>
                                            댓글 삭제
                                            </Button>
                                        </ButtonDiv>
                                    
                                )
                            }
                            </Grid>
                        ))
                 )
            }
            
        </div>
    )
}

export default DesignedComment