import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';

import { checkAuth } from "../../utils";
import { CommentsOfPost, Resolvers, User } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getCommetsForPost: async (_, { postId }, { req, dataSources }) => {
    checkAuth(req);
    try {
      const postObjectId = new ObjectId(postId);
      const result = await dataSources.commentsAPI.getAllCommentsFromPost(postObjectId);
      const comments: CommentsOfPost[] = result.map((element: any): CommentsOfPost => {
        const [user] = element.user as User[];

        const comment: CommentsOfPost = {
          _id: element._id,
          createdAt: element.createdAt,
          description: element.description,
          postId: element.postId,
          numberOfLikes: element.numberOfLikes,
          user: {
            _id: user._id,
            username: user.username,
            image: user.image,
          },
        };
        return comment;
      });
      const count = comments.length;
      return {
        code: 200,
        success: true,
        message: `Comments from postId: ${postId}`,
        data: { count, comments },
      }
    } catch (error) {
      throw new ApolloError('Something went wrong, please try again later');
    }
  }
};

export default Query;
