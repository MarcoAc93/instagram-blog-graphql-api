import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";

interface LikeDocument {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  createdAt: String;
  updatedAt: String;
}

class Like extends MongoDataSource<LikeDocument> {
  async likeExistOnPost(postId: ObjectId, userId: ObjectId) {
    const result = await this.collection.findOne({ postId, userId });
    return result?._id ? true : false;
  }

  async createLike(payload: LikeDocument) {
    const result = await this.collection.insertOne(payload);
    return result;
  }

  async removeLike(postId: ObjectId, userId: ObjectId) {
    const result = await this.collection.deleteOne({ postId, userId });
    return result;
  }
}

export default Like;
