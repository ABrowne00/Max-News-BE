exports.formatUsers = (userData) => {
    const formattedUserData = userData.map(user => {
       return [user.username, user.avatar_url, user.name]
    })
    return formattedUserData
};

exports.formatTopics = (topicData) => {
    const formattedTopicData = topicData.map(topic => {
        return [topic.slug, topic.description] 
    })
    return formattedTopicData
}

exports.formatArticles = (articleData) => {
    const formattedArticleData = articleData.map(article => {
        return [article.title, article.body, article.votes, article.topic, article.author, article.created_at]
    })
    return formattedArticleData
}

exports.formatComments = (commentData) => {
    const formattedCommentData = commentData.map(comment => {
        return [comment.author, comment.article_id, comment.votes, comment.created_at, comment.body]
    })
    return formattedCommentData
}