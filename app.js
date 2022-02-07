const express = require('express')
const cors = require('cors');
const { getUsers } = require('./controllers/users.controllers')
const {  getArticles, getArticleById, getComment, getVotes, postComment } = require('./controllers/articles.controllers')
const { getTopics } = require('./controllers/topics.controllers')
const { removeComment, getComments } = require('./controllers/comments.controllers')
const  endpoints = require('./endpoints.json')
const app = express()

app.use(cors());
app.use(express.json());



const { handle404, handlePsqlErrors } = require('./erros/index')


//Endpoints

app.get('/api', (req, res) => {
    res.status(200).send( { endpoints });
})


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

//comments
app.get('/api/comments', getComments)
app.delete('/api/comments/:comment_id', removeComment)

app.all("*", handle404)

app.use(handlePsqlErrors)




module.exports = app;
