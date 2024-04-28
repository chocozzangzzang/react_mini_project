import './App.css';
// import data from "./data.json";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Page/MainPage';
import WritePage from './Page/WritePage';

const MainTitleText = styled.p`
  font-size : 24px;
  font-weight : bold;
  text-align : center;
`;

function App() { 
  return (
    <BrowserRouter>
      <MainTitleText>==DB 연결 프로젝트==</MainTitleText>
      <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path="/article" element={<MainPage />}></Route>
          <Route path="/article/write" element={<WritePage />}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
