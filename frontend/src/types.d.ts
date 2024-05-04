export interface Product {
  title: string,
  description: string,
  image: File | null,
  price: number,
  category: string,
}

export interface TargetProduct extends ProductFromDb{
  user: {
    _id: string;
    displayName: string;
    username: string;
    phoneNumber: string
  };
  category: {
    _id: string;
    title: string;
  }
}

export interface ProductFromDb {
  _id: string;
  image: string;
  user: string;
  title: string;
  description: string;
  category: string;
  price: string;
}

export interface CategoryFromDb {
  _id: string;
  title: string;
}

interface CategoryMutation {
  _id: string;
  title: string
}
export interface ProductByCategory extends ProductFromDb{
  category: CategoryMutation
}

export interface UserFromDb {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: UserFromDb;
  message: string
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}