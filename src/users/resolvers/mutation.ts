import { checkAuth } from "../../utils";
import { Resolvers, User, UserResponse } from "../../__generated__/types";

const Mutation: Resolvers['Mutation'] = {
  createUser: async (_, { userInput }, { dataSources, req }): Promise<UserResponse> => {
    checkAuth(req);
    const user: User = await dataSources.usersAPI.createUser(userInput);
    return { user, code: 200, success: true, message: 'User created', __typename: 'UserResponse' };
  },
  updateUser: async (_, { userInput, userId }, { dataSources, req }): Promise<UserResponse> => {
    checkAuth(req);
    const updatedUser = await dataSources.usersAPI.updateUser(userId, userInput);
    return {
      user: updatedUser ?? null,
      code: updatedUser ? 200 : 400,
      success: updatedUser ? true : false,
      message: `${updatedUser ? 'User updated' : 'Something went wrong, try again later'}`,
      __typename: 'UserResponse',
    };
  },
  deleteUser: async (_, { userId }, { dataSources, req }): Promise<UserResponse> => {
    checkAuth(req);
    const userDeleted = await dataSources.usersAPI.deleteUser(userId);
    return {
      code: userDeleted ? 200 : 400,
      success: userDeleted ? true : false,
      message: `${userDeleted ? 'User deleted' : 'Something went wrong, try again later'}`,
      __typename: 'UserResponse',
    };
  },
};

export default Mutation;
