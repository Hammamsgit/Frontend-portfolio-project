import { useState } from "react";
import { Route, Routes } from "react-router";
import './App.css';
import ArticleList from './components/ArticleList';
import NavBar from './components/NavBar';
import SideBar from "./components/SideBar";
import {userContext,sortContext,orderContext} from "./utils/Context";
import SingleArticle from "./components/SingleArticle";
import SignInPage from "./components/SignInPage";


function App() {
  const [loggedInUser, setLoggedIn]=useState("Sign in")
  const [sort, setSort]=useState(null)
  const [order, setOrder]=useState(null)
  const[sideBar,setSideBar]=useState(false);

  const toggle = ()=>{
    setSideBar(preState => !preState)
  }
  return (
    <userContext.Provider value={{loggedInUser,setLoggedIn}}>
      <sortContext.Provider value={{sort,setSort}}>
      <orderContext.Provider value={{order,setOrder}}>
    <div className="App">
      <NavBar openSideBar={toggle}/>
      <SideBar sideBar={sideBar}/>
      <div>
      <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="*" element={<ErrorCard />}/>
      <Route path="/articles/:topic" element={<ArticleList />}/>
      <Route path="/article/:article_id" element={<SingleArticle />}/>
      <Route path="/users/signIn" element={<SignInPage />} />
      </Routes>
      </div>
    </div>
    </orderContext.Provider>
    </sortContext.Provider>
    </userContext.Provider>
  );
}

export default App;
