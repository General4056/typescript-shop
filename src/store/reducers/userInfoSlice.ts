import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/types';

interface UserInfoState {
  userInfo: IUser;
  loggedIn: boolean;
}

const initialState: UserInfoState = {
  userInfo: { name: '', email: '' },
  loggedIn: false
};

export const UserInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    changeUserInfo(state, action: PayloadAction<IUser>) {
      state.userInfo = action.payload;
    },
    changeUserEmail(state, action: PayloadAction<string>) {
      state.userInfo.email = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    }
  }
});

export const { changeUserEmail, setLoggedIn, changeUserInfo } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
