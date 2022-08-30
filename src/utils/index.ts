import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';

const generateSalt = async () => await bcrypt.genSalt(10);

export const generateHash = async (plainPassword: string): Promise<string> => {
  const salt = await generateSalt()
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

export const compareHash = async (plainPassword: string, hash: string) => {
  const result = bcrypt.compare(plainPassword, hash);
  return result;
};

export const signToken = async (dataToSign: any) => jwt.sign(dataToSign, '5up3r53Cr37P455w0rD');

export const verifyToken = (token: any) => jwt.verify(token, '5up3r53Cr37P455w0rD');

type CheckAuthType = {
  _id: string;
  name: string;
  image?: string;
  bio?: string;
  username: string;
  website?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export const checkAuth = (req: Request): CheckAuthType => {
  const { headers } = req;
  if (!headers.authorization) {
    throw new AuthenticationError('You must be logged in to perform this action');
  }

  const { authorization } = headers;
  try {
    const decodedToken = verifyToken(authorization) as CheckAuthType;
    return decodedToken;
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }
};
