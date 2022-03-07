
import './App.css';
import ArticleList from './components/ArticleList';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div>
      <ArticleList />
      </div>
    </div>
  );
}

export default App;
