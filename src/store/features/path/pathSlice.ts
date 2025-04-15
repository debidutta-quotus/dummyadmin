// src/store/features/path/pathSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PathState {
  currentPath: string | null;
}

const initialState: PathState = {
  currentPath: null,
};

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
    clearPath: (state) => {
      state.currentPath = null;
    },
  },
});

export const { setPath, clearPath } = pathSlice.actions;
export default pathSlice.reducer;
