import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useState } from 'react';

const ButtonDiv = styled.div`
    display : flex;
    justify-content : right;
`;

function DesignedComment(props) {

    const {comments, commentChange} = props;
    const [allComment, setAllComment] = useState([]);

    useEffect(() => {
        setAllComment(comments)
    }, []);

    const handleChange = (comments) => {
        commentChange(comments);
    }

    const nowId = sessionStorage.getItem("memberid");

    return (
        <div>
            {
                comments.length == 0 ? (
                    <Typography variant="h5">작성된 댓글이 없습니다.</Typography>
                ) : (
                        comments.map((comment, index) => (
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
                                        type="submit"
                                        onClick={(event) => {
                                            const newComment = JSON.parse(JSON.stringify(allComment))
                                            newComment.splice(index, 1);
                                            // console.log(newComment);
                                            handleChange(newComment);
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