import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>(this.loadCart());

  private loadCart(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cart();
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cart.set([...currentCart]);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const updatedCart = this.cart().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cart.set(updatedCart);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cart().filter(item => item.product.id !== productId);
    this.cart.set(updatedCart);
    this.saveCart();
  }

  clearCart(): void {
    this.cart.set([]);
    this.saveCart();
  }

  getTotal(): number {
    return this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
