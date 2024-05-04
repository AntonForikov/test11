import {Schema, model} from 'mongoose';
import {ObjectId} from 'mongodb';
import User from './user';
import Category from './category';

const ProductSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    validate: {
      validator: async (id: ObjectId) => User.findById(id),
      message: 'User does not exist'
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category',
    validate: {
      validator: async (id: ObjectId) => Category.findById(id),
      message: 'Category does not exist'
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {versionKey: false});

const Product = model('product', ProductSchema);

export default Product;