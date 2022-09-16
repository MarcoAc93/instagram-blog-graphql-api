import { ApolloError } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import { SentMessageInfo } from 'nodemailer';
import { checkAuth, sendEmail, generateHash } from "../../utils";
import { Resolvers, User, UserResponse } from "../../__generated__/types";

const Mutation: Resolvers['Mutation'] = {
  createUser: async (_, { userInput }, { dataSources }): Promise<UserResponse> => {
    const userExists = await dataSources.usersAPI.getUserToLogin(userInput.email);
    if (userExists) return { success: false, message: 'email already exists', code: 200 };

    const user: User = await dataSources.usersAPI.createUser(userInput);
    return { user, code: 200, success: true, message: 'User created', __typename: 'UserResponse' };
  },
  updateUser: async (_, { userInput, userId }, { dataSources, req }): Promise<UserResponse> => {
    checkAuth(req);
    const userObjectId = new ObjectId(userId);
    const updatedUser = await dataSources.usersAPI.updateUser(userObjectId, userInput);
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
    const userObjectId = new ObjectId(userId);
    const userDeleted = await dataSources.usersAPI.deleteUser(userObjectId);
    return {
      code: userDeleted ? 200 : 400,
      success: userDeleted ? true : false,
      message: `${userDeleted ? 'User deleted' : 'Something went wrong, try again later'}`,
      __typename: 'UserResponse',
    };
  },
  passwordRecovery: async (_, { email }, { dataSources }) => {
    try {
      const user = await dataSources.usersAPI.getUserToLogin(email);
      if (!user) {
        return { code: 404, success: false, message: 'User not found' };
      }

      const code = Math.floor(Math.random() * 1000000);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const emailResponse = await sendEmail(email, code) as SentMessageInfo;
      if (!emailResponse.messageId) {
        return { code: 400, success: false, message: 'Error sending the verification code' };
      }

      await dataSources.passwordRecoveryAPI.createCode({ code, email, createdAt, updatedAt });
      return { code: 200, success: true, message: 'A recovery code has been sent to your email' };
    } catch (error) {
      throw new ApolloError((error as Error).message);
    }
  },
  passwordReset: async (_, { passwordResetInput }, { dataSources }) => {
    try {
      const { code, email, newPassword } = passwordResetInput;
      const recoveryRequest = await dataSources.passwordRecoveryAPI.getRecoveryRequest(email, code)
      if (!recoveryRequest) {
        return { code: 404, success: false, message: 'There is no recovery request for this password' };
      }

      const hash = await generateHash(newPassword);
      const passwordUpdated = await dataSources.usersAPI.updatePassword(email, hash);
      if (!passwordUpdated) {
        return { code: 500, success: false, message: 'Error updating the password' };
      }

      await dataSources.passwordRecoveryAPI.deleteCode(email, code);
      return { code: 200, success: true, message: 'Password updated' };
    } catch (error) {
      return { code: 500, success: false, message: (error as Error).message };
    }
  },
};

export default Mutation;
