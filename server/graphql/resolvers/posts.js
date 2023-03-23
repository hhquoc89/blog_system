const { AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/auth');
module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts
            } catch (e){
                throw new Error(e);
            }
        },
        async getPost(_, { postId }) {
            try {
              const post = await Post.findById(postId);
              if (post) {
                return post;
              } else {
                throw new Error('Post not found');
              }
            } catch (err) {
              throw new Error(err);
            }
        },
        async getPostsSearch  (_, { keyword })  {
          try {
            let posts = await Post.find().sort({ createdAt: -1 });
            if (keyword) {
              posts = posts.filter((post) => post.body.includes(keyword));
            }
            return posts;
          } catch (err) {
            throw new Error(err);
          }
        },
          
    },
    Mutation: {
        async createPost(_, { body }, context) {
          const user = checkAuth(context);
        console.log(user)
          if (body.trim() === '') {
            throw new Error('Body must not be empty');
          }
    
          const newPost = new Post({
            body,
            user: user.id,
            userName: user.userName,
            createdAt: new Date().toISOString()
          });
    
          const post = await newPost.save();
    
          context.pubsub.publish('NEW_POST', {
            newPost: post
          });
    
          return post;
        },
        async deletePost(_, { postId }, context) {
          const user = checkAuth(context);
    
          try {
            const post = await Post.findById(postId);
            if (user.userName === post.userName) {
              await post.deleteOne()
              return 'Post deleted successfully';
            } else {
              throw new AuthenticationError('Action not allowed');
            }
          } catch (err) {
            throw new Error(err);
          }
        },
        async likePost(_, { postId }, context) {
          const { userName } = checkAuth(context);
    
          const post = await Post.findById(postId);
          if (post) {
            if (post.likes.find((like) => like.userName === userName)) {
              // Like->Unlike
              post.likes = post.likes.filter((like) => like.userName !== userName);
            } else {
              // Like
              post.likes.push({
                userName,
                createdAt: new Date().toISOString()
              });
            }
    
            await post.save();
            return post;
          } else throw new UserInputError('Post not found');
        }
      },
}