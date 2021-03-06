import axios from "axios";

const reiboApi = axios.create({
  baseURL: "https://reibo.herokuapp.com/api",
});

export const getArticles = (topic,sort_by,order) => {
  
  return reiboApi.get("/articles",{
    params: { topic: topic, sort_by: sort_by, order: order}
  }).then(({ data: { articles } }) => {
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

export const postComment = (id, user,comment) => {
  return reiboApi.post(`/articles/${id}/comments`, {username:user,body:comment}).then(({data: {comment}}) => {
    return comment;
  });
};

export const deleteCommentById = (id) => {
  return reiboApi.delete(`/comments/${id}`).then((res) => {
    return res;
  });
};
