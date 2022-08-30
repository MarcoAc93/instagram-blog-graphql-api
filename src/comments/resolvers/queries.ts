import { ApolloError } from "apollo-server-core";
import { checkAuth } from "../../utils";
import { Resolvers } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getCommetsForPost: async (_, { postId }, { req, dataSources }) => {
    checkAuth(req);
    try {
      const comments = await dataSources.commentsAPI.getAllCommentsFromPost(postId);
      return comments;
    } catch (error) {
      throw new ApolloError('Something went wrong, please try again later');
    }
  }
};

export default Query;
