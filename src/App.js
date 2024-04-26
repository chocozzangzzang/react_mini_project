import styled from 'styled-components';
import './App.css';
import ArticleList from './article/ArticleList';
import data from "./data.json";

const AllContainer = styled.div`
  padding : 16px;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;

  & > * {
    :not(:last-child) {
        margin-bottom : 24px;
    }
  }
`;

function App() {
  return (
    <AllContainer>
      <ArticleList
       posts={data}
      />
    </AllContainer>
    
  );
}

export default App;
