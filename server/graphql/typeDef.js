const {gql} =  require ('graphql-tag');

module.exports = gql `
    type Post{
        id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    }
    type Like {
    id: ID!
    createdAt: String!
    userName: String!
    }
    type Comment {
        id: ID!
        createdAt: String!
        userName: String!
        body: String!
    }
    type User{
        id:ID!
        email:String!
        token:String!
        userName:String!
        createdAt:String!
    }
    
    input RegisterInput {
        userName: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getPostsSearch(keyword: String): [Post]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(userName: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription {
    newPost: Post!
  }
`;