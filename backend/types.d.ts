import {Model} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface UserFromDb extends UserFields {
  _id: ObjectId
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;


export interface PostById {
  _id: string;
  title: string;
  image: string | null;
  description: string | null;
  date: string;
  comments: PostByIdComment[]
}
