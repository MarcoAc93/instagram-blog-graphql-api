import { checkAuth } from "../../utils";
import { Resolvers } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  getAllPosts: async (_, __, { dataSources, req }) => {
    checkAuth(req);
    return await dataSources.postsAPI.getAllPosts();
  },
};

export default Query;
