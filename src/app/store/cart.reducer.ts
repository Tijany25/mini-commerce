import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../models/cart-item.model';
import { addToCart, updateQuantity, removeFromCart, clearCart } from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]')
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const items = [...state.items];
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(items));
    return { ...state, items };
  }),
  on(updateQuantity, (state, { productId, quantity }) => {
    const items = state.items.map(item =>
      item.product.id === productId && quantity > 0 ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(items));
    return { ...state, items };
  }),
  on(removeFromCart, (state, { productId }) => {
    const items = state.items.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(items));
    return { ...state, items };
  }),
  on(clearCart, () => {
    localStorage.setItem('cart', '[]');
    return { items: [] };
  })
);
