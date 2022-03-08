import React, {useState, useEffect } from 'react';
import * as api from "../utils/api";
import moment from 'moment';
import {useParams} from "react-router-dom";
import CommentCard from './CommentCard';


function SingleArticle(props) {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [comments,setComments] =useState([])
    const[vote,setVote]=useState(1);
    const[activeVote,setActiveVote]=useState(true);

    const [open, setOpen]=useState(false);
    
    const{article_id}=useParams()

    

    useEffect(()=>{
        api.getArticleById(article_id).then((article)=>{
            console.log(article, "This is from single article ")
            setArticle(article)
            setIsLoading(false)
            return article
        })
        api.getCommentsByArticleId(article_id).then((comments)=>{
            setComments(comments)
            return comments
        })

    },[])
    const revisedDate= moment(article.created_at).utc().format('DD/MM/YYYY')

    const incVote = (id, num)=>{
        
        
        // if(activeVote){
        //     api.patchVote(id,-num);
        //     setActiveVote(false)
        // }else{api.patchVote(id,num)
        //     setActiveVote(true);}

    }
    return (
        <div className="card">
            
            <h4 className="authorTag"><img className="vte" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"/>{article.author}</h4>

          <h2>{article.title} </h2> 
          <p>{article.body}</p>
          <div className="tools">
          <p className="date"> Posted {revisedDate}</p>
          <p className="votes"> <img className="vte"src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png" onClick={()=>{incVote(article_id, vote)}}/>{article.votes}</p>
            <p className="commentNum"><img className="vte" src="https://img.icons8.com/material-two-tone/100/000000/comments--v2.png"/>{article.comment_count}</p>
          </div>
          <div className="commentSection">
          {comments.map(({comment_id, author, body, created_at,votes}) => {
            return (
              <li key={comment_id}>
                
                <CommentCard
                comment_id={comment_id}
                  author={author}
                  body={body}
                  votes={votes}
                  date={created_at}
                />
              </li>
            );
          })}
          </div>

          
        </div>
    );
}

export default SingleArticle;