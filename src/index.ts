import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { DocumentNode } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongoClient } from 'mongodb';

import resolvers from './resolvers';
import typeDefs from './schema';

import { Resolvers } from './__generated__/types';
import Users from './users/datasource/usersDataSource';
import Posts from './posts/datasource/postDataSource';
import Comments from './comments/datasource/commentsDataSource';
import Likes from './likes/datasource/likeDataSource';

async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const mongoClient = new MongoClient('mongodb://localhost:27017/instagram-blog');
  await mongoClient.connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    dataSources: () => ({
      usersAPI: new Users(mongoClient.db().collection('User')),
      postsAPI: new Posts(mongoClient.db().collection('Post')),
      commentsAPI: new Comments(mongoClient.db().collection('Comment')),
      likesAPI: new Likes(mongoClient.db().collection('Like')),
    }),
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);
