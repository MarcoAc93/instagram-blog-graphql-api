import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';

import { generateHash } from '../../utils';
import { User, CreateUserInput, UpdateUserInput } from '../../__generated__/types';

interface UserDocument {
  _id: string | ObjectId;
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
  async getAllUsers(): Promise<User[]> {
    const usersCursor = this.collection.find();
    const usersArray = await usersCursor.toArray() as unknown as User[] ;
    return usersArray;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.findOneById(userId) as unknown as User;
    return user;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const hash = await generateHash(userInput.password);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const userToInsert = {}
    Object.assign(userToInsert, { ...userInput, createdAt, updatedAt, password: hash })
    const userCreated = await this.collection.insertOne(userToInsert as UserDocument);
    const user = await this.getUserById(userCreated.insertedId as string);
    return user;
  }

  async updateUser(userId: string, userInput: UpdateUserInput): Promise<User | undefined> {
    try {
      const objectId = new ObjectId(userId);
      const fieldsToUpdate = {}
      Object.assign(fieldsToUpdate, userInput);
      await this.collection.updateOne({ _id: objectId }, { $set: { ...fieldsToUpdate } });
      return await this.findOneById(objectId) as unknown as User;
    } catch (error) {
      return undefined;
    }
  }

  async deleteUser(userId: string): Promise<boolean | undefined> {
    try {
      const _id = new ObjectId(userId);
      const userDeleted = await this.collection.deleteOne({ _id });
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
}

export default Users;
