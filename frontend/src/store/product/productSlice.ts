import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {CategoryFromDb, ProductByCategory, ProductFromDb, TargetProduct} from '../../types';
import {getAllProductList, getCategories, getProductById, getProductsByCategory} from './productThunk';


interface UserState {
  productList: ProductFromDb[];
  allProductListLoading: boolean;
  categories: CategoryFromDb[];
  product: TargetProduct | null;
  targetProductLoading: boolean;
  productsByCategory: ProductByCategory[],
  productsByCategoryLoading: boolean,
}

const initialState: UserState = {
  productList: [],
  allProductListLoading: false,
  categories: [],
  product: null,
  targetProductLoading: false,
  productsByCategory: [],
  productsByCategoryLoading: false,

};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductList.pending, (state) => {
      state.allProductListLoading = true;
    }).addCase(getAllProductList.fulfilled, (state, {payload: productList}) => {
      state.allProductListLoading = false;
      if (productList) state.productList = productList;
    }).addCase(getAllProductList.rejected, (state) => {
      state.allProductListLoading = false;
    });
    builder.addCase(getCategories.fulfilled, (state, {payload: categories}) => {
      state.categories = categories;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.targetProductLoading = true;
    }).addCase(getProductById.fulfilled, (state, {payload: product}) => {
      state.targetProductLoading = false;
      state.product = product;
    }).addCase(getProductById.rejected, (state) => {
      state.targetProductLoading = false;
    });
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.productsByCategoryLoading = true;
    }).addCase(getProductsByCategory.fulfilled, (state, {payload: products}) => {
      state.productsByCategoryLoading = false;
      state.productsByCategory = products;
    }).addCase(getProductsByCategory.rejected, (state) => {
      state.productsByCategoryLoading = false;
    });
  }
});

export const productReducer = productSlice.reducer;
export const selectProductList = (state: RootState) => state.products.productList;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProduct = (state: RootState) => state.products.product;
export const selectProductByCategory = (state: RootState) => state.products.productsByCategory;
export const selectAllProductListLoading = (state: RootState) => state.products.allProductListLoading;
export const selectProductByIdLoading = (state: RootState) => state.products.targetProductLoading;
export const selectProductByCategoryLoading = (state: RootState) => state.products.productsByCategoryLoading;
