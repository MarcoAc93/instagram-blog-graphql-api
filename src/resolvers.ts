import usersResolvers from "./users/resolvers";
import postsResolvers from './posts/resolvers';
import commentsResolvers from './comments/resolvers';
import likesResolvers from './likes/resolvers';

import { Resolvers } from "./__generated__/types";

const resolvers: Resolvers = {
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
};

export default resolvers;
