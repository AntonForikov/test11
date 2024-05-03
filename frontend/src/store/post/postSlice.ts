import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {PostById, PostComment, PostFromDb} from '../../types';
import {getComments, getPostById, getPostList} from './postThunk';


interface UserState {
  postList: PostFromDb[];
  postListLoading: boolean;
  postById: PostById | null;
  postByIdLoading: boolean;
  comments: PostComment[];
  commentsLoading: boolean
}

const initialState: UserState = {
  postList: [],
  postListLoading: false,
  postById: null,
  postByIdLoading: false,
  comments: [],
  commentsLoading: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.pending, (state) => {
      state.postListLoading = true;
    }).addCase(getPostList.fulfilled, (state, {payload: postList}) => {
      state.postListLoading = false;
      state.postList = postList;
    }).addCase(getPostList.rejected, (state) => {
      state.postListLoading = false;
    });
    builder.addCase(getPostById.pending, (state) => {
      state.postByIdLoading = true;
    }).addCase(getPostById.fulfilled, (state, {payload: post}) => {
      state.postByIdLoading = false;
      state.postById = post;
    }).addCase(getPostById.rejected, (state) => {
      state.postByIdLoading = false;
    });
    builder.addCase(getComments.pending, (state) => {
      state.commentsLoading = true;
    }).addCase(getComments.fulfilled, (state, {payload: commentList}) => {
      state.commentsLoading = false;
      state.comments = commentList;
    }).addCase(getComments.rejected, (state) => {
      state.commentsLoading = false;
    });
  }
});

export const postReducer = postSlice.reducer;
export const selectPostList = (state: RootState) => state.posts.postList;
export const selectPostById = (state: RootState) => state.posts.postById;
export const selectComments = (state: RootState) => state.posts.comments;
export const selectPostListLoading = (state: RootState) => state.posts.postListLoading;
export const selectPostByIdLoading = (state: RootState) => state.posts.postByIdLoading;
export const selectCommentsLoading = (state: RootState) => state.posts.commentsLoading;
