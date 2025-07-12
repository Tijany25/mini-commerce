import { Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';

export const routes: Routes = [
  { path: '', component: CatalogueComponent, title: 'Mini-Commerce - Catalogue' },
  { path: 'product/:slug', component: ProductDetailComponent, title: 'Mini-Commerce - Product' },
  { path: 'cart', component: CartComponent, title: 'Mini-Commerce - Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Mini-Commerce - Checkout' },
  { path: 'success', component: SuccessComponent, title: 'Mini-Commerce - Order Success' },
  { path: '**', redirectTo: '' }
];
