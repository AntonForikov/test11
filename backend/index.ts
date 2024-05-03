import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routes/user';
import cors from 'cors';
import postRouter from './routes/post';
import commentRouter from './routes/comment';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(express.static('public'));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();