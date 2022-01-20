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
}

exports.getComment = (req, res) => {
    const { article_id } = req.params;
    fecthComment(article_id).then((comments) => {
        console.log(comments)
        res.status(200).send( { comments })
    })
}

exports.getVotes = (req, res) => {
    const { article_id } = req.params;
    console.log(article_id)
    console.log(req.body)

    updateVotes(req.body, article_id).then((article) => {
       console.log(article)
        res.status(200).send( { article })
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    console.log(req.body)
    console.log(req.params)
    
    addComment(req.body, article_id).then((comment) => {
        res.status(201).send( { comment })
    })
}