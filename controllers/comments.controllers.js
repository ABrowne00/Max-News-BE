const { deleteComment } = require('../models/comments.models')

exports.removeComment = (req, res, next) => {
    return deleteComment(req.params).then((deleted) => {
        res.status(204).send({});
    })
}