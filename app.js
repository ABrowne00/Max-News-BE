const express = require('express')
const { getUsers } = require('./controllers/users.controllers')
const { getArticles } = require('./controllers/articles.controllers')
const app = express()


app.get('/api/users', getUsers)


app.get('/api/articles', getArticles)

module.exports = app;
