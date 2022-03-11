import React, { useState, useEffect,useContext } from "react";
import * as api from "../utils/api";
import moment from "moment";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import Collapse from "./Collapse";
import {userContext} from "../utils/Context";


function SingleArticle(props) {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [vote, setVote] = useState(0);
  const [activeVote, setActiveVote] = useState(false);
  const [error,setError]=useState(false)
  const [pageError,setPageError]=useState(null)
  const [comment,setComment]=useState([])
  const [busy, setBusy]=useState(false)
  const [commentError,setCommentError]=useState(false)
  const [open, setOpen] = useState(false);
  const {loggedInUser} = useContext(userContext)

  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      console.log(article, "This is from single article ");
      setArticle(article);
      setPageError(false);
      setVote(article.votes);
      setIsLoading(false);
      return article;
    }).catch(({response:{data:{msg},status}})=>{
      setPageError({status,msg})
      setIsLoading(false)
    });
    api.getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      return comments;
    });
  }, []);
  const revisedDate = moment(article.created_at).utc().format("DD/MM/YYYY");

  const incVote = (num) => {
    if (!activeVote) {
      api.patchVote(article_id, num).catch(()=>{
        setVote((currVotes) => {
            setError(true);
            setActiveVote(false);
            return currVotes - 1;
          });
      });

      setVote((currVotes) => {
        return currVotes + 1;
      });
      setError(false);
      setActiveVote(true);
    } else {
      api.patchVote(article_id, -num).catch(()=>{
        setVote((currVotes) => {
            setError(true);
            setActiveVote(false);
            return currVotes + 1;
            
          });
          
      });;
      setVote((currVotes) => {
        return currVotes - 1;
      });
      setError(false);
      setActiveVote(false);
    }
  };

  const postComment = (state)=>{
    setBusy(true)
    api.postComment(article_id,loggedInUser,state).then((comment)=>{
      setComment("")
      setComments(preState=> [...preState,comment])
      setBusy(false)
    }).catch((err)=>{
      setCommentError(true)
    })
    setCommentError(false)
  }


  if (isLoading){
    return (
      <p>Loading...</p>
    )
  
  }
  return pageError ? ( 
    <div className="card">
      <h3 >{pageError.status}:{pageError.msg}</h3>
      </div>):(
 
    <div className="card">
      <h4 className="authorTag">
        <img
          className="vte"
          src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
        />
        {article.author}
      </h4>

      <h2>{article.title} </h2>
      <p>{article.body}</p>
      <div className="tools">
        <p className="date"> Posted {revisedDate}</p>
        <p className="votes" onClick={() => {
              incVote(1);
            }}>
          {error ?  <img className="vte" src="https://img.icons8.com/material/50/000000/cancel-2--v1.png"/>:  !activeVote ? <img
            className="vte"
            src="https://img.icons8.com/ios-glyphs/30/000000/star-half-empty.png"
 
          /> : <img className="vte1" src="https://img.icons8.com/external-filled-line-kendis-lasman/64/000000/external-star-graphic-design-filled-line-filled-line-kendis-lasman.png"/>}
 
          {vote}
        </p>
        <p className="commentNum" onClick={() => {
              setOpen(!open);
            }}>
          <img
            className="vte"
            src="https://img.icons8.com/material-two-tone/100/000000/comments--v2.png"
          />
          {article.comment_count}
        </p>
      </div>
      <Collapse on={open}>
      <div className="commentSection">
        {comments.map(({ comment_id, author, body, created_at, votes }) => {
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
        
        <div className="postComment">
          <form >
            <li>
          <textarea className="inputBox" type="text" value={comment} onChange={(e) => {setComment(e.target.value)}}> Type comment here....</textarea>
          <span>
            {!commentError ? !busy ?  <img className="post" onClick={() => {
              if(comment.length>0)postComment(comment);
            }} src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-arrow-arrow-flatart-icons-lineal-color-flatarticons-6.png"/>
          :  <p className="post"> <img className="post" disabled onClick={() => {
            if(comment.length>0)postComment(comment);
          }} src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-arrow-arrow-flatart-icons-lineal-color-flatarticons-6.png"/> 
          <p>Posting . . .</p></p> : <p className="post"> <img className="post" disabled onClick={() => {
            if(comment.length>0)postComment(comment);
          }} src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-arrow-arrow-flatart-icons-lineal-color-flatarticons-6.png"/> 
          <p>Sorry, comment was not posted... </p></p> }
         
          </span>
          </li>
          </form>
        </div>
      </div>
      </Collapse>
    </div>
  );
}

export default SingleArticle;
