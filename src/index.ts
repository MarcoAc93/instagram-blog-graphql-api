import * as dotenv from 'dotenv';
dotenv.config();

import { DocumentNode } from 'graphql';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongoClient } from 'mongodb';

import resolvers from './resolvers';
import typeDefs from './schema';

import { Resolvers } from './__generated__/types';
import Users from './users/datasource/usersDataSource';
import Posts from './posts/datasource/postDataSource';
import Comments from './comments/datasource/commentsDataSource';
import Likes from './likes/datasource/likeDataSource';
import PasswordRecovery from './users/datasource/passwordRecoveryDataSource';


async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers) {
  const dbUser = process.env.DB_USERNAME;
  const dbPass = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbHost = process.env.DB_HOST;
  const env = process.env.NODE_ENV;
  const mongoConnectionUrl = env === 'development' ? `mongodb://localhost:27017/${dbName}` : `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`;
  const mongoClient = new MongoClient(mongoConnectionUrl);
  await mongoClient.connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    dataSources: () => ({
      usersAPI: new Users(mongoClient.db().collection('User')),
      postsAPI: new Posts(mongoClient.db().collection('Post')),
      commentsAPI: new Comments(mongoClient.db().collection('Comment')),
      likesAPI: new Likes(mongoClient.db().collection('Like')),
      passwordRecoveryAPI: new PasswordRecovery(mongoClient.db().collection('Recovery')),
    }),
    context: ({ req }) => ({ req }),
  });

  const port = process.env.PORT || 4000;
  const { url } = await server.listen({ port });
  console.log(`Server running at ${url}`);
};

startApolloServer(typeDefs, resolvers);
