
const format = require("pg-format")
const db = require("../db/conneciton")

exports.checkExists = async (table, column, value) => {
    const queryStr = format(`SELECT * FROM %I WHERE %I =$1;`, table, column);
    const dbOutput = await db.query(queryStr, [value]);
    return (dbOutput.rows.length) ? true : false;
}