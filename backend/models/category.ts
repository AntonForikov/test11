import {Schema, model} from 'mongoose';

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
}, {versionKey: false});

const  Category = model('category', CategorySchema);

export default Category;