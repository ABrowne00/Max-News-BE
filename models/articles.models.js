const db = require('../db/connection')

exports.fetchArticles = async (reqQuery) => {
    const { sort_by = 'created_at', order_by = 'DESC',  topic } = reqQuery;

    const allowedSortBys = ['article_id', 'title', 'votes', 'created_at', 'topic', 'author', ]
    const allowedOrderBys = ['DESC', 'ASC', 'asc', 'desc']

    if (!allowedSortBys.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'BAD REQUEST' })
    } else if (!allowedOrderBys.includes(order_by)) {
        return Promise.reject({ status: 400, msg: 'BAD REQUEST' })
    } else {
        let query = `SELECT articles.*, 
                     COUNT(comments.article_id) AS comment_count
                     FROM articles 
                     Left JOIN comments ON comments.article_id = articles.article_id    
                     `;

        const queryValues = [];
        if (topic) {
            query += ` WHERE topic=$1`;
            queryValues.push(topic);
        }
        query += ` GROUP BY articles.article_id`
        query += ` ORDER BY ${sort_by} ${order_by}`
        

        const response = await db.query(query, queryValues);
        return response.rows;
    }
}



exports.fetchArticleById =  async (article_id) => {
   const result = await db.query(`
    SELECT articles.*, 
    COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id;`,
        [article_id]
    );
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
    }
    else {
        return result.rows[0];
    }
    
};

exports.fecthComment = async (article_id) => {
    const res = await db.query(`
    SELECT *
    FROM comments
    WHERE article_id=$1;
    `,
        [article_id]);
    return res.rows;
}

exports.updateVotes = async (body, article_id) => {
    const res = await db.query(`UPDATE articles
     SET votes=votes+$1
    WHERE article_id=$2
     RETURNING *;`, [body.inc_votes, article_id]);
    return res.rows[0];
}

exports.addComment = async (addComment, article_id) => {
    const { username, body } =  addComment;
    

    const result = await db.query(`
    INSERT INTO comments (author, body, article_id) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [username, body, article_id]
    );
    return result.rows;
}






