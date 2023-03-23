import React,{useState } from 'react';
import { Button, Form,Card,Input,Divider } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useLazyQuery  } from '@apollo/react-hooks';
import PostCard from '../components/PostCard';
function Search() {
  const [keyword, setKeyword] = useState("");
  const [getPostsSearch, { loading, error, data }] = useLazyQuery(SEARCH_POST_QUERY);

  const handleSubmit = (event) => {
    event.preventDefault();
    getPostsSearch({ variables: { keyword } });
  };

  const renderPosts = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.getPostsSearch) return null;

    return data.getPostsSearch.map((post) => (
      <Card key={post.id}>
        <PostCard post={post} />
      </Card>
    ));
  };

  return (
    <>
      
      <Form onSubmit={handleSubmit}>
        <Form.Field>
        <h2>Tìm kiếm</h2>
        </Form.Field>
        <Form.Field>
        <Input
          type="text"
          placeholder="Tìm kiếm bài viết"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        </Form.Field>
        <Form.Field>
        <Button type="submit" color="teal">Tìm</Button>
        </Form.Field> 
      </Form>
      <Divider horizontal></Divider>
      
      <Card.Group>{renderPosts()}</Card.Group>
    </>
  );
};

const SEARCH_POST_QUERY = gql`
  query getPostsSearch($keyword: String) {
  getPostsSearch(keyword: $keyword) {
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

export default Search;