
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const cmtsResolvers = require('./cmt');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
      },
    Query: {
        ...postsResolvers.Query      
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...cmtsResolvers.Mutation,
    },
    Subscription:{
        ...postsResolvers.Subscription
    }
}