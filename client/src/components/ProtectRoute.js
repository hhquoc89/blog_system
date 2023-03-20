import React from 'react';
import { Route } from 'react-router-dom';
import AuthRoute from './util/AuthRoute';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AuthRoute component={Component} {...props} />
      )}
    />
  );
}

export default ProtectedRoute;
