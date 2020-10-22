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

//Renvoie les modification de la sauce, like et dislike.
function addVote(array, voteValue, user) {
    array.push(user);
    const arrayLength = array.length;
    voteValue === choice.LIKE ?
        update = {
            //Si l'utilisateur a liké la sauce.
            likes: arrayLength,
            usersLiked: array
        } : voteValue === -1 ?
        update = {
            //Si l'utilisateur a disiké la sauce.
            dislikes: arrayLength,
            usersDisliked: array,
        } : console.log(`error on the update vote of ${user}`);

    return update
};

//Permet de réinitialiser le vote d'un utilisateur, like ou dislike.
function removeVote(array, indicator, index, user) {
    array.splice(index, 1);
    const arrayLength = array.length;
    indicator === "like" ?
        update = {
            //Si l'utilisateur retire son like.
            likes: arrayLength,
            usersLiked: array
        } : indicator === "dislike" ?
        update = {
            //Si l'utilisateur retire son dislike.
            dislikes: arrayLength,
            usersDisliked: array
        } : console.log(`Error on the withdrawal of the vote of ${user} :(`)
    return update
};

module.exports = voted;