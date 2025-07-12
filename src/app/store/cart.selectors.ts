import { createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

interface AppState {
  cart: CartState;
}

export const selectCartState = (state: AppState) => state.cart;

export const selectCartItems = createSelector(selectCartState, (state) => state.items);
export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
