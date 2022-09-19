import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';
import { checkAuth } from "../../utils";
import { Post, Resolvers } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getAllPosts: async (_, { limit, page }, { dataSources, req }) => {
    checkAuth(req);
    const pageNumber = !page ? 1 : page;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = pageNumber * limit;
    const posts = await dataSources.postsAPI.getAllPosts(startIndex, endIndex);
    return { code: 200, success: true, message: 'Posts info', data: posts };
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
