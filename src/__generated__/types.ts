import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  username: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  author?: Maybe<CommentUser>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  liked?: Maybe<LikeUser>;
  numberOfLikes?: Maybe<Scalars['Int']>;
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
  userId: Scalars['ID'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  code: Scalars['Int'];
  comment?: Maybe<Comment>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CommentUser = {
  __typename?: 'CommentUser';
  _id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type CommentsOfPost = {
  __typename?: 'CommentsOfPost';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  postId: Scalars['String'];
  user: CommentUser;
};

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  code: Scalars['Int'];
  data?: Maybe<CommentsResponseData>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CommentsResponseData = {
  __typename?: 'CommentsResponseData';
  comments?: Maybe<Array<CommentsOfPost>>;
  count: Scalars['Int'];
};

export type CreateLikeInput = {
  commentId?: InputMaybe<Scalars['ID']>;
  postId?: InputMaybe<Scalars['ID']>;
};

export type CreatePostAuthorInput = {
  _id: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostInput = {
  author?: InputMaybe<CreatePostAuthorInput>;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  type: TypePost;
  video?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type GetAllPostResponse = {
  __typename?: 'GetAllPostResponse';
  code: Scalars['Int'];
  data?: Maybe<Array<Post>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  code: Scalars['Int'];
  comment?: Maybe<Comment>;
  message: Scalars['String'];
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type LikeUser = {
  __typename?: 'LikeUser';
  _id: Scalars['ID'];
  commentId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['ID']>;
  userId: Scalars['ID'];
  username: Scalars['String'];
};

export type LikesResponse = {
  __typename?: 'LikesResponse';
  count: Scalars['Int'];
  users?: Maybe<Array<LikeUser>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentResponse;
  createLike: LikeResponse;
  createPost: PostResponse;
  createUser: UserResponse;
  deletePost: PostResponse;
  deleteUser: UserResponse;
  /** @deprecated Use createLike mutation for liking posts and comments */
  increaseLikeForPost: LikeResponse;
  passwordRecovery: UserResponse;
  passwordReset: UserResponse;
  updatePost: PostResponse;
  updateUser: UserResponse;
};


export type MutationCreateCommentArgs = {
  description: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationCreateLikeArgs = {
  createLikeInput: CreateLikeInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  userInput: CreateUserInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationIncreaseLikeForPostArgs = {
  postId: Scalars['ID'];
};


export type MutationPasswordRecoveryArgs = {
  email: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  passwordResetInput: PasswordResetInput;
};


export type MutationUpdatePostArgs = {
  description: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'];
  userInput: UpdateUserInput;
};

export type MutationResponse = {
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type PasswordResetInput = {
  code: Scalars['Int'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  author?: Maybe<Author>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  likes: Array<Maybe<LikeUser>>;
  nofComments?: Maybe<Scalars['Int']>;
  nofLikes?: Maybe<Scalars['Int']>;
  type: TypePost;
  updatedAt: Scalars['String'];
  video?: Maybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  decodeUserToken?: Maybe<User>;
  getAllPosts: GetAllPostResponse;
  /** This query will return an array (or empty array) with all the users on the DB */
  getAllUsers: Array<Maybe<User>>;
  getCommetsForPost: CommentsResponse;
  getLikesForComment: LikesResponse;
  getLikesForPost: LikesResponse;
  getPost: Post;
  /** This query will return a single user by their id */
  getUserById?: Maybe<User>;
  /** Query for login a user */
  login: UserLoginResponse;
};


export type QueryDecodeUserTokenArgs = {
  token: Scalars['String'];
};


export type QueryGetAllPostsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryGetCommetsForPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetLikesForCommentArgs = {
  commentId: Scalars['ID'];
};


export type QueryGetLikesForPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};

/** The post may have different type of media */
export enum TypePost {
  /** More that one image */
  Carrusel = 'CARRUSEL',
  /** A single image */
  Image = 'IMAGE',
  /** A video */
  Video = 'VIDEO'
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** The user's type */
export type User = {
  __typename?: 'User';
  /** The unique id of the user */
  _id: Scalars['ID'];
  /** Some kind of description about the user */
  bio?: Maybe<Scalars['String']>;
  /** When the user was created */
  createdAt?: Maybe<Scalars['String']>;
  /** The email (must be unique) */
  email: Scalars['String'];
  /** The profile image */
  image?: Maybe<Scalars['String']>;
  /** The name of the user */
  name: Scalars['String'];
  /** When it was last updated */
  updatedAt?: Maybe<Scalars['String']>;
  /** The username that will be displayed on the website */
  username: Scalars['String'];
  /** His personal website */
  website?: Maybe<Scalars['String']>;
};

export type UserLoggedIn = {
  __typename?: 'UserLoggedIn';
  token: Scalars['String'];
  user: User;
};

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  code: Scalars['Int'];
  data?: Maybe<UserLoggedIn>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UserResponse = MutationResponse & {
  __typename?: 'UserResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentResponse: ResolverTypeWrapper<CommentResponse>;
  CommentUser: ResolverTypeWrapper<CommentUser>;
  CommentsOfPost: ResolverTypeWrapper<CommentsOfPost>;
  CommentsResponse: ResolverTypeWrapper<CommentsResponse>;
  CommentsResponseData: ResolverTypeWrapper<CommentsResponseData>;
  CreateLikeInput: CreateLikeInput;
  CreatePostAuthorInput: CreatePostAuthorInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  GetAllPostResponse: ResolverTypeWrapper<GetAllPostResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LikeResponse: ResolverTypeWrapper<LikeResponse>;
  LikeUser: ResolverTypeWrapper<LikeUser>;
  LikesResponse: ResolverTypeWrapper<LikesResponse>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['UserResponse'];
  PasswordResetInput: PasswordResetInput;
  Post: ResolverTypeWrapper<Post>;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TypePost: TypePost;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserLoggedIn: ResolverTypeWrapper<UserLoggedIn>;
  UserLoginResponse: ResolverTypeWrapper<UserLoginResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentResponse: CommentResponse;
  CommentUser: CommentUser;
  CommentsOfPost: CommentsOfPost;
  CommentsResponse: CommentsResponse;
  CommentsResponseData: CommentsResponseData;
  CreateLikeInput: CreateLikeInput;
  CreatePostAuthorInput: CreatePostAuthorInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  GetAllPostResponse: GetAllPostResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LikeResponse: LikeResponse;
  LikeUser: LikeUser;
  LikesResponse: LikesResponse;
  LoginInput: LoginInput;
  Mutation: {};
  MutationResponse: ResolversParentTypes['UserResponse'];
  PasswordResetInput: PasswordResetInput;
  Post: Post;
  PostResponse: PostResponse;
  Query: {};
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserLoggedIn: UserLoggedIn;
  UserLoginResponse: UserLoginResponse;
  UserResponse: UserResponse;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['CommentUser']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['LikeUser']>, ParentType, ContextType>;
  numberOfLikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentResponse'] = ResolversParentTypes['CommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentUser'] = ResolversParentTypes['CommentUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsOfPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentsOfPost'] = ResolversParentTypes['CommentsOfPost']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['CommentUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentsResponse'] = ResolversParentTypes['CommentsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['CommentsResponseData']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentsResponseData'] = ResolversParentTypes['CommentsResponseData']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['CommentsOfPost']>>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetAllPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetAllPostResponse'] = ResolversParentTypes['GetAllPostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeResponse'] = ResolversParentTypes['LikeResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeUser'] = ResolversParentTypes['LikeUser']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  commentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikesResponse'] = ResolversParentTypes['LikesResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['LikeUser']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['CommentResponse'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'description' | 'postId'>>;
  createLike?: Resolver<ResolversTypes['LikeResponse'], ParentType, ContextType, RequireFields<MutationCreateLikeArgs, 'createLikeInput'>>;
  createPost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'createPostInput'>>;
  createUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  deletePost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'postId'>>;
  deleteUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>;
  increaseLikeForPost?: Resolver<ResolversTypes['LikeResponse'], ParentType, ContextType, RequireFields<MutationIncreaseLikeForPostArgs, 'postId'>>;
  passwordRecovery?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationPasswordRecoveryArgs, 'email'>>;
  passwordReset?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationPasswordResetArgs, 'passwordResetInput'>>;
  updatePost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'description' | 'postId'>>;
  updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userId' | 'userInput'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'UserResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  likes?: Resolver<Array<Maybe<ResolversTypes['LikeUser']>>, ParentType, ContextType>;
  nofComments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nofLikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TypePost'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  decodeUserToken?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryDecodeUserTokenArgs, 'token'>>;
  getAllPosts?: Resolver<ResolversTypes['GetAllPostResponse'], ParentType, ContextType, RequireFields<QueryGetAllPostsArgs, 'limit' | 'page'>>;
  getAllUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  getCommetsForPost?: Resolver<ResolversTypes['CommentsResponse'], ParentType, ContextType, RequireFields<QueryGetCommetsForPostArgs, 'postId'>>;
  getLikesForComment?: Resolver<ResolversTypes['LikesResponse'], ParentType, ContextType, RequireFields<QueryGetLikesForCommentArgs, 'commentId'>>;
  getLikesForPost?: Resolver<ResolversTypes['LikesResponse'], ParentType, ContextType, RequireFields<QueryGetLikesForPostArgs, 'postId'>>;
  getPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
  login?: Resolver<ResolversTypes['UserLoginResponse'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'loginInput'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoggedInResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLoggedIn'] = ResolversParentTypes['UserLoggedIn']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLoginResponse'] = ResolversParentTypes['UserLoginResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['UserLoggedIn']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentResponse?: CommentResponseResolvers<ContextType>;
  CommentUser?: CommentUserResolvers<ContextType>;
  CommentsOfPost?: CommentsOfPostResolvers<ContextType>;
  CommentsResponse?: CommentsResponseResolvers<ContextType>;
  CommentsResponseData?: CommentsResponseDataResolvers<ContextType>;
  GetAllPostResponse?: GetAllPostResponseResolvers<ContextType>;
  LikeResponse?: LikeResponseResolvers<ContextType>;
  LikeUser?: LikeUserResolvers<ContextType>;
  LikesResponse?: LikesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserLoggedIn?: UserLoggedInResolvers<ContextType>;
  UserLoginResponse?: UserLoginResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};

