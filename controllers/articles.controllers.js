const { fetchArticles, fetchArticleById } = require('../models/articles.models')

exports.getArticles = (req, res , next ) => {
    const { sort_by, order } = req.query;

    fetchArticles(sort_by, order)
    .then((articles) => {
        res.status(200).send( { articles });
    })
    .catch(next)
}