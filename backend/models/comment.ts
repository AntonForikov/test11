import {Schema, model} from 'mongoose';
import {ObjectId} from 'mongodb';
import User from './user';
import Post from './post';

const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'user',
    validate: {
      validator: async (id: ObjectId) => User.findById(id),
      message: 'User does not exist'
    }
  },
  post: {
    type: ObjectId,
    required: true,
    ref: 'post',
    validate: {
      validator: async (id: ObjectId) => Post.findById(id),
      message: 'Post does not exist'
    }
  },
  text: {
    type: String,
    required: true,
  }
}, {versionKey: false});

const  Comment = model('comment', CommentSchema);

export default Comment;