import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function DesignedComment(props) {

    const {comments} = props;

    return (
        <div>
            {
                comments.length == 0 ? (
                    <Typography variant="h5">작성된 댓글이 없습니다.</Typography>
                ) : (
                        comments.map((comment) => (
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
                        </Grid>
                        ))
                 )
            }
            
        </div>
    )
}

export default DesignedComment