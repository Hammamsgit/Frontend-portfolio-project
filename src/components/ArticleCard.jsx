import React from 'react';

function ArticleCard({title,author,body,votes,date,comments}) {
    const revisedDate = new Date(date)
    return (
        <div className="card">
            <h4 className="authorTag">{author}</h4>
          <h2>{title} </h2>
          <div className="tools">
          <p className="date"> Posted {date}</p>
          <p className="votes">votes {votes}</p>
            <p className="commentNum">comments {comments}</p>
          </div>
        </div>
      );
    }

export default ArticleCard;