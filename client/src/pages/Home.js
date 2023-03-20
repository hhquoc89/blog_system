import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container, Grid, Transition  } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <h1>Đợi tí..</h1>;
  }

  const posts = data?.getPosts;

  return (
    <Container>
      {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      <Grid columns={2}>
      <Grid.Row className="page-title">
        <h1>Các bài đăng hiện tại</h1>
      </Grid.Row>
      <Grid.Row>
        
      {loading ? (
          <h1>Đợi tí..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
    </Container>
    
  );
}

export default Home;