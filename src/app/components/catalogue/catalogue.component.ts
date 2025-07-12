import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeoService } from '../../services/seo.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ProductService } from 'app/services/product.service';
import { CartService } from 'app/services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading = true;
 searchQuery$ = new BehaviorSubject<string>('');
filteredProducts$!: Observable<Product[]>;

  constructor(
    private seoService: SeoService,
    private productService: ProductService,
        private cartService: CartService,
        private snackBar: MatSnackBar

  ) {
    this.products$ = this.productService.loadProducts();
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags(
      'Mini-Commerce - Catalogue',
      'Browse our collection of premium products',
      'https://via.placeholder.com/300x300.png?text=Catalogue'
    );
    this.filteredProducts$ = combineLatest([
    this.products$,
    this.searchQuery$
  ]).pipe(
    map(([products, query]) => {
      if (!query.trim() && query.length < 3) {
        return products;
      }
      return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    })
  );
  }

  selectedFilters = {
    look: 'Look',
    family: 'Family',
    room: 'Room',
    difficulty: 'Difficulty',
    light: 'Light',
    size: 'Size',
    features: 'Special features'
  };

  sortBy = 'Sort by';
  productCount = 554;

  toggleLike(plant: Product): void {
    plant.isLiked = !plant.isLiked;
  }

  addToCart(product: Product): void {
     this.cartService.addToCart(product);
     this.snackBar.open(`${product.name} added to cart`, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
       verticalPosition: 'top'
    });
  }

  viewDetails(plant: Product): void {
    console.log('Viewing details for:', plant.name);
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  onSearchChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.searchQuery$.next(target.value);
}

clearSearch(): void {
  this.searchQuery$.next('');
}

get currentSearchQuery(): string {
  return this.searchQuery$.value;
}
onSearchSubmit(): void {

}
}
