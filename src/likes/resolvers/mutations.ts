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
        await dataSources.likesAPI.removeLike(userObjectId, postObjectId);
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
  createLike: async (_, { createLikeInput: { commentId, postId } }, { req, dataSources }) => {
    const user = checkAuth(req);
    const userObjectId = new ObjectId(user._id);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    if (commentId) {
      const commentObjectId = new ObjectId(commentId);
      const likeExists = await dataSources.likesAPI.likeExists(userObjectId, undefined, commentObjectId);
      const commentInfo = await dataSources.commentsAPI.getCommentById(commentObjectId);
      const numberOfLikes = commentInfo?.numberOfLikes ? commentInfo?.numberOfLikes : 0;
      
      if (!likeExists) {
        await dataSources.likesAPI.createLike({ commentId: commentObjectId, userId: userObjectId, createdAt, updatedAt });
        const comment = await dataSources.commentsAPI.updateComment(commentObjectId, { numberOfLikes: numberOfLikes + 1 });
        return { code: 200, success: true, message: 'Comment liked', comment };
      }

      await dataSources.likesAPI.removeLike(userObjectId, undefined, commentObjectId);
      const comment = await dataSources.commentsAPI.updateComment(commentObjectId, { numberOfLikes: numberOfLikes - 1 });
      return {code: 200, success: true, message: 'Comment unliked', comment }
    } else if (postId) {
      const postObjectId = new ObjectId(postId);
      const likeExists = await dataSources.likesAPI.likeExists(userObjectId, postObjectId);
      const postInfo: Post = await dataSources.postsAPI.getPostById(postObjectId);
      const numberOfLikes = postInfo?.nofLikes ? postInfo?.nofLikes : 0;

      if (!likeExists) {
        await dataSources.likesAPI.createLike({ postId: postObjectId, userId: userObjectId, createdAt, updatedAt });
        const postUpdated: Post = await dataSources.postsAPI.updateNumberOfLikes(postObjectId, numberOfLikes + 1);
        return { code: 200, success: true, message: 'Post liked', post: postUpdated };
      }

      await dataSources.likesAPI.removeLike(userObjectId, postObjectId);
      const post: Post = await dataSources.postsAPI.updateNumberOfLikes(postObjectId, numberOfLikes - 1);
      return { code: 200, success: true, message: 'Post unliked', post };
    }

    return { code: 400, success: false, message: 'You must provide a postId or commentId' }
  },
};

export default Mutation;
