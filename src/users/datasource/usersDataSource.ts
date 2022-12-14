import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';

import { generateHash } from '../../utils';
import { User, CreateUserInput, UpdateUserInput } from '../../__generated__/types';

interface UserDocument {
  _id: ObjectId;
  name: string;
  image: string;
  bio: string;
  username: string;
  email: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

class Users extends MongoDataSource<UserDocument> {
  async getAllUsers() {
    const usersCursor = this.collection.find();
    const usersArray = await usersCursor.toArray();
    return usersArray;
  }

  async getUserById(userId: ObjectId) {
    const user = await this.findOneById(userId);
    return user;
  }

  async createUser(userInput: CreateUserInput) {
    const hash = await generateHash(userInput.password);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const userToInsert = {}
    Object.assign(userToInsert, { ...userInput, createdAt, updatedAt, password: hash })
    const userCreated = await this.collection.insertOne(userToInsert as UserDocument);
    const user = await this.getUserById(userCreated.insertedId);
    return user;
  }

  async updateUser(userId: ObjectId, userInput: UpdateUserInput) {
    try {
      const fieldsToUpdate = {}
      Object.assign(fieldsToUpdate, userInput);
      await this.collection.updateOne({ _id: userId }, { $set: { ...fieldsToUpdate } });
      return await this.findOneById(userId);
    } catch (error) {
      return undefined;
    }
  }

  async deleteUser(userId: ObjectId): Promise<boolean | undefined> {
    try {
      const userDeleted = await this.collection.deleteOne({ _id: userId });
      return userDeleted.acknowledged;
    } catch (error) {
      return undefined;
    }
  }

  async getUserToLogin(email: string) {
    try {
      const user = await this.collection.findOne({ email });
      return user;
    } catch (error) {
      return undefined;
    }
  }

  async updatePassword(email: string, password: string) {
    const fieldToUpdate = {};
    Object.assign(fieldToUpdate, { password });
    const result = await this.collection.updateOne({ email }, { $set: { ...fieldToUpdate } });
    return result.acknowledged;
  }
}

export default Users;
