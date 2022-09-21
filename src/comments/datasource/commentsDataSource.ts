import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb'

interface CommentDocument {
  _id: ObjectId;
  description: string;
  postId: ObjectId;
  userId: ObjectId;
  numberOfLikes: number;
  createdAt: string;
  updatedAt: string;
}

class Comment extends MongoDataSource<CommentDocument> {
  async getAllCommentsFromPost(postId: ObjectId) {
    const commentsCursor = this.collection.aggregate([
      { $match: { postId } },
      { $lookup: { from: 'User', localField: 'userId', foreignField: '_id', as: 'user' } },
      { $lookup: { from: 'Like', localField: '_id', foreignField: 'commentId', as: 'likes' } },
    ])
    return await commentsCursor.toArray();
  }

  async createComment(newComment: CommentDocument) {
    const result = await this.collection.insertOne(newComment);
    const comment = await this.collection.findOne({ _id: result.insertedId });
    return comment;
  }

  async updateComment(commentId: ObjectId, updatedInfo: CommentDocument) {
    await this.collection.updateOne({ _id: commentId }, { $set: { ...updatedInfo } });
    const commentUpdated = await this.getCommentById(commentId);
    return commentUpdated;
  }

  async getCommentById(commentId: ObjectId) {
    return await this.collection.findOne({ _id: commentId });
  }
};

export default Comment;
