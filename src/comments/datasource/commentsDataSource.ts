import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb'

interface CommentDocument {
  _id: string | ObjectId;
  description: string;
  postId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

class Comment extends MongoDataSource<CommentDocument> {
  async getAllCommentsFromPost(postId: string) {
    const comments = await this.collection.find({ postId }).toArray();
    return comments;
  }

  async createComment(newComment: CommentDocument) {
    const result = await this.collection.insertOne(newComment);
    const comment = await this.collection.findOne({ _id: result.insertedId });
    return comment;
  }
};

export default Comment;
