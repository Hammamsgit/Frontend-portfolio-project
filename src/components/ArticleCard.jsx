import React from 'react';
import moment from 'moment'

function ArticleCard({title,author,votes,date,comments}) {
    const revisedDate= moment(date).utc().format('DD/MM/YYYY')
    return (
        <div className="card">
            <h4 className="authorTag">{author}</h4>
          <h2>{title} </h2>
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes">votes {votes}</p>
            <p className="commentNum">comments {comments}</p>
          </div>
        </div>
      );
    }

export default ArticleCard;