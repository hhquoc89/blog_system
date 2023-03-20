import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    userName: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Đăng nhập</h1>
        <Form.Input
          label="Tài khoản"
          name="userName"
          type="text"
          value={values.userName}
          error={errors.userName ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Mật khẩu"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Đăng nhập
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    createdAt
    email
    id
    token
    userName
  }
}
`;

export default withRouter(Login);