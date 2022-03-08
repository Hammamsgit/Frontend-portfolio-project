import { useState } from "react";
import { Route, Routes } from "react-router";
import './App.css';
import ArticleList from './components/ArticleList';
import NavBar from './components/NavBar';
import SideBar from "./components/SideBar";
import SingleArticle from "./components/SingleArticle";


function App() {
  const[sideBar,setSideBar]=useState(false);

  const toggle = ()=>{
    setSideBar(preState => !preState)
  }
  return (
    <div className="App">
      <NavBar openSideBar={toggle}/>
      <SideBar sideBar={sideBar}/>
      <div>
      <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles/:topic" element={<ArticleList />}/>
      <Route path="/article/:article_id" element={<SingleArticle />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
