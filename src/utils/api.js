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
    return topics;
  });
};

export const getArticleById = (id) => {
  return reiboApi.get(`/articles/${id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const getArticlesByTopic = (topic) => {
  return reiboApi
    .get(`/articles?topic=${topic}`)
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getCommentsByArticleId = (id) => {
  return reiboApi
    .get(`/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const patchVote = (id, vote) => {
  return reiboApi
    .patch(`/articles/${id}`, { inc_votes: vote })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const postComment = (id, comment) => {
  return reiboApi.post(`/articles/${id}/comments`, {username:"grumpy19",body:comment}).then(({data: {comment}}) => {
    return comment;
  });
};
