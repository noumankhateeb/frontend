import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  phone: string;
}

interface AuthState {
  isAuthenticated: boolean;
  authData: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  authData: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: UserData }>) => {
      state.isAuthenticated = true;
      state.authData = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.authData = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    signupSuccess: (state, action: PayloadAction<{ token: string; user: UserData }>) => {
      state.isAuthenticated = true;
      state.authData = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.authData = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action: PayloadAction<UserData>) => {
      state.authData = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authData = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  updateProfileSuccess,
  updateProfileFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;
