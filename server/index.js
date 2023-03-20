const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { PubSub } =require('graphql-subscriptions') ;
const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const WebSocket = require('ws');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const pubsub = new PubSub();;

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  subscriptions: {
   
    path: '/subscriptions',
    // Khởi tạo một WebSocket Server mới cho subscriptions
    // với giao thức subscriptions-transport-ws
    server: new WebSocket.Server({
      noServer: true
    })
  }
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

 