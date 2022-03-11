import * as api from "../utils/api";
import moment from 'moment';
import React, { useState, useEffect } from "react";


function CommentCard({comment_id,author,body,votes,date}) {
  const [authorised, setAuthorised]=useState(false);
  const [deleteIcon,setDelete] = useState(null);
  const [error,setError] = useState(null);
  const [newBody,setBody] = useState(body)

  const handleDelete = () => {
    api.deleteCommentById(comment_id).catch((err) => {
      setError("Hmmm what seems to be the officer problem ?")
    });
    setBody("Comment deleted")
    setDelete(null)
  };

  useEffect(() => {
    if (author === "grumpy19") {
      setAuthorised(true);
      setDelete(
        <img  className="vte" onClick={handleDelete} src="https://img.icons8.com/ios-filled/50/ffffff/delete-sign--v1.png"/>
      );
    }
  }, []);

 
    const revisedDate= moment(date).utc().fromNow()
    return (
        <div className="cCard">
          <div className="cTools">
            <h4 className="bin" >{deleteIcon}</h4>
            <h4 className="authorTag"> <img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"/>{author}</h4>
            </div>
            <>{error}</>
            <></>
          <p>{newBody} </p> 
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png"/>{votes}</p>
          </div>
          
        </div>
      );
    }

export default CommentCard;