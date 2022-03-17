const { deleteComment, fetchComments } = require('../models/comments.models')

exports.removeComment = (req, res, next) => {
    
    
     deleteComment(req.params.comment_id).then((result) => {
         if(result.length > 0) {
            res.status(204).send({});
            
            } else {
                return Promise.reject({status: 404, msg: 'Comment not found'})
            }
    })
    .catch((err) => {
        next(err)
    })
}

exports.getComments = (req, res, next ) => {
    fetchComments().then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}