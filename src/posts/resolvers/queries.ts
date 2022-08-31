import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';
import { checkAuth } from "../../utils";
import { Resolvers } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getAllPosts: async (_, __, { dataSources, req }) => {
    checkAuth(req);
    return await dataSources.postsAPI.getAllPosts();
  },
  getPost: async (_, { id }, { req, dataSources }) => {
    checkAuth(req);
    try {
      const postObjectId = new ObjectId(id);
      const post = await dataSources.postsAPI.getPostById(postObjectId);
      return post;
    } catch (error) {
      throw new ApolloError('Something went wrong, try again later');
    }
  },
};

export default Query;
