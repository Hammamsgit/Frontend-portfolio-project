import React from 'react';
import {useState,useEffect,useContext, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import * as api from "../utils/api";
import {userContext} from "../utils/Context";

function NavBar({openSideBar}) {
    const [topic, setTopics] = useState([]);

    const {loggedInUser} = useContext(userContext)
    const [isMobile, setIsMobile] = useState(false)
 
    //choose the screen size 
    const handleResize = () => {
    if (window.innerWidth < 640) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
    }

    // create an event listener
    useEffect(() => {
    window.addEventListener("resize", handleResize)
    },[isMobile])


    useLayoutEffect(()=>{
        api.getTopics().then((topics) => {
            console.log(topics, "from nav bar")
            setTopics(topics);
            return topics;
          
        })}, []);

    if(isMobile){
        return ( <nav className="navBar" >
        <Link className="homeLink" to="/">
        <h2 className="logo">Reibo</h2>
        </Link>
        

       
        <div className="burger" onClick={openSideBar}> 
        <img src="https://img.icons8.com/material-rounded/24/ffffff/menu--v1.png" alt="menu"/>
        
        </div> 
        </nav>)
    }
    
    return (
        <nav className="navBar" >
            <Link className="homeLink" to="/">
            <h2 className="logo">Reibo</h2>
            </Link>
            <div className="box">
            <div className="userName"><Link className="userName" to="/users/signIn">
    
           {loggedInUser} </Link></div>
  
            <div className="linkBox">
          {topic.map((topic) => {
            return (<Link key={topic.slug} className="topicLink" to={`/articles/${topic.slug}`}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link>
              
            );
          })}
        </div>
        </div>
        </nav>
    );
}

export default NavBar;