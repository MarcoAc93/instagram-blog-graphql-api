import { ApolloError } from "apollo-server-core";
import { ObjectId } from "mongodb";

import { checkAuth } from "../../utils";
import { LikeUser, Resolvers, User } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getLikesForPost: async (_, { postId }, { req, dataSources }) => {
    checkAuth(req);

    try {
      const postObjectId = new ObjectId(postId);
      const dataLikes = await dataSources.likesAPI.getLikes(postObjectId);
      const count = dataLikes.length;
      const users = dataLikes.map((element: any): LikeUser => {
        const [user] = element.user as User[];
        return {
          _id: element._id,
          userId: user._id,
          postId: element.postId,
          username: user.username,
          image: user.image,
          createdAt: element.createdAt,
        }
      });
      return { count, users };
    } catch (error) {
      throw new ApolloError('We could not get the likes for this post :(');
    }
  },
  getLikesForComment: async (_, { commentId }, { req, dataSources }) => {
    checkAuth(req);

    try {
      const commentObjectId = new ObjectId(commentId);
      const dataLikes = await dataSources.likesAPI.getLikes(undefined, commentObjectId);
      const count = dataLikes.length;
      const users = dataLikes.map((element: any): LikeUser => {
        const [user] = element.user as User[];
        return {
          _id: element._id,
          userId: user._id,
          commentId: element._id,
          username: user.username,
          image: user.image,
          createdAt: element?.createdAt,
        };
      });
      return { count, users };
    } catch (error) {
      throw new ApolloError('We could not get the likes for this comment :(');
    }
  }
};

export default Query;
