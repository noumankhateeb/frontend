import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { authAction } from './slices/auth/authAction';

const rootReducer = combineReducers({
  auth: authReducer,
  [authAction.reducerPath]: authAction.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
