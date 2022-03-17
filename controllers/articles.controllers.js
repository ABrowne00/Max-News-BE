const { fetchArticles, fetchArticleById, fecthComment, updateVotes, addComment } = require('../models/articles.models')
const {checkExists, checkIdExists} = require('../utils/utils')


exports.getArticles = (req, res, next) => {
    fetchArticles(req.query)
        .then((articles) => {
            if (articles.length > 0) {
                res.status(200).send({articles});
            } else {
                if (req.query.topic) {
                    return checkExists('topics', 'slug', req.query.topic)
                        .then((topicExist) => {
                            if (topicExist) {
                                res.status(200).send({ msg: "Articles For Topic Not Found", articles: articles });
                            } else {
                                return Promise.reject({ status: 404, msg: "Not Found In DB" })
                            }
                        })
                } else {
                    return Promise.reject({ status: 404, msg: "Not Found" })
                }
            }
        })
        .catch((err) => {
            next(err)
        });
}

exports.getArticleById = (req, res, next) => {
    const  { article_id }  = req.params;
   return checkIdExists(req.params, 'articles')
   .then((articleExists) => {
    if (articleExists) {
        return fetchArticleById(article_id)
            .then((article) => {
                res.status(200).send({ article });
            })
    } else {
        return Promise.reject({ status: 404, msg: "Article Not Found" })
    }
})
.catch((err) => {
    next(err)
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
    .catch((err) => {
        nect(err)
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    return checkIdExists(req.params, 'articles')
    .then((articleExists) => {
        if (articleExists) {
        addComment(req.body, article_id).then((comment) => {
            res.status(201).send( { comment })
        })
        .catch((err) => {
            next(err)
        })
    } else {
        return Promise.reject({status: 404, msg: 'Article Not Found'})
    }
    })
    .catch((err) => {
        next(err)
    })
    
   
}



