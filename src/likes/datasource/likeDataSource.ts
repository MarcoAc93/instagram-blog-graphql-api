import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";

interface LikeDocument {
  _id: ObjectId;
  postId: ObjectId;
  commentId: ObjectId;
  userId: ObjectId;
  createdAt: String;
  updatedAt: String;
}

class Like extends MongoDataSource<LikeDocument> {
  async likeExistOnPost(postId: ObjectId, userId: ObjectId) {
    const result = await this.collection.findOne({ postId, userId });
    return result?._id ? true : false;
  }

  async likeExists(userId: ObjectId, postId?: ObjectId, commentId?: ObjectId) {
    if (postId) {
      const postResult = await this.collection.findOne({ postId, userId })
      return postResult?._id ? true : false;
    } else {
      const commentResult = await this.collection.findOne({ commentId, userId });
      return commentResult?._id ? true : false;
    }
  }

  async createLike(payload: LikeDocument) {
    const result = await this.collection.insertOne(payload);
    return result;
  }

  async removeLike(userId: ObjectId, postId: ObjectId, commentId: ObjectId) {
    if (postId) {
      const postLikeResult = await this.collection.deleteOne({ postId, userId });
      return postLikeResult;
    } else {
      const commentLikeResult = await this.collection.deleteOne({ commentId, userId });
      return commentLikeResult;
    }
  }

  async getLikesForPost(postId: ObjectId) {
    const likesCoursor = this.collection.aggregate([
      { $match: { postId } },
      { $lookup: { from: 'User', localField: 'userId', foreignField: '_id', as: 'user' } }
    ]);
    return await likesCoursor.toArray();
  }
}

export default Like;
