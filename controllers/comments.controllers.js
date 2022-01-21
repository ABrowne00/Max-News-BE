const { deleteComment, fetchComments } = require('../models/comments.models')

exports.removeComment = (req, res, next) => {
    const { comment_id } = req.params

     deleteComment(comment_id).then((deleted) => {
         res.status(204).send({});
    })
}

exports.getComments = (req, res, next ) => {
    fetchComments().then((comments) => {
        res.status(200).send({comments})
    })
}