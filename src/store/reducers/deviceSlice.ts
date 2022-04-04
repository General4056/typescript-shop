import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from '../../types/types';
import { getAllItems, getItemsInCategory } from '../../utils/api';

interface DeviceListState {
  deviceList: IDevice[];
  status: string | null;
  error: string | null;
}

const initialState: DeviceListState = {
  deviceList: [],
  status: null,
  error: null
};

export const fetchDeviceListInCategory = createAsyncThunk(
  'deviceList/fetchDeviceListInCategory',
  async function (selectedCategory: string, { rejectWithValue }) {
    try {
      const response = await getItemsInCategory(selectedCategory);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data: IDevice[] = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchByQuery = createAsyncThunk(
  'deviceList/fetchByQuery',
  async function (searchQuery: string, { rejectWithValue }) {
    try {
      const response = await getAllItems();

      console.log(response);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data: IDevice[] = await response.json();

      const searchedList = data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery);
      });

      return searchedList;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deviceSlice = createSlice({
  name: 'deviceList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDeviceListInCategory.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchDeviceListInCategory.fulfilled.type]: (state, action: PayloadAction<IDevice[]>) => {
      state.status = 'resolved';
      state.deviceList = action.payload;
    },
    [fetchDeviceListInCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchByQuery.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchByQuery.fulfilled.type]: (state, action: PayloadAction<IDevice[]>) => {
      state.status = 'resolved';
      state.deviceList = action.payload;
    },
    [fetchByQuery.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export default deviceSlice.reducer;
