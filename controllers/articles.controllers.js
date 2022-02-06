const { fetchArticles, fetchArticleById, fecthComment, updateVotes, addComment } = require('../models/articles.models')

exports.getArticles = (req, res, next) => {
    fetchArticles(req.query)
        .then((articles) => {
            if (articles.length > 0) {
                res.status(200).send({ articles });
            } else {
                if (req.query.topic) {
                    return checkIfExists('topics', 'slug', req.query.topic)
                        .then((topicExist) => {
                            if (topicExist) {
                                res.status(200).send({ msg: "Topic Not Found In Articles", articles: articles });
                            } else {
                                return Promise.reject({ status: 404, msg: "Not Found In DB" })
                            }
                        })
                } else {
                    return Promise.reject({ status: 404, msg: "Not Found" })
                }
            }
        })
        .catch(next);
}

exports.getArticleById = (req, res, next) => {
    const  { article_id }  = req.params;
   
fetchArticleById(article_id)
    .then((article) => {
       
         res.status(200).send({ article })
        })
.catch((err) => {
        next(err);
    })
}

exports.getComment = (req, res, next) => {
    const { article_id } = req.params;
    fecthComment(article_id).then((comments) => {
       res.status(200).send( { comments })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getVotes = (req, res) => {
    const { article_id } = req.params;
   

    updateVotes(req.body, article_id).then((article) => {
       
        res.status(200).send( { article })
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    
    
    addComment(req.body, article_id).then((comment) => {
        res.status(201).send( { comment })
    })
}



