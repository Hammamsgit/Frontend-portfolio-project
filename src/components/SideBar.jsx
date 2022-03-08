import React from 'react';
import {useState, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import * as api from "../utils/api";

function SideBar({sideBar}) {
    const [topic, setTopics] = useState([]);
    useLayoutEffect(()=>{
        api.getTopics().then((topics) => {
            console.log(topics, "from nav bar")
            setTopics(topics);
            return topics;
          
        })}, []);
    return (
        <div className={sideBar? "sideBar sideBar--open":"sideBar"}>
            <li className="listHeading">Topics</li>
            {topic.map((topic) => {
            return (<li key={topic.slug}><Link className="topicLinks" to={`/articles/${topic.slug}`}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link></li>
              
            );
          })}
    
            
        </div>
    );
}

export default SideBar;