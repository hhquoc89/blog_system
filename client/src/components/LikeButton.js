import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="thumbs up outline" />
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon name="thumbs up outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic>
      <Icon name="thumbs up outline" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? 'Không thích' : 'Thích'}>{likeButton}</MyPopup>
      
      <Label basic color="blue" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        userName
      }
      likeCount
    }
  }
`;

export default LikeButton;