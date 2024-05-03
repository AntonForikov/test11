import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {CommentToSend, Post, PostById, PostComment} from '../../types';
import {RootState} from '../../app/store';

export const getPostList = createAsyncThunk(
  'getPostList/get',
  async () => {
    try {
      const {data} = await axiosApi.get(`/posts`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const newPost = createAsyncThunk<void, Post, {state: RootState}>(
  'addPost/post',
  async (postData, {getState}) => {
    try {
      const token = getState().users.user?.token;
      const formData = new FormData();

      const keys = Object.keys(postData) as (keyof Post)[];

      keys.forEach(key => {
        const value = postData[key];
        if (value !== null) formData.append(key, value);
      });
      const {data} = await axiosApi.post(`/posts`, formData, {headers: {Authorization: `Bearer ${token}`}});
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const getPostById = createAsyncThunk<PostById, string, {state: RootState}>(
  'getPostById/get',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    const {data} = await axiosApi.get<PostById>(`/posts/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  }
);

export const addComment = createAsyncThunk<void, CommentToSend, {state: RootState}>(
  'addComment/post',
  async (comment, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.post(`/comments`, comment, {headers: {Authorization: `Bearer ${token}`}});
  }
);
export const getComments = createAsyncThunk<PostComment[], string, {state: RootState}>(
  'getComments/get',
  async (id: string, {getState}) => {
    const token = getState().users.user?.token;
    const {data} = await axiosApi.get<PostComment[]>(`/comments?postId=${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  }
);
