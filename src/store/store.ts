import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import pathReducer from './features/path/pathSlice';
import themeReducer from './features/theme/themeSlice'; // Import theme reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    path: pathReducer,
    theme: themeReducer, // Add theme slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// to get token use this command

//   const token1 = useSelector((state: RootState) => state.auth.token);
//   console.log("token in the menu is - - - - - ", token1);
