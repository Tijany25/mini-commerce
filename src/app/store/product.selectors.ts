import { createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

interface AppState {
  products: ProductState;
}

export const selectProductState = (state: AppState) => state.products;

export const selectProducts = createSelector(selectProductState, (state) => state.products);
export const selectLoading = createSelector(selectProductState, (state) => state.loading);
export const selectError = createSelector(selectProductState, (state) => state.error);
export const selectProductBySlug = (slug: string) =>
  createSelector(selectProducts, (products) => products.find(p => p.slug === slug));
