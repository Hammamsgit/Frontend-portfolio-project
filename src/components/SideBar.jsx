import React from 'react';
import {useState, useLayoutEffect,useContext } from 'react';
import { Link } from "react-router-dom";
import * as api from "../utils/api";
import {userContext,sortContext,orderContext} from "../utils/Context";
import Collapse from "./Collapse";

function SideBar({sideBar}) {
    const {loggedInUser} = useContext(userContext)
    const [topic, setTopics] = useState([]);
    const {setSort} = useContext(sortContext)
    const {setOrder} = useContext(orderContext)
    const [openTopics, setOpenTopics] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    useLayoutEffect(()=>{
        api.getTopics().then((topics) => {
            setTopics(topics);
            return topics;
          
        })}, []);
    return (
        <div className={sideBar? "sideBar sideBar--open":"sideBar"}>
            <li className="listHeading" onClick={() => {
              setOpenTopics(!openTopics);
            }}>Topics</li>
            <Collapse on={openTopics}>
            {topic.map((topic) => {
            return (<li key={topic.slug}><Link className="topicLinks" to={`/articles/${topic.slug}`}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link></li>
              
            );
          })}</Collapse>
           <li className="listHeading" onClick={() => {
              setOpenSort(!openSort);
            }}>Sort</li>
            <Collapse on={openSort}><li className="topicLink">
            <label key={1} className="sortLinks" onClick={()=>{{setSort("created_at")}}} >Date</label></li>
            <li className="topicLink">
          <label key={2} className="sortLinks" onClick={()=>{{setSort("comment_count")}}}>Comments</label></li>
          <li className="topicLink">
          <label key={3} className="sortLinks" onClick={()=>{{setSort("votes")}}}>Votes</label></li>
          </Collapse>

<li className="listHeading" onClick={() => {
              setOpenOrder(!openOrder);
            }}>Order</li>
            <Collapse on={openOrder}>
            <li className="topicLink">
          <label key={2} className="sortLinks" onClick={()=>{{setOrder("comment_count")}}}>Ascending</label></li>
          <li className="topicLink">
          <label key={3} className="sortLinks" onClick={()=>{{setOrder("votes")}}}>Descending</label></li>
          </Collapse>
          <li><Link className="username" to="/users/signIn">
    
    {loggedInUser} </Link></li>
    
            
        </div>
    );
}

export default SideBar;