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
COUNT(comment_id) AS comment_count FROM articles
 LEFT JOIN comments 
ON comments.article_id = articles.article_id
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
    SELECT articles.*, COUNT(comment_id) AS comment_count
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id;`,
    [article_id]
    )
    .then((result) => {
        console.log(result.rows)
        return result.rows[0]
    })
};

exports.fecthComment = (article_id) => {
    return db.query(`
    SELECT *
    FROM comments
    WHERE article_id=$1;
    `,
    [article_id])
    .then((res) => {
        return res.rows
    })
}

exports.updateVotes = (body, article_id) => {
    console.log('hello')
    return db.query(`UPDATE articles
     SET votes=votes+$1
    WHERE article_id=$2
     RETURNING *;`, [body.inc_votes, article_id])
    .then((res) => {
        console.log(res.rows[0])
        return res.rows[0]
    })
}

exports.addComment = (addComment, article_id) => {
    const { username, body } =  addComment;
    console.log(addComment)

    return db.query(`
    INSERT INTO comments (author, body, article_id) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [username, body, article_id]
    )
    .then((result) => {
        console.log(result)
        return result.rows
    })
}





