const app = require('./app')

const { PORT = 9090 } = process.env

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server listening on port ${PORT}...`)
});