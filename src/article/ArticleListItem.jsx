import React from 'react'
import styled from "styled-components";
import DeleteButton from '../ui/DeleteButton';
import ModifyButton from '../ui/ModifyButton';
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
    font-size : 32px;
    font-weight : bold;
`;

const ArticleContent = styled.p`
    font-size : 24px;
    padding-right : 8px;
`;

const ContentWrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items : baseline;
    justify-content : center;
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
                #{article.id}.. {article.title}
            </ArticleTitle>
            <ContentWrapper>
                <ArticleContent>{article.content}</ArticleContent>
                <DeleteButton articleId={article.id}/>
                <ModifyButton articleId={article.id}/>
            </ContentWrapper>
        </Wrapper>
    )
}

export default ArticleListItem;