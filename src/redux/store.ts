// redux/slices/auth/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { authAction } from './slices/auth/authAction';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAction.reducerPath]: authAction.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAction.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
