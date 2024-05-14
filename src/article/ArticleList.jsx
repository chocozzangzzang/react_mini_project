import React, { useEffect } from 'react'
import ArticleListItem from './ArticleListItem';
import styled from 'styled-components';

const ArticleContainer = styled.div`
    padding : 16px;
    width : 100%;
    display : flex;
    flex-direction : column;
`;

function ArticleList(props) {

    const {articles} = props;

    return (
        <ArticleContainer>
            {articles 
                && 
                articles.map((article) => (
                <ArticleListItem
                    key={article.id}
                    article={article}
                />
            ))}
        </ArticleContainer>
    )
}

export default ArticleList;