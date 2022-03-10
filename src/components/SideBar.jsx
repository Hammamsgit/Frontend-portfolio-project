import React from 'react';
import {useState, useLayoutEffect,useContext } from 'react';
import { Link } from "react-router-dom";
import * as api from "../utils/api";
import {userContext} from "../utils/Context";

function SideBar({sideBar}) {
    const {loggedInUser} = useContext(userContext)
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
          <li><Link className="topicLinks" to="/users/signIn">
    
    {loggedInUser} </Link></li>
    
            
        </div>
    );
}

export default SideBar;