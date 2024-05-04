import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';
import auth, {Auth} from '../middleware/auth';
import {imagesUpload} from '../multer';
import {ObjectId} from 'mongodb';
import {PostById} from '../types';

const productRouter = express.Router();

productRouter.post('/', auth, imagesUpload.single('image'), async (req: Auth,res, next) => {
  try {
    const {title, description, price} = req.body;

    if (!description && !req.file) return res.status(400).send({error: 'You should provide Image or Description'});

    const postData = {
      user: req.user?._id,
      title: title.trim(),
      description: description ? description : null,
      image: req.file ? req.file.filename : null,
      date: new Date()
    };

    const post = new Product(postData);
    await post.save();

    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(400).send(e);
    next(e);
  }
});

productRouter.get('/', async (_, res, next) => {
  try {
    const postList = await Product.aggregate(
      [
        {
          $sort: {date: -1}
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userList"
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            image: 1,
            date: 1,
            user: {$first: '$userList.username'},
            commentCount: {$size: '$comments'}
          }
        },
      ]
    );

    return res.send(postList);
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

    const post: PostById[] = await Product.aggregate(
      [
        {
          $match: { _id }
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments",
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            image: 1,
            date: 1,
          }
        },
      ]
    );
    if (post.length === 0) return res.status(400).send({error: 'There is no such post in database.'});

    return res.send(post[0]);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(400).send(e);
    next(e);
  }
});

export default productRouter