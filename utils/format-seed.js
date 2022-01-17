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