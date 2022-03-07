import React, {useState, useEffect } from 'react';
import * as api from "../utils/api";
import ArticleCard from './ArticleCard';

function ArticleList(props) {
    const [article, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
    api.getArticles().then((articles) => {
        console.log(articles)
        setArticles(articles);
        setIsLoading(false);
        return articles;
      
    })}, []);

    return isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {article.map(({ article_id, title, author, body, created_at,votes,comment_count}) => {
            return (
              <li key={article_id}>
                <ArticleCard
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