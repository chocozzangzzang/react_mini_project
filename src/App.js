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
import Forecast from './forecast/Forecast';
import MemberDetail from './Page/MemberDetail';
import TestMain from './Page/TestMain';
import TestDesignedArticleDetail from './article/TestDesignedArticleDetail';
import TestModifyPage from './article/TestModifyPage';
import GoogleMemberDetail from './Page/GoogleMemberDetail';

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
          {/* <Route index element={<MainPage />}></Route>
          <Route path="/article" element={<MainPage />}></Route> */}

          <Route index element={<TestMain />}></Route>
          <Route path="/article" element={<TestMain />}></Route>
          <Route path="/article/:articleId" element={<TestDesignedArticleDetail />}></Route>
          <Route path="/article/modify/:articleId" element={<TestModifyPage />}></Route>

          {/* <Route path="/article/:articleId" element={<DesignedArticleDetail />}></Route> */}
          {/* <Route path="/article/:articleId" element={<ArticleDetail />}></Route> */}
          
          <Route path="/article/write" element={<WritePage />}></Route>
          {/* <Route path="/article/modify/:articleId" element={<ModifyPage />}></Route> */}
          {/* <Route path="/member/register" element={<RegisterPage />}></Route> */}
          <Route path="/member/register" element={<SignUp />}></Route>
          <Route path="/member/detail" element={<MemberDetail />}></Route>
          <Route path="/member/googleDetail" element={<GoogleMemberDetail />}></Route>
          {/* <Route path="/member/login" element={<LoginPage />}></Route> */}
          <Route path="/member/login" element={<Login />}></Route>
          <Route path="/forecast" element={<Forecast />}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
