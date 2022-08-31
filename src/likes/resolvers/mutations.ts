import { ApolloError } from "apollo-server-core";
import { ObjectId } from 'mongodb';
import { checkAuth } from "../../utils";
import { Post, Resolvers } from "../../__generated__/types";

const Mutation: Resolvers['Mutation'] = {
  increaseLikeForPost: async (_, { postId }, { req, dataSources }) => {
    const user = checkAuth(req);

    try {
      const postObjectId = new ObjectId(postId);
      const userObjectId = new ObjectId(user._id)
      const post: Post = await dataSources.postsAPI.getPostById(postObjectId);
      const postLiked = await dataSources.likesAPI.likeExistOnPost(postObjectId, userObjectId);
      const numberOfLikes = post.nofLikes ? post.nofLikes : 0;
      if (postLiked) {
        await dataSources.likesAPI.removeLike(postObjectId, userObjectId);
        const updatedPost = await dataSources.postsAPI.updateNumberOfLikes(postObjectId, numberOfLikes - 1);
        return { code: 200, success: true, message: 'Like removed', post: updatedPost };
      }

      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const likeData = { postId: postObjectId, userId: userObjectId, createdAt, updatedAt, };
      const likeCreated = await dataSources.likesAPI.createLike(likeData);
      if (!likeCreated.insertedId) {
        return { code: 400, success: false, message: 'Cannot like this post right now' };
      }

      const updatedPost = await dataSources.postsAPI.updateNumberOfLikes(postObjectId, numberOfLikes + 1);

      return {
        code: 200,
        success: true,
        message: 'Post liked',
        post: updatedPost,
      }
    } catch (error) {
      throw new ApolloError('Something went wrong, please try again');
    }
  },
};

export default Mutation;
