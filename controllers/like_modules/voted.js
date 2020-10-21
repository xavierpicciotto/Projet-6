const choice = {
    LIKE: 1,
    DISLIKE: -1,
    RESET: 0,
}

const voted = (sauce, voteValue, user) => {

    if (voteValue === choice.LIKE) {
        return addVote(sauce.usersLiked, voteValue, user);
        
    }
    if (voteValue === choice.DISLIKE) {
        return addVote(sauce.usersDisliked, voteValue, user);
    }
    if (voteValue === choice.RESET) {
        const searchUserIndex = array => array.indexOf(user);
        const likeUserIndex = searchUserIndex(sauce.usersLiked);
        if (likeUserIndex != -1) {
            const indicator = "like";
            return removeVote(sauce.usersLiked, indicator, likeUserIndex, user);
        } else {
            const dislikeUserIndex = searchUserIndex(sauce.usersDisliked);
            const indicator = "dislike";
            return dislikeUserIndex != -1 ?
                removeVote(sauce.usersDisliked, indicator, dislikeUserIndex, user) :
                console.log('error');
        }
    }
    return
}

function addVote(array, voteValue, user) {
    array.push(user);
    const arrayLength = array.length;
    voteValue === choice.LIKE ?
        update = {
            likes: arrayLength,
            usersLiked: array
        } : voteValue === -1 ?
        update = {
            dislikes: arrayLength,
            usersDisliked: array,
        } : console.log(`error on the update vote of ${user}`);

    return update
};

function removeVote(array, indicator, index, user) {
    array.splice(index, 1);
    const arrayLength = array.length;
    indicator === "like" ?
        update = {
            likes: arrayLength,
            usersLiked: array
        } : indicator === "dislike" ?
        update = {
            dislikes: arrayLength,
            usersDisliked: array
        } : console.log(`Error on the withdrawal of the vote of ${user} :(`)
    return update
};

module.exports = voted;