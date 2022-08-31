import { ObjectId } from "mongodb";
import { checkAuth, compareHash, signToken } from "../../utils";
import { Resolvers, User } from "../../__generated__/types";

const Query: Resolvers['Query'] = {
  login: async (_, { loginInput }, { dataSources }) => {
    const userDb = await dataSources.usersAPI.getUserToLogin(loginInput.email);
    if (!userDb) {
      return { code: 404, message: 'User not found', success: false };
    }

    const isCorrectPassword = await compareHash(loginInput.password, userDb.password);
    if (!isCorrectPassword) {
      return { code: 400, message: 'Incorrect email or password', success: false };
    }

    delete userDb.password;
    const token = await signToken({ ...userDb });

    return { code: 100, message: 'User authenticated', success: true, data: { token, user: userDb } };
  },
  getAllUsers: async (_, __, { dataSources, req }): Promise<User[]> => {
    checkAuth(req);
    const users: User[] = await dataSources.usersAPI.getAllUsers();
    return users;
  },
  getUserById: async (_, { userId }, { dataSources, req }): Promise<User> => {
    checkAuth(req);
    const userObjectId = new ObjectId(userId);
    const user: User = await dataSources.usersAPI.getUserById(userObjectId);
    return user;
  },
};

export default Query;
