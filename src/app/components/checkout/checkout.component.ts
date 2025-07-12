import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SeoService } from '../../services/seo.service';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatSnackBarModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
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
export class CheckoutComponent {
  cart: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private seoService: SeoService,
     private snackBar: MatSnackBar
  ) {
    this.cart = this.cartService.cart;
    this.seoService.updateMetaTags(
      'Mini-Commerce - Checkout',
      'Review and place your order'
    );
  }

  placeOrder(): void {
    this.cartService.clearCart();
    const orderId = Math.random().toString(36).substr(2, 9);
    this.snackBar.open(`Order Placed Successfully!`, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
       verticalPosition: 'top'
    });
    this.router.navigate(['/success'], { queryParams: { orderId } });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  salesTax = computed(() => 0);

    total = computed(() => this.getTotal() + this.salesTax());

    isEmpty = computed(() => this.cart().length === 0);
}
