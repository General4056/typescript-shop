import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, IDevice } from '../../types/types';

interface ShopingCartState {
  shoppingCartItems: ICartItem[];
}

interface IDeletePayload {
  id: number;
}

interface IChangeQuantityPayload {
  id: number;
  value: number;
}

const initialState: ShopingCartState = {
  shoppingCartItems: []
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IDevice>) {
      const newIt: ICartItem = { ...action.payload, quantity: 1 };
      state.shoppingCartItems.push(newIt);
    },

    deleteFromCart(state, action: PayloadAction<IDeletePayload>) {
      state.shoppingCartItems = state.shoppingCartItems.filter((item) => item.id !== action.payload.id);
    },

    changeQuantity(state, action: PayloadAction<IChangeQuantityPayload>) {
      const index = state.shoppingCartItems.findIndex((item) => item.id === action.payload.id);
      state.shoppingCartItems[index].quantity += action.payload.value;
    }
  }
});

export const { addToCart, changeQuantity, deleteFromCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
