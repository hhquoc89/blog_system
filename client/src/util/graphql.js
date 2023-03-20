import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
    id
    body
    createdAt
    userName
    comments {
      id
      createdAt
      userName
      body
    }
    likes {
      id
      createdAt
      userName
    }
    likeCount
    commentCount
  }
  }
`;