import * as api from "../utils/api";
import moment from 'moment';
import React, { useState, useEffect,useContext } from "react";
import {userContext} from "../utils/Context";

function CommentCard({comment_id,author,body,votes,date}) {
  const [deleteIcon,setDelete] = useState(null);
  const [error,setError] = useState(null);
  const [newBody,setBody] = useState(body);
  const [issue, setIssue] = useState(false)
  const {loggedInUser} = useContext(userContext)

  const handleDelete = () => {
    api.deleteCommentById(comment_id).then(()=>{ if(!issue){
      setBody("Comment deleted")
      setDelete(null)}}).catch((err) => {
      setIssue(true)
      setError("Hmmm what seems to be the officer problem ?")
    });
 
  };

  useEffect(() => {
    if (author === loggedInUser && !issue) {
      setDelete(
        <img  className="vte" onClick={handleDelete} src="https://img.icons8.com/ios-filled/50/ffffff/delete-sign--v1.png" alt="delete button"/>
      );
    }
  }, [body]);

    const revisedDate= moment(date).utc().fromNow()
    return (
        <div className="cCard">
          <div className="cTools">
            <h4 className="bin" >{deleteIcon}</h4>
            <h4 className="authorTag"> <img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt="user icon"/>{author}</h4>
            </div>
            <>{error}</>
            <></>
          <p>{newBody} </p> 
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png" alt="votes icon"/>{votes}</p>
          </div>
          
        </div>
      );
    }

export default CommentCard;