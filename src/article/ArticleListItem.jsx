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


const ArticleWriter = styled.p`
    font-size : 24px;
    font-weight : bold;
`;

const ArticleDate = styled.p`
    font-size : 12px;
    text-align : right;
`;

const DateDiv = styled.div`
    display : inline-block;
    width : 100%;
    justify-content : right;
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
            <DateDiv>
                <ArticleDate>작성일자 : {article.writedate}</ArticleDate>
                <ArticleDate>수정일자 : {article.modifydate}</ArticleDate>
            </DateDiv>
        </Wrapper>
    )
}

export default ArticleListItem;