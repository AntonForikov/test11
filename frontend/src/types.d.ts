export interface Post {
  title: string,
  description: string,
  image: File | null
}

export interface PostFromDb extends Post {
  _id: string;
  image: string | null
  user: string
  date: string
  commentCount: string
}

export interface PostComment {
  _id: string;
  user: {
    username: string
  },
  text: string
}

export interface Comment {
  text: string
}

export interface CommentToSend extends Comment{
  post: string
}

export interface PostById {
  _id: string;
  title: string;
  image: string | null;
  description: string | null;
  date: string;
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