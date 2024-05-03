import './App.css';
// import data from "./data.json";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Page/MainPage';
import WritePage from './Page/WritePage';
import ModifyPage from './Page/ModifyPage';
import ArticleDetail from './article/ArticleDetail';

const MainTitleText = styled.p`
  font-size : 24px;
  font-weight : bold;
  text-align : center;
`;

function App() {

  return (
    <BrowserRouter>
      <Link to="/">
        <MainTitleText>==DB 연결 프로젝트==</MainTitleText>
      </Link>    
      <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path="/article" element={<MainPage />}></Route>
          <Route path="/article/:articleId" element={<ArticleDetail />}></Route>
          <Route path="/article/write" element={<WritePage />}></Route>
          <Route path="/article/modify/:articleId" element={<ModifyPage />}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
