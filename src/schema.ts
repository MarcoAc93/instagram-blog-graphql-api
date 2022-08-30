import { gql } from "apollo-server-core";

import userSchema from "./users/schema";
import postSchema from './posts/schema';
import commentsSchema from './comments/schema';

export default gql([userSchema, postSchema, commentsSchema].join('\n'));
