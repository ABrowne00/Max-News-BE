const db = require('../db/connection')

exports.fetchUsers = () => {
    return db.query(
        `SELECT * FROM users;`)
    .then((result) => {
        console.log(result.rows, '<<< model')
        return result.rows
    })
}