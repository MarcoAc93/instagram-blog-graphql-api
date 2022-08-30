import { ObjectId } from 'mongodb';
import { MongoDataSource } from "apollo-datasource-mongodb";

import { CreatePostInput } from "../../__generated__/types";

interface PostDocument {
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
    return await this.collection.findOne({ _id: new ObjectId(postId) });
  }

  async getAllPosts() {
    const result = this.collection.find();
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

  async updatePost(postId: string, description: string) {
    const updatedAt = new Date().toISOString();
    await this.collection.updateOne({ _id: new ObjectId(postId) }, { $set: { description, updatedAt } });
    return await this.getPostById(new ObjectId(postId))
  }

  async deletePost(postId: string) {
    const result = this.collection.deleteOne({ _id: new ObjectId(postId) });
    return result;
  }
}

export default Post;
