import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { SeoService } from '../../services/seo.service';
import { MatButtonModule } from '@angular/material/button';
interface Color {
  name: string;
  hex: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  product?: Product;
selectedColor: Color | null = null;
  selectedSize: string = '';
  quantity: number = 1;

  defaultColors: Color[] = [
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Green', hex: '#90EE90' },
    { name: 'Blue', hex: '#87CEEB' },
    { name: 'Pink', hex: '#FFB6C1' }
  ];

  defaultSizes: string[] = ['Small', 'Medium', 'Large'];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    console.log(this.route, slug);

    if (slug) {
      this.product = this.productService.getProductBySlug(slug);
      if (this.product) {
        this.seoService.updateMetaTags(
          `Mini-Commerce - ${this.product.name}`,
          this.product.description,
          this.product.image
        );
      }
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
