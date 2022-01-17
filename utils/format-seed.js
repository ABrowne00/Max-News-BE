exports.formatUsers = (userData) => {
    const formattedUserData = userData.map(user => {
       return [user.username, user.avatar_url, user.name]
    })
    return formattedUserData
};