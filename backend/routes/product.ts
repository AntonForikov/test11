import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';
import auth, {Auth} from '../middleware/auth';
import {imagesUpload} from '../multer';
import {ObjectId} from 'mongodb';

const productRouter = express.Router();

productRouter.post('/', auth, imagesUpload.single('image'), async (req: Auth,res, next) => {
  try {
    const {title, description, price, category} = req.body;

    let categoryId: ObjectId;

    try {
      categoryId = new ObjectId(category);
    } catch (e) {
      return res.status(400).send({error: 'Category is not an Object Id'})
    }

    const productData = {
      user: req.user?._id,
      title: title,
      description: description,
      image: req.file?.filename,
      category: categoryId,
      price: price
    };

    const product = new Product(productData);
    await product.save();

    return res.send(product);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(400).send(e);
    next(e);
  }
});

productRouter.get('/', async (_, res, next) => {
  try {
    const products = await Product.find().select('_id title image price user');

    return res.send(products);
  } catch (e) {
    next(e);
  }
});

productRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const {id} = req.params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch (e) {
      return res.status(400).send({error: 'Request param  is not an ObjectId'});
    }

    const product = await Product.findById(_id)
      .populate('user', '-token')
    if (!product) return res.status(400).send({error: 'There is no such product in database.'});

    return res.send(product);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(400).send(e);
    next(e);
  }
});

productRouter.delete('/:id', auth, async (req: Auth, res, next) => {
  try {
    const {id} = req.params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch (e) {
      return res.status(400).send({error: 'Request param  is not an ObjectId'});
    }

    const product = await Product.findById(_id)
      .populate('user')
    if (!product) return res.status(400).send({error: 'There is no such product in database.'});

    if (product.user._id.toString() !== req.user?._id.toString()) return res.status(400).send({error: 'You can not delete not your product.'});

    await Product.deleteOne(_id);
    return res.send({success: 'Product Deleted.'});
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(400).send(e);
    next(e);
  }
});

export default productRouter