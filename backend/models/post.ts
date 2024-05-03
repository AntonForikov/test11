import {Schema, model} from 'mongoose';
import {ObjectId} from 'mongodb';
import User from './user';

const PostSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    validate: {
      validator: async (id: ObjectId) => User.findById(id),
      message: 'User does not exist'
    }
  },
  title: {
    type: String,
    required: true
  },
  description: String || null,
  image: String || null,
  date: Date
}, {versionKey: false});

const Post = model('post', PostSchema);

export default Post;