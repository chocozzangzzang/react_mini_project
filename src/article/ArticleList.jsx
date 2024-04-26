import React from 'react'
import ArticleListItem from './ArticleListItem';
import styled from 'styled-components';

function ArticleList(props) {

    const {posts} = props;

    const ArticleContainer = styled.div`
        padding : 16px;
        width : (100% - 32px);
        display : flex;
        flex-direction : column;
    `;

    return (
        <ArticleContainer>
            {posts.map((post) => (
                <ArticleListItem
                    key={post.id}
                    article={post}
                />
            ))}
        </ArticleContainer>
    )
}

export default ArticleList;