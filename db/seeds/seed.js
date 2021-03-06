const db = require('../connection');
const format = require('pg-format');
const { formatUsers, formatTopics, formatArticles, formatComments } = require('../../utils/format-seed')

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  return db.query(`DROP TABLE IF EXISTS comments;`)
  .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
  .then(() => db.query(`DROP TABLE IF EXISTS topics;`))
  .then(() => db.query(`DROP TABLE IF EXISTS users;`))

.then(() => {
  return db.query(`
  CREATE TABLE users (
    username VARCHAR(200) PRIMARY KEY,
    avatar_url VARCHAR,
    name VARCHAR(200) NOT NULL
  );`)})
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
      slug VARCHAR(200) PRIMARY KEY,
      description VARCHAR
    );`)
  })
    .then(() => {
      return db.query(`
      CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        body VARCHAR NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR REFERENCES topics(slug),
        author VARCHAR REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`)
    })
  .then(() => {
    return db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author TEXT REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`)
  })
  .then(() => {
     const formattedUserData = formatUsers(userData);
    const sqlUser = format(
      `INSERT INTO users (username, avatar_url, name)
      VALUES %L
      RETURNING *;`,
      // userData.map(user => [user.username, user.avatar_url, user.name])
      formattedUserData,
    );
    return db.query(sqlUser)
  })
  .then(() => {
    const formattedTopicData = formatTopics(topicData);
    const sqlTopic = format( 
      `INSERT INTO topics (slug, description)
      VALUES %L
      RETURNING *;`,
      formattedTopicData,
    );
    return db.query(sqlTopic)
  })
  .then(() => {
    const formattedArticleData = formatArticles(articleData);
    const sqlArticle = format(
      `INSERT INTO articles (title, body, votes, topic, author, created_at)
      VALUES %L
      RETURNING *;`,
      formattedArticleData,
    )
      return db.query(sqlArticle)

  })
  .then(() => {
    const formattedCommentData = formatComments(commentData);
    const sqlComment = format (
      `INSERT INTO comments (author, article_id, votes, created_at, body)
      VALUES %L
      RETURNING *;`,
      formattedCommentData,
    )
    return db.query(sqlComment)
  })


  // 2. insert data
};

module.exports =  seed 
