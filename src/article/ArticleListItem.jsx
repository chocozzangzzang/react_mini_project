import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
    border : 1px solid grey;
    border-radius : 16px;
    max-width : 1440px;
    padding : 24px;
`;

const ArticleTitle = styled.p`
    font-size : 24px;
    font-weight : bold;
`;

const ContentWrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items : baseline;
    justify-content : center;
`;

const ArticleWriter = styled.p`
    font-size : 24px;
    font-weight : bold;
`;

function ArticleListItem(props) {

    const {article} = props;
    const navigate = useNavigate();

    return (
        <Wrapper>
            <ArticleTitle
                onClick={() => {
                    navigate(`/article/${article.id}`);
                }}
            >
                제목 : {article.title}
            </ArticleTitle>
            <ArticleWriter>작성자 : {article.writer}</ArticleWriter>
        </Wrapper>
    )
}

export default ArticleListItem;