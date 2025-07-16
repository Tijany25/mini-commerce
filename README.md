# MiniCommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

A client-side Angular 17 e-commerce prototype with a modern, mobile-first design. Features a product catalogue, product details, cart management, and mock checkout with localStorage persistence.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

A client-side Angular 17 e-commerce prototype with a modern, mobile-first design. Features a product catalogue, product details, cart management, and mock checkout with localStorage persistence.

## Live Demo
Hosted on Github page: (https://tijany25.github.io/mini-commerce/)(#)

## Design Approach
- **Layout**: Mobile-first, responsive grid using Tailwind CSS with custom primary/secondary colors.
- **Responsiveness**: Flex/grid layouts adapt from 1-column (mobile) to 4-column (desktop).
- **Accessibility**: Semantic HTML, ARIA labels, keyboard-navigable buttons, alt text for images.

## Tools & Techniques
- **Stack**: Angular 17, TypeScript (strict), RxJS, Tailwind CSS, NgRx Store, Angular Material.
- **State Management**: NgRx Store for products and cart, with localStorage persistence.
- **Data Fetching**: HttpClient for loading products from `products.json`, cached in localStorage.
- **Testing**: Jest unit test for CatalogueComponent.
- **CI**: Vercel auto-deploys on push to GitHub.

## SEO Strategy
- **Meta Tags**: Dynamic title and description per route, Open Graph tags for product pages.
- **Performance**: Lazy-loaded images with `ngOptimizedImage`, minimal CSS/JS bundles.
- **Structured Data**: JSON-LD for products (added in `ProductDetailComponent`).

## Error Handling
- **Global**: NgRx effects catch HTTP errors, display via MatSnackBar.
- **UI Feedback**: Loading spinners and error messages in CatalogueComponent.
- **Recovery**: Fallback to localStorage cache if HTTP fails.

## Setup
1. Clone: `git clone https://github.com/Tijany25/mini-commerce.git`
2. Install: `npm install`
3. Run: `ng serve`
4. Test: `ng test`
5. Build: `ng build`
