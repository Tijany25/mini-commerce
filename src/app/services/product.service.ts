import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productsUrl = 'assets/products.json';
  products = signal<Product[]>([]);

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(products => {
        this.products.set(products);
        localStorage.setItem('products', JSON.stringify(products));
      }),
      catchError(error => {
        this.errorHandler.handleError(error, 'Failed to load products');
        return of(JSON.parse(localStorage.getItem('products') || '[]'));
      })
    );
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products().find(p => p.slug === slug);
  }
  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
