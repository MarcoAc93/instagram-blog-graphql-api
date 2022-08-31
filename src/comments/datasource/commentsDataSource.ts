import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb'

interface CommentDocument {
  _id: ObjectId;
  description: string;
  postId: ObjectId;
  userId: ObjectId;
  createdAt: string;
  updatedAt: string;
}

class Comment extends MongoDataSource<CommentDocument> {
  async getAllCommentsFromPost(postId: ObjectId) {
    const commentsCursor = this.collection.aggregate([
      { $match: { postId } },
      { $lookup: { from: 'User', localField: 'userId', foreignField: '_id', as: 'user' } },
    ])
    return await commentsCursor.toArray();
  }

  async createComment(newComment: CommentDocument) {
    const result = await this.collection.insertOne(newComment);
    const comment = await this.collection.findOne({ _id: result.insertedId });
    return comment;
  }
};

export default Comment;
