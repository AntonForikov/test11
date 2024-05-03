import express from 'express';
import User from '../models/user';
import mongoose, {mongo} from 'mongoose';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.generateToken();
    await user.save();

    return res.send({message: 'Registered successfully', user});
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    if (e instanceof mongo.MongoServerError && e.code === 11000) return res.status(422).send({error: '"username" should be an unique value.'});
    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) return res.status(404).send({error: "Username and password doesn't match."});

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) return res.status(404).send({error: "Username and password doesn't match."});
    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password matched.', user});
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const tokenData = req.get('Authorization');
    const successMessage = {message: 'Successfully logout'};

    if (!tokenData) return res.status(401).send({error: 'No token provided'});

    const [_, token] = tokenData.split(' ');
    const user = await User.findOne({token});

    if (!user) return res.send(successMessage);

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});

export default userRouter;