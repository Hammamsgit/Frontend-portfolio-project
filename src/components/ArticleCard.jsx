import React from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

function ArticleCard({article_id,title,author,votes,date,comments}) {
    const revisedDate= moment(date).utc().fromNow()
    return (
        <div className="card">
            
            <h4 className="authorTag"><img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt="author tag"/>{author}</h4>
            <Link className="normal" to={`/article/${article_id}`}>
          <h2>{title} </h2> </Link>
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png" alt="votes icon"/>{votes}</p>
            <p className="commentNum"><img className="vte" src="https://img.icons8.com/material-two-tone/100/000000/comments--v2.png" alt="comments icon"/>{comments}</p>
          </div>
          
        </div>
      );
    }

export default ArticleCard;