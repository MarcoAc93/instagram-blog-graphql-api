import { ObjectId } from 'mongodb';
import { MongoDataSource } from "apollo-datasource-mongodb";

import { CreatePostInput } from "../../__generated__/types";

export interface PostDocument {
  _id: ObjectId;
  description: string;
  type: string;
  image: string;
  images: [string];
  video: string;
  author: {
    _id: ObjectId;
    username: string;
    name: string;
    image: string;
  };
  nofComments: number;
  nofLikes: number;
  createdAt: string;
  updatedAt: string;
}

class Post extends MongoDataSource<PostDocument> {
  async getPostById(postId: ObjectId) {
    return await this.collection.findOne({ _id: postId });
  }

  async getAllPosts(start: number, end: number) {
    const result = this.collection.find().sort({ createdAt: -1 }).skip(start).limit(end);
    const posts = await result.toArray();
    return posts;
  }

  async createPost(payload: CreatePostInput) {
    const newPost = {};
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    Object.assign(newPost, { ...payload, createdAt, updatedAt });
    const result = await this.collection.insertOne(newPost as PostDocument);
    const postCreated = await this.getPostById(result.insertedId);
    return postCreated;
  }

  async updatePost(postId: ObjectId, description: string) {
    const updatedAt = new Date().toISOString();
    await this.collection.updateOne({ _id: postId }, { $set: { description, updatedAt } });
    return await this.getPostById(postId);
  }

  async deletePost(postId: ObjectId) {
    const result = this.collection.deleteOne({ _id: postId });
    return result;
  }

  async updateNumberOfLikes(postId: ObjectId, numberOfLikes: number) {
    await this.collection.updateOne({ _id: postId }, { $set: { nofLikes: numberOfLikes } });
    return await this.collection.findOne({ _id: postId });
  }

  async updateNumberOfComments(postId: ObjectId, numberOfComments: number) {
    await this.collection.updateOne({ _id: postId }, { $set: { nofComments: numberOfComments} });
    return await this.getPostById(postId);
  }
}

export default Post;
