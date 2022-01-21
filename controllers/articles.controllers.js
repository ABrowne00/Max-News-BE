const { fetchArticles, fetchArticleById, fecthComment, updateVotes, addComment } = require('../models/articles.models')

exports.getArticles = (req, res , next ) => {
    const { sort_by, order } = req.query;

    fetchArticles(sort_by, order)
    .then((articles) => {
        res.status(200).send( { articles });
    })
    .catch(next)
}

exports.getArticleById = (req, res, next) => {
    const  { article_id }  = req.params;
   
fetchArticleById(article_id)
    .then((article) => {
        console.log(article)
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