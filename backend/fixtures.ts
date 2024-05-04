import mongoose from 'mongoose';
import config from './config';
import User from './models/user';
import Product from './models/product';
import Category from './models/category';

const dropCollections = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const collections = ['users', 'products', 'categories'];

const resetDB = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) await dropCollections(db, collection);

  const [user1, user2, user3] = await User.create(
    {
      username: 'user1',
      password: '1',
      displayName: 'First user display name',
      phoneNumber: '+996111111111',
      token: crypto.randomUUID()
    },
    {
      username: 'user2',
      password: '2',
      displayName: 'Second user display name',
      phoneNumber: '+996222222222',
      token: crypto.randomUUID()
    },
    {
      username: 'user3',
      password: '3',
      displayName: 'Third user display name',
      phoneNumber: '+996333333333',
      token: crypto.randomUUID()
    },
  );

  const [category1, category2, category3, category4] = await Category.create(
    {
      title: 'Cars'
    },
    {
      title: 'Computers'
    },
    {
      title: 'Moto'
    },
    {
      title: 'Mobiles'
    }
  )

  await Product.create(
    {
      user: user1,
      category: category1,
      title: 'Honda',
      description: 'Civic',
      image: 'fixtureImages/honda.jpeg',
      price: '10045',
    },
    {
      user: user2,
      category: category1,
      title: 'Toyota',
      description: '4Runner',
      image: 'fixtureImages/4Runner.jpeg',
      price: '23245',
    },
    {
      user: user3,
      category: category3,
      title: 'Honda',
      description: 'Africa Twin',
      image: 'fixtureImages/new_africa.jpeg',
      price: '2100',
    },
    {
      user: user1,
      category: category4,
      title: 'iPhone',
      description: 'Pro max 15',
      image: 'fixtureImages/iphone.jpeg',
      price: '1300',
    },
    {
      user: user2,
      category: category2,
      title: 'Macbook',
      description: 'm3',
      image: 'fixtureImages/macbook.jpeg',
      price: '2100',
    }
  )

  await db.close();
};

void resetDB();