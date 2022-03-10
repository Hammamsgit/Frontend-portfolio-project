import React from 'react';
import moment from 'moment';


function CommentCard({author,body,votes,date}) {
    const revisedDate= moment(date).utc().fromNow()
    return (
        <div className="cCard">
            <h4 className="authorTag"><img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"/>{author}</h4>

          <p>{body} </p> 
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png"/>{votes}</p>
          </div>
          
        </div>
      );
    }

export default CommentCard;