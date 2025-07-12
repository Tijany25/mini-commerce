import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
          stagger(100, [
            animate('0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('removeAnimation', [
      transition(':leave', [
        animate('0.3s ease-in', keyframes([
          style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
          style({ opacity: 0.8, transform: 'scale(0.98)', offset: 0.3 }),
          style({ opacity: 0, transform: 'scale(0.95) translateX(100px)', offset: 1 })
        ]))
      ])
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate('0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: 0, transform: 'scale(0.3)', offset: 0 }),
          style({ opacity: 0.8, transform: 'scale(1.1)', offset: 0.7 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class CartComponent {
  cart: any;

  constructor(
    private cartService: CartService,
    private seoService: SeoService
  ) {
    this.cart = this.cartService.cart;
    this.seoService.updateMetaTags(
      'Mini-Commerce - Cart',
      'View and manage your shopping cart'
    );
  }

  updateQuantity(productId: number, event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  incrementQuantity(itemId: number) {
    const items = this.cart();
    console.log(items, itemId);

    const item = items.find((i: any) => i.product.id === itemId);
    console.log(item);

    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decrementQuantity(itemId: number) {
    const items = this.cart();
    const item = items.find((i: any) => i.product.id === itemId);
    if (item && item.quantity > 1) {
     this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }


  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
  salesTax = computed(() => 0);

  total = computed(() => this.getTotal() + this.salesTax());

  isEmpty = computed(() => this.cart().length === 0);

 clearCart(): void {
    this.cartService.clearCart();
  }



}
