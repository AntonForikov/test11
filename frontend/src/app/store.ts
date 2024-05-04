import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userReducer} from '../store/user/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore} from 'redux-persist';
import {productReducer} from '../store/product/productSlice';


const userPersistConfig = {
  key: 'spotify:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  products: productReducer,
  users: persistReducer(userPersistConfig, userReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;