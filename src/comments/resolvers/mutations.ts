import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';
import { Resolvers } from "../../__generated__/types";
import { checkAuth } from "../../utils";

const Mutation: Resolvers['Mutation'] = {
  createComment: async (_, { postId, description }, { dataSources, req }) => {
    const user = checkAuth(req);
    try {
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const commentData = {
        description,
        postId: new ObjectId(postId),
        userId: new ObjectId(user._id),
        createdAt,
        updatedAt
      };
      const newComment = await dataSources.commentsAPI.createComment(commentData);
      return { code: 200, success: true, message: 'New comment created', comment: newComment };
    } catch (error) {
      throw new ApolloError('Something went wrong, please try again');
    }
  },
};

export default Mutation;
