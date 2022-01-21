exports.handle404 = (req, res) => {
    res.status(404).send( { msg: 'Not Found'})
}

exports.handlePsqlErrors = (err, req, res, next ) => {
    if (err.code === '22P02') {
        res.status(400).send( { msg: 'Bad Request'});
    }
    else next(err)
}