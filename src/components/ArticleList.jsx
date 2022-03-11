import React, {useState, useEffect,useContext } from 'react';
import * as api from "../utils/api";
import ArticleCard from './ArticleCard';
import {Link, useParams} from "react-router-dom";
import {sortContext,orderContext,userContext} from "../utils/Context";
function ArticleList(props) {
    const [article, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error,setError]=useState(null);
    const {sort} = useContext(sortContext);
    const {order} = useContext(orderContext);
    const{topic}=useParams()
    console.log({topic,sort},"sort")

    useEffect(()=>{
    api.getArticles(topic,sort,order).then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setError(false);
        return articles;
      
    }).catch(({response:{data:{msg},status}})=>{
      setError({status,msg})
      setIsLoading(false)
    })}, [topic,sort,order]);
    if (isLoading){
      return (
        <p>Loading...</p>
      )
    
    }
    return error ? ( 
      <div className="card">
        <h3 >{error.status}:{error.msg}</h3>
        </div>
      ) : (
        <div>
          {article.map(({ article_id, title, author, body, created_at,votes,comment_count}) => {
            return (
              <li key={article_id}>
                
                <ArticleCard
                article_id={article_id}
                  title={title}
                  author={author}
                  body={body}
                  votes={votes}
                  date={created_at}
                  comments={comment_count}
                />
              </li>
            );
          })}
        </div>
      );
    }

export default ArticleList;