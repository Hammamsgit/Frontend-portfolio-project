import axios from "axios";

const reiboApi = axios.create({
  baseURL: "https://reibo.herokuapp.com/api",
});

export const getArticles = () => {
  return reiboApi.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
};

export const getTopics = () => {
  return reiboApi.get("/topics").then(({ data: { topics } }) => {
    return topics
  });
};

export const getArticlesByTopic = (topic) => {
  return reiboApi.get(`/articles?topic=${topic}`).then(({ data: { articles } }) => {
   
    return articles;
  });
};
