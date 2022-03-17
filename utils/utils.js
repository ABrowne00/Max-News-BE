
const format = require("pg-format")
const db = require("../db/connection")

exports.checkExists = async (table, column, value) => {
    const queryStr = format(`SELECT * FROM %I WHERE %I =$1;`, table, column);
    const dbOutput = await db.query(queryStr, [value]);
    return (dbOutput.rows.length) ? true : false;
}

exports.checkIdExists = (params, table) => {
    const key = Object.keys(params)[0];
    const val = params[key];
    return db
        .query(`SELECT * FROM ${table} WHERE ${key} = $1;`, [val])
        .then((res) => {
            return (res.rows.length) ? true : false;
        })
}