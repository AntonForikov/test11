import mongoose from 'mongoose';
import config from './config';
import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';

const dropCollections = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const collections = ['posts', 'comments', 'users'];

const resetDB = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) await dropCollections(db, collection);

  const [user1, user2] = await User.create(
    {
      username: 'user1',
      password: '1',
      token: crypto.randomUUID()
    },
    {
      username: 'user2',
      password: '2',
      token: crypto.randomUUID()
    }
  );

  const [post1, post2] = await Post.create(
    {
      user: user1._id,
      title: 'Title for first post',
      description: null,
      image: 'fixtureImages/tool_artist.jpeg',
      date: new Date()
    },
    {
      user: user2._id,
      title: 'Title for second post',
      description: 'Description for second post',
      image: null,
      date: new Date()
    }
  )

  await Comment.create(
    {
      user: user1,
      post: post1,
      text: 'First Comment from first user'
    },
    {
      user: user2,
      post: post1,
      text: 'Second Comment from second user'
    },
    {
      user: user1,
      post: post2,
      text: 'First Comment from first user'
    },
    {
      user: user2,
      post: post2,
      text: 'Second Comment from second user'
    }
  )

  await db.close();
};

void resetDB();