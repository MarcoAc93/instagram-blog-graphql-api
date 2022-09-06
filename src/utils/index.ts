import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';
import nodemailer from 'nodemailer';
const SECRET_KEY = process.env.SECRET_SIGN_KEY as string;

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

export const signToken = async (dataToSign: any) => jwt.sign(dataToSign, SECRET_KEY);

export const verifyToken = (token: any) => jwt.verify(token, SECRET_KEY);

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

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_PASSWORD,
    },
  });
  return transporter;
};

export const sendEmail = async (email: string, code: number) => {
  const transporter = createTransporter();
  const options = {
    from: 'insta.clone@support.com',
    to: email,
    subject: 'Recovery code',
    text: `This is your recovery code: ${code}`,
  };
  return await new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) reject(error);
      resolve(info);
    });
  });
};
