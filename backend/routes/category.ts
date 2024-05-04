import express from 'express';
import Category from '../models/category';
import mongoose from 'mongoose';
import Product from '../models/product';
import {ObjectId} from 'mongodb';

const categoryRouter = express.Router();

categoryRouter.post('/', async (req, res,next) => {
  try {
    const {title} = req.body;

    const categoryData = {
      title
    };

    const category = new Category(categoryData);
    await category.save();

    return res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(400).send(e);
    next(e);
  }
});

categoryRouter.get('/',async (req, res,next) => {
  try {
    const categories = await Category.find();

    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

categoryRouter.get('/:id',async (req, res,next) => {
  try {
    const {id} = req.params;
    let categoryId: ObjectId;

    try {
      categoryId = new ObjectId(id);
    } catch (e) {
      return res.status(400).send({error: 'Category is not an Object Id'})
    }
    const productsByCategory = await Product.find({category: categoryId})
      .populate('category')
      .select('title price image category');


    return res.send(productsByCategory);
  } catch (e) {
    next(e);
  }
});

export default categoryRouter;