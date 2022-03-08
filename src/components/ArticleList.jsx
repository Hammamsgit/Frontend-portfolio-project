import React, {useState, useEffect } from 'react';
import * as api from "../utils/api";
import ArticleCard from './ArticleCard';
import {Link, useParams} from "react-router-dom";

function ArticleList(props) {
    const [article, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const{topic}=useParams()

    useEffect(()=>{
        if(topic)
    { api.getArticlesByTopic(topic).then((articles) => {
        console.log(articles,"from article list")
      setArticles(articles);
      setIsLoading(false);
      return articles;
    }) } else{
    api.getArticles().then((articles) => {
        console.log(articles)
        setArticles(articles);
        setIsLoading(false);
        return articles;
      
    })}}, [topic]);

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