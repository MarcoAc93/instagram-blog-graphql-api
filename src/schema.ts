import { gql } from "apollo-server-core";

import userSchema from "./users/schema";
import postSchema from './posts/schema';
import commentsSchema from './comments/schema';
import likesSchema from './likes/schema';

export default gql([
  userSchema,
  postSchema,
  commentsSchema,
  likesSchema,
].join('\n'));
