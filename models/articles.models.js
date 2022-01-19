const db = require('../db/connection')

exports.fetchArticles = (sort_by = 'created_at', order = 'DESC') => {

const allowedSortBY = ['title', 'author', 'article_id', 'topic', 'votes', 'comment_count', 'created_at'];

const allowedOrder = ['ASC', 'DESC']

if (!allowedOrder.includes(order)) {
    return Promise.reject( { status: 400, msg: 'Bad Request'})
}

if (!allowedSortBY.includes(sort_by)) {
    return Promise.reject( { status: 400, msg: 'Bad Request'})
}

return db.query(`
SELECT articles.*,
COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id
ORDER BY ${sort_by} ${order};
`)
.then((result) => {
    console.log(result.rows, '<<<model articles')
    return result.rows;
    })
}

exports.fetchArticleById =  (article_id) => {
    return db.query(`
    SELECT articles.*,
    COUNT (comment_id) AS comment_count FROM reviews
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE article_id = $1 
    GROUP BY articles.article_id;
    `,
    [article_id],
    )
    .then((result) => {
        console.log(result)
        return result.rows[0]
    })
};


