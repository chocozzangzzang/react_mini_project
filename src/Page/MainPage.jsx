import styled from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import ArticleList from "../article/ArticleList";
import Button from "../ui/Button";


const HomePage = styled.div`
  padding : 16px;
`;

const AllContainer = styled.div`
  display : flex;
  width : (100% - 32px);
  flex-direction : column;
  align-items : center;
  justify-content : center;

  & > * {
    :not(:last-child) {
        margin-bottom : 24px;
    }
  }
`;

function MainPage() {

    const [article, setArticle] = useState([]);

    async function fetchArticle() {
        const response = await axios.get("http://localhost:3001/article");
        setArticle(response.data);
    }

    useEffect(() => {
        fetchArticle();
    }, []);

    const navigate = useNavigate();

    return (
        <HomePage>
            <Button 
                buttonTitle="글 작성하기!!!"
                onClick={() => {
                    navigate("/article/write")
                }}
            />
            <AllContainer>
                <ArticleList articles={article}/>
            </AllContainer>
        </HomePage>
    )
}

export default MainPage;