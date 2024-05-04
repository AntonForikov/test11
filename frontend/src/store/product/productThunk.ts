import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Product, CategoryFromDb, TargetProduct, ProductFromDb, ProductByCategory} from '../../types';
import {RootState} from '../../app/store';

export const getAllProductList = createAsyncThunk(
  'getAllProductList/get',
  async () => {
    try {
      const {data} = await axiosApi.get<ProductFromDb[]>(`/products`);
      return data.reverse();
    } catch (e) {
      console.error(e);
    }
  }
);

export const getCategories = createAsyncThunk(
  'getCategories/get',
  async () => {
    const {data} = await axiosApi.get<CategoryFromDb[]>(`/categories`);
    return data;
  }
);


export const newProduct = createAsyncThunk<void, Product, {state: RootState}>(
  'addProduct/post',
  async (productData, {getState}) => {
    try {
      const token = getState().users.user?.token;
      const formData = new FormData();

      const keys = Object.keys(productData) as (keyof Product)[];

      keys.forEach(key => {
        const value = productData[key];
        if (value !== null) formData.append(key, value);
      });
      const {data} = await axiosApi.post(`/products`, formData, {headers: {Authorization: `Bearer ${token}`}});
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const getProductById = createAsyncThunk<TargetProduct, string, {state: RootState}>(
  'getProductById/get',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    const {data} = await axiosApi.get<TargetProduct>(`/products/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  }
);

export const getProductsByCategory = createAsyncThunk<ProductByCategory[], string>(
  'getProductsByCategory/get',
  async (id) => {
    const {data} = await axiosApi.get<ProductByCategory[]>(`/categories/${id}`);
    return data;
  }
);

export const deleteProduct = createAsyncThunk<void ,string, {state: RootState}>(
  'deleteProduct/delete',
  async (id, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/products/${id}`, {headers: {Authorization: `Bearer ${token}`}});
  }
);

