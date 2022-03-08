import React from 'react';
import moment from 'moment'

function ArticleCard({title,author,votes,date,comments}) {
    const revisedDate= moment(date).utc().format('DD/MM/YYYY')
    return (
        <div className="card">
            <h4 className="authorTag"><img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"/>{author}</h4>
          <h2>{title} </h2>
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png"/>{votes}</p>
            <p className="commentNum"><img className="vte" src="https://img.icons8.com/material-two-tone/100/000000/comments--v2.png"/>{comments}</p>
          </div>
        </div>
      );
    }

export default ArticleCard;