import { ObjectId } from 'mongodb';
import { checkAuth } from "../../utils";
import { Resolvers } from "../../__generated__/types";

const Mutation: Resolvers['Mutation'] = {
  createPost: async (_, { createPostInput }, { dataSources, req }) => {
    const authUser = checkAuth(req);
    const newPostInfo = { ...createPostInput };
    
    if (!createPostInput?.author) {
      const { _id, name, username, image } = authUser;
      const userId = new ObjectId(_id) as unknown as string;
      newPostInfo.author = { _id: userId, name, username, image };
    }

    try {
      const post = await dataSources.postsAPI.createPost(newPostInfo);
      return { code: 200, message: 'test', success: true, post };
    } catch (error) {
      return { code: 400, message: 'Something went wrong, try again later', success: false, post: null };
    }
  },
  updatePost: async (_, { description, postId }, { dataSources, req }) => {
    checkAuth(req);
    try {
      const post = await dataSources.postsAPI.updatePost(postId, description);
      return { code: 200, message: 'Post updated', success: true, post };
    } catch (error) {
      return { code: 400, message: 'Something went wrong, try again later', success: true, post: null };
    }
  },
  deletePost: async (_, { postId }, { req, dataSources }) => {
    checkAuth(req);

    try {
      dataSources.postsAPI.deletePost(postId);
      return { code: 200, success: true, message: 'Post deleted' };
    } catch (error) {
      return { code: 400, success: false, message: 'Something went wrong, please try again later' };
    }
  },
};

export default Mutation;
