const express = require('express')
const { getUsers } = require('./controllers/users.controllers')
const {  getArticles, getArticleById, getComment, getVotes, postComment } = require('./controllers/articles.controllers')
const { getTopics } = require('./controllers/topics.controllers')
const { removeComment } = require('./controllers/comments.controllers')
const app = express()

app.use(express.json());

//topics
app.get('/api/topics', getTopics)

// users
app.get('/api/users', getUsers);

// // articles 
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getComment);
app.patch('/api/articles/:article_id', getVotes);
app.post('/api/articles/:article_id/comments', postComment);

//comment

// app.delete('/api/comments/:comment_id', removeComment)


module.exports = app;
