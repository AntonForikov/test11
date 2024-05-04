import express from 'express';
import auth, {Auth} from '../middleware/auth';
import Category from '../models/category';
import mongoose from 'mongoose';
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

export default categoryRouter;