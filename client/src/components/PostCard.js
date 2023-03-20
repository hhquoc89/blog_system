
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  
  post: { body, createdAt, id, userName, likeCount, commentCount, likes }
}) {
  

  function commentOnPost() {
    console.log('Comment on post!!');
  }
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          circular
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra  className="d-flex justify-content-between">
      <LikeButton user={user} post={{ id, likes, likeCount }} />
      <MyPopup content={"Bình luận"}>
      <Button as={Link} to={`/posts/${id}`} labelPosition="right" onClick={commentOnPost}>
          <Button color="orange" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="orange" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </MyPopup>
        {user && user.userName === userName && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;