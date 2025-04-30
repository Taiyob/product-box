import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  getAuth,
  //onAuthStateChanged,
  signInWithPopup,
  signOut,
  //User,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
  };
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
  return null;
});

interface AuthState {
  user: null | {
    uid: string;
    email: string | null;
    name: string | null;
    photo: string | null;
  };
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
