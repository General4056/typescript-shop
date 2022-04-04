import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCategories } from '../../utils/api';

interface categoriesState {
  categories: [];
  selectedCategory: string;
  status: string | null;
  error: string | null;
}

interface ISetCategoryPayload {
  category: string;
}

const initialState: categoriesState = {
  categories: [],
  selectedCategory: 'electronics',
  status: null,
  error: null
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async function (_, { rejectWithValue }) {
  try {
    const response = await getAllCategories();

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ISetCategoryPayload>) {
      console.log(action.payload);
      state.selectedCategory = action.payload.category;
    }
  },
  extraReducers: {
    [fetchCategories.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCategories.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.status = 'resolved';
      state.categories = action.payload;
    },
    [fetchCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
