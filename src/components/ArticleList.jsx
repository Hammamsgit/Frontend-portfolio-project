import React, {useState, useEffect,useContext } from 'react';
import * as api from "../utils/api";
import ArticleCard from './ArticleCard';
import {Link, useParams} from "react-router-dom";
import {sortContext,orderContext} from "../utils/Context";
function ArticleList(props) {
    const [article, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {sort} = useContext(sortContext);
    const {order} = useContext(orderContext);
    const{topic}=useParams()
    console.log({topic,sort},"sort")
    useEffect(()=>{
 
    api.getArticles(topic,sort,order).then((articles) => {
        console.log(articles)
        setArticles(articles);
        setIsLoading(false);
        return articles;
      
    })}, [topic,sort,order]);

    return isLoading ? (
        <p>Loading...</p>
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