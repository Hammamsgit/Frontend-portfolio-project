import React from 'react';
import {useState,useEffect, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import * as api from "../utils/api";

function NavBar({openSideBar}) {
    const [topic, setTopics] = useState([]);

    const [isMobile, setIsMobile] = useState(false)
 
    //choose the screen size 
    const handleResize = () => {
    if (window.innerWidth < 720) {
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
  
            <div className="linkBox">
          {topic.map((topic) => {
            return (<Link key={topic.slug} className="topicLink" to={`/articles/${topic.slug}`}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link>
              
            );
          })}
        </div>

        </nav>
    );
}

export default NavBar;