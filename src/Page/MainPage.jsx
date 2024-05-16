import styled from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import ArticleList from "../article/ArticleList";
// import Button from "../ui/Button";
import Button from "@mui/material/Button";

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

const Demo = styled.div``;

const ButtonDiv = styled.div`
    max-width : 1440px;
    display : flex;
    justify-content : right;
    padding : 24px;
`;


function MainPage() {

    const [article, setArticle] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    async function fetchArticle() {
        const response = await axios.get("http://localhost:3001/article");
        setArticle(response.data);
    }

    useEffect(() => {
        fetchArticle();
    }, [article]);

    useEffect(() => {
        const loginNowId = sessionStorage.getItem("memberid");
        
        if(loginNowId) setLoggedIn(true);
        else setLoggedIn(false);
    })

    const navigate = useNavigate();

    return (
        <HomePage>
            {/* <Button 
                buttonTitle="글 작성하기!!!"
                onClick={() => {
                    if(loggedIn) navigate("/article/write");
                    else {
                        alert("로그인한 유저만 게시글을 작성할 수 있습니다.");
                        navigate("/member/login");
                    }
                }}
            /> */}

        <AllContainer>
            <ArticleList articles={article}/>
        </AllContainer>
        <ButtonDiv>
            <Button 
                variant="contained"
                onClick={() => {
                    if(loggedIn) navigate("/article/write");
                    else {
                        alert("로그인한 유저만 게시글을 작성할 수 있습니다.");
                        navigate("/member/login");
                    }
                }}>글 작성하기
            </Button>
        </ButtonDiv>
        </HomePage>
    )
}

export default MainPage;