const express = require('express')
const { getUsers } = require('./controllers/controllers')
const app = express()

app.get('/api/users', getUsers)

module.exports = app;
