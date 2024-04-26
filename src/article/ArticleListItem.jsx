import React from 'react'
import styled from "styled-components";

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
    font-size : 32px;
    font-weight : bold;
`;

const ArticleContent = styled.p`
    font-size : 24px;
`;

function ArticleListItem(props) {

    const {article} = props;

    return (
        <Wrapper>
            <ArticleTitle>#{article.id}.. {article.title}</ArticleTitle>
            <ArticleContent>{article.content}</ArticleContent>
        </Wrapper>
    )
}

export default ArticleListItem;