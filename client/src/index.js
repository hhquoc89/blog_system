import React from 'react';

import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider ,ApolloLink ,HttpLink} from '@apollo/client';
import App from './App';
const httpLink = new HttpLink({ uri: 'http://localhost:5000' });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwtToken');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : "",
    }
  }));
  return forward(operation);
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);