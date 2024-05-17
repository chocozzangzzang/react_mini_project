import './App.css';
// import data from "./data.json";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Page/MainPage';
import WritePage from './Page/WritePage';
import ModifyPage from './Page/ModifyPage';
import ArticleDetail from './article/ArticleDetail';
import Toolbar from './ui/Toolbar';
import RegisterPage from './Page/RegisterPage';
import LoginPage from './Page/LoginPage';
import SignUp from './Page/DesignedRegister';
import Login from './Page/DesignedLogin';
import AppAppBar from './ui/AppAppBar';
import DesignedArticleDetail from './article/DesignedArticleDetail';

// const MainTitleText = styled.p`
//   font-size : 24px;
//   font-weight : bold;
//   text-align : center;
// `;

function App() {

  return (
    <BrowserRouter>
      {/* <Toolbar></Toolbar> */}
      <AppAppBar></AppAppBar>
      <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path="/article" element={<MainPage />}></Route>
          {/* <Route path="/article/:articleId" element={<ArticleDetail />}></Route> */}
          <Route path="/article/:articleId" element={<DesignedArticleDetail />}></Route>
          <Route path="/article/write" element={<WritePage />}></Route>
          <Route path="/article/modify/:articleId" element={<ModifyPage />}></Route>
          {/* <Route path="/member/register" element={<RegisterPage />}></Route> */}
          <Route path="/member/register" element={<SignUp />}></Route>
          {/* <Route path="/member/login" element={<LoginPage />}></Route> */}
          <Route path="/member/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
