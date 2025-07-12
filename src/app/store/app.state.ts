import { ProductState } from './product.reducer';
import { CartState } from './cart.reducer';

export interface AppState {
  products: ProductState;
  cart: CartState;
}
