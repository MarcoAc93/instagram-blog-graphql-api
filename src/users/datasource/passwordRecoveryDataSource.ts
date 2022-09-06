import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb';

interface PasswordRecoveryDocument {
  _id: ObjectId;
  code: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

class PasswordRecovery extends MongoDataSource<PasswordRecoveryDocument> {
  async getRecoveryRequest(email: string, code: number) {
    return await this.collection.findOne({ email, code });
  }

  async createCode(payload: PasswordRecoveryDocument) {
    return await this.collection.insertOne(payload);
  }

  async deleteCode(email: string, code: number) {
    return await this.collection.deleteOne({ email, code });
  }
};

export default PasswordRecovery;
