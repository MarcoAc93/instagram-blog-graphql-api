import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';
import { Post, Resolvers } from "../../__generated__/types";
import { checkAuth } from "../../utils";

const Mutation: Resolvers['Mutation'] = {
  createComment: async (_, { postId, description }, { dataSources, req }) => {
    const user = checkAuth(req);
    try {
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const postObjectId = new ObjectId(postId);
      const userObjectId = new ObjectId(user._id)
      const commentData = {
        description,
        postId: postObjectId,
        userId: userObjectId,
        createdAt,
        updatedAt
      };
      const newComment = await dataSources.commentsAPI.createComment(commentData);
      const post = await dataSources.postsAPI.getPostById(postObjectId) as Post;
      const numberOfComments = post.nofComments ? post.nofComments : 0;
      await dataSources.postsAPI.updateNumberOfComments(postObjectId, numberOfComments + 1);

      return { code: 200, success: true, message: 'New comment created', comment: newComment };
    } catch (error) {
      throw new ApolloError('Something went wrong, please try again');
    }
  },
};

export default Mutation;
